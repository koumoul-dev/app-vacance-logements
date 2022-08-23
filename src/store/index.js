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
  city: 'CODGEO',
  epci: 'EPCI',
  department: 'DEP',
  region: 'REG'
}

const inseeMapping = {
  75101: '75056',
  75102: '75056',
  75103: '75056',
  75104: '75056',
  75105: '75056',
  75106: '75056',
  75107: '75056',
  75108: '75056',
  75109: '75056',
  75110: '75056',
  75111: '75056',
  75112: '75056',
  75113: '75056',
  75114: '75056',
  75115: '75056',
  75116: '75056',
  75117: '75056',
  75118: '75056',
  75119: '75056',
  75120: '75056',
  13201: '13055',
  13202: '13055',
  13203: '13055',
  13204: '13055',
  13205: '13055',
  13206: '13055',
  13207: '13055',
  13208: '13055',
  13209: '13055',
  13210: '13055',
  13211: '13055',
  13212: '13055',
  13213: '13055',
  13214: '13055',
  13215: '13055',
  13216: '13055',
  69381: '69123',
  69382: '69123',
  69383: '69123',
  69384: '69123',
  69385: '69123',
  69386: '69123',
  69387: '69123',
  69388: '69123',
  69389: '69123'
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
      },
      captureUrl (state) {
        return state.application.captureUrl || 'http://localhost:5889'
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
            const code = inseeMapping[state.city.value] || state.city.value
            const params = { qs: `INSEE_COM:${code}` }
            const inseeInfos = (await axios.get('https://opendata.koumoul.com/data-fair/api/v1/datasets/france-contours-2020-commune-medium/lines', { params })).data.results[0]
            if (inseeMapping[state.city.value]) {
              inseeInfos.INSEE_COM = state.city.value
              inseeInfos.NOM_COM = state.city.text.split(' (')[0]
            }
            commit('setAny', { inseeInfos, currentLevel: 'city' })
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
            const results = (await axios.get(getters.config.datasets[4 + levelOffset[state.currentLevel]].href + '/lines', { params })).data.results
            const evolutionData = results.filter(d => typeof d.TOT_PARC === 'number').sort((d1, d2) => d2.ANNEE - d1.ANNEE).filter((d, i) => i % 5 === 0).reverse()
            params.qs = `${pcPropName[state.currentLevel]}:${state.inseeInfos[levelPropName[state.currentLevel]]}`
            const pcData = (await axios.get(getters.config.datasets[12 + levelOffset[state.currentLevel]].href + '/lines', { params })).data.results[0]
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
