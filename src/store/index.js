import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const levelOffset = {
  city: 0,
  epci: 1,
  department: 2,
  region: 3
}

const levelPropName = {
  city: 'INSEE_COM',
  epci: 'CODE_EPCI',
  department: 'INSEE_DEP',
  region: 'INSEE_REG'
}

const lovacPropName = {
  city: 'INSEE_COM',
  epci: 'CODE_EPCI',
  department: 'CODE_DEPT',
  region: 'CODE_REG'
}

const inseePropName = {
  city: 'CODGEO',
  epci: 'EPCI',
  department: 'DEP',
  region: 'REG'
}

const pcPropName = {
  city: 'COMM',
  epci: 'EPCI',
  department: 'DEP',
  region: 'REG'
}

export default () => {
  return new Vuex.Store({
    modules: {},
    state: {
      application: window.APPLICATION,
      loading: false,
      city: null,
      inseeInfos: null,
      log1Data: null,
      lovacData: null,
      evolutionData: null,
      pcData: null,
      currentLevel: 'city'
    },
    getters: {
      config (state) {
        return state.application && state.application.configuration
      }
    },
    mutations: {
      setAny (state, params) {
        Object.assign(state, params)
      }
    },
    actions: {
      async refresh ({ state, getters, commit, dispatch }) {
        commit('setAny', { inseeInfos: null })
        if (state.city) {
          try {
            const params = { qs: `INSEE_COM:${state.city.value}` }
            const inseeInfos = (await axios.get('https://opendata.koumoul.com/data-fair/api/v1/datasets/france-contours-2020-commune-medium/lines', { params })).data.results[0]
            commit('setAny', { inseeInfos })
          } catch (err) { }
        }
        dispatch('fetch')
      },
      async fetch ({ state, getters, commit }) {
        commit('setAny', {
          log1Data: null,
          lovacData: null,
          evolutionData: null,
          pcData: null
        })
        if (state.inseeInfos) {
          commit('setAny', { loading: true })
          try {
            const params = { qs: `${lovacPropName[state.currentLevel]}:${state.inseeInfos[levelPropName[state.currentLevel]]}` }
            const lovacData = (await axios.get(getters.config.datasets[8 + levelOffset[state.currentLevel]].href + '/lines', { params })).data.results[0]
            params.qs = `${inseePropName[state.currentLevel]}:${state.inseeInfos[levelPropName[state.currentLevel]]}`
            const log1Data = (await axios.get(getters.config.datasets[0 + levelOffset[state.currentLevel]].href + '/lines', { params })).data.results[0]
            const evolutionData = (await axios.get(getters.config.datasets[4 + levelOffset[state.currentLevel]].href + '/lines', { params })).data.results[0]
            params.qs = `${pcPropName[state.currentLevel]}:${state.inseeInfos[levelPropName[state.currentLevel]]}`
            params.size = 10000
            const pcData = (await axios.get(getters.config.datasets[12].href + '/lines', { params })).data.results
            commit('setAny', { log1Data, lovacData, evolutionData, pcData })
          } catch (err) { }
          commit('setAny', { loading: false })
        }
      },
      async setError ({ state }, error) {
        console.error('report error', error)
        try {
          axios.post(state.application.href + '/error', { message: error.message || error })
        } catch (err) {
          console.log('Failed to report error', err)
        }
      }
    }
  })
}
