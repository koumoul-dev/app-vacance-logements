import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { filters2qs } from '@data-fair/components-app/filters/filters'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    modules: {},
    state: {
      application: window.APPLICATION,
      city: null
      // dataset: null,
      // count: null,
      // page: 1,
      // data: null,
      // loading: false,
      // search: null,
      // filters: {},
      // filtersValues: {},
      // sort: null
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
      async init ({ state, commit, dispatch, getters }) {
        // if (getters.datasetUrl) {
        //   try {
        //     const dataset = (await axios.get(getters.datasetUrl)).data
        //     const filters = Object.assign({}, ...getters.config.filters.fields.map(f => ({ [f]: [] })))
        //     const filtersValues = {}
        //     const qs = filters2qs(getters.config.staticFilters || [])
        //     const fields = dataset.schema.reduce((a, b) => { a[b.key] = b; return a }, {})
        //     for (const field of Object.keys(filters).slice(0, getters.config.filters.type === 'tree' ? 1 : Object.keys(filters).length - 1)) {
        //       const labels = fields[field]['x-labels']
        //       const params = { field, agg_size: 1000 }
        //       if (qs.length) params.qs = qs
        //       if (getters.config.filters.sort === 'alpha') params.sort = field
        //       const results = (await axios.get(getters.datasetUrl + '/values_agg', { params })).data
        //       filtersValues[field] = results.aggs.map(a => ({ value: a.value, text: (labels ? labels[a.value] : a.value) + ` (${a.total})` }))
        //     }
        //     commit('setAny', { dataset, filters, filtersValues })
        //     await dispatch('refresh', true)
        //   } catch (err) {
        //     dispatch('setError', err)
        //   }
        // }
      },
      // async refresh ({ state, getters, commit, dispatch }, reset) {
      //   if (reset) commit('setAny', { page: 1 })
      //   else if (state.count === state.data.length) return
      //   commit('setAny', { loading: true })
      //   try {
      //     const { data } = (await axios.get(getters.datasetUrl + '/lines', { params: getters.query }))
      //     commit('setAny', { data: (reset ? [] : state.data).concat(data.results), count: data.total, page: getters.query.page + 1 })
      //   } catch (err) {
      //     dispatch('setError', (err.response && err.response.data) || err.message)
      //   }
      //   commit('setAny', { loading: false })
      // },
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
