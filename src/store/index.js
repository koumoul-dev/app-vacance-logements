import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    modules: {},
    state: {
      application: window.APPLICATION,
      loading: false,
      city: null,
      inseeInfos: null,
      ageInseeData: null,
      cityLovacData: null,
      epciLovacData: null,
      cityHistoricalData: null,
      epciHistoricalData: null
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
      async refresh ({ state, getters, commit, dispatch }, reset) {
        commit('setAny', {
          inseeInfos: null,
          ageInseeData: null,
          cityLovacData: null,
          epciLovacData: null,
          cityHistoricalData: null,
          epciHistoricalData: null
        })
        if (!state.city) {
          commit('setAny', {
            inseeInfos: null,
            ageInseeData: null,
            cityLovacData: null,
            epciLovacData: null,
            cityHistoricalData: null,
            epciHistoricalData: null
          })
        } else {
          commit('setAny', { loading: true })
          try {
            const params = { qs: `CODGEO:${state.city.value}` }
            const ageInseeData = (await axios.get(getters.config.datasets[0].href + '/lines', { params })).data.results[0]
            const cityHistoricalData = (await axios.get(getters.config.datasets[3].href + '/lines', { params })).data.results[0]
            params.qs = `INSEE_COM:${state.city.value}`
            const inseeInfos = (await axios.get('https://opendata.koumoul.com/data-fair/api/v1/datasets/france-contours-2020-commune-medium/lines', { params })).data.results[0]
            const cityLovacData = (await axios.get(getters.config.datasets[1].href + '/lines', { params })).data.results[0]
            params.qs = `CODE_EPCI:${inseeInfos.CODE_EPCI}`
            const epciLovacData = (await axios.get(getters.config.datasets[2].href + '/lines', { params })).data.results[0]
            params.qs = `EPCI:${inseeInfos.CODE_EPCI}`
            const epciHistoricalData = (await axios.get(getters.config.datasets[4].href + '/lines', { params })).data.results[0]
            commit('setAny', { inseeInfos, ageInseeData, cityLovacData, epciLovacData, cityHistoricalData, epciHistoricalData })
          } catch (err) {
            commit('setAny', {
              inseeInfos: null,
              ageInseeData: null,
              cityLovacData: null,
              epciLovacData: null,
              cityHistoricalData: null,
              epciHistoricalData: null
            })
            dispatch('setError', (err.response && err.response.data) || err.message)
          }
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
