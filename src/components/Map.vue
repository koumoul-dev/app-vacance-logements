<template lang="html">
  <v-card
    :style="`height:100%;min-height:400px;width:100%`"
    rounded="lg"
    flat
  >
    <v-progress-linear
      v-if="loading"
      style="z-index:1;pointer-events: none;"
      indeterminate
      color="primary"
    />
    <div
      id="map"
      :style="`height: calc(100% - 4px);margin-top:${!loading ? 4 : 0}px`"
    />
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import 'maplibre-gl/dist/maplibre-gl.css'
import axios from 'axios'
import { levelPropName, lovacPropName, inseePropName, pcPropName, levelOffset } from '../assets/defs.js'

const maplibregl = require('maplibre-gl')

const zooms = {
  city: 10,
  epci: 9,
  department: 7,
  region: 6
}

const levels = [{
  id: 'region',
  'source-layer': 'regions',
  minzoom: 0
}, {
  id: 'department',
  'source-layer': 'departements',
  minzoom: 5
},
{
  id: 'epci',
  'source-layer': 'epci',
  minzoom: 6
}, {
  id: 'city',
  'source-layer': 'communes',
  minzoom: 8
}]

export default {
  data: () => ({
    loading: true,
    compareLevel: null,
    compareData: null,
    selected: null
  }),
  computed: {
    ...mapState(['inseeInfos', 'currentLevel', 'compare']),
    ...mapGetters(['tileserverUrl', 'config'])
  },
  watch: {
    compare: {
      handler () {
        this.updateCompare()
      },
      deep: true
    },
    inseeInfos: {
      handler (newV, oldV) {
        this.selectFeature()
        if (!oldV || newV.INSEE_REG !== oldV.INSEE_REG) this.updateCompare()
      },
      deep: true
    },
    currentLevel (newV, oldV) {
      if (this.map && this.map.isStyleLoaded()) this.updateAdminDivsLayer(newV, oldV)
    },
    loading (val) {
      if (!val && this.map) {
        this.map.resize()
        this.loading = false
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      if (!maplibregl || !this.inseeInfos || !this.currentLevel) return
      const center = this.inseeInfos._geopoint.split(',').reverse()
      this.map = new maplibregl.Map({
        container: 'map',
        center,
        zoom: zooms[this.currentLevel],
        style: this.tileserverUrl + '/styles/positron/style.json',
        transformRequest: (url, resourceType) => {
          return {
            url,
            credentials: 'include' // include cookies, for data-fair sessions
          }
        }
      })
      this.map.addControl(new maplibregl.NavigationControl(), 'top-right')

      // Disable map rotation using right click + drag
      this.map.dragRotate.disable()
      // Disable map rotation using touch rotation gesture
      this.map.touchZoomRotate.disableRotation()

      this.map.on('click', (e) => this.select([e.lngLat.lng, e.lngLat.lat]))
      this.map.on('moveend', (e) => { this.loading = true })
      this.map.once('load', () => {
        this.map.addSource('admin-divs', { type: 'vector', tiles: [this.tileserverUrl + '/data/admin-divs-latest/{z}/{x}/{y}.pbf'], promoteId: 'code' })
        this.updateAdminDivsLayer(this.currentLevel)
      })

      // "idle" event seems to be the best indication that the map is fully loaded
      this.map.on('idle', () => {
        if (window.triggerCapture && this.map.getSource('data-fair')) window.triggerCapture()
        this.loading = false
      })
    },
    async  select (pos) {
      const feature = this.map.queryRenderedFeatures(this.map.project(pos), {
        layers: ['admin-divs-colors-' + this.currentLevel]
      }).pop()
      if (feature) {
        // const level = levels.find(l => l.id === this.currentLevel)
        // this.map.setFeatureState({
        //   source: 'admin-divs',
        //   sourceLayer: level['source-layer'],
        //   id: this.inseeInfos[levelPropName[this.currentLevel]]
        // }, {
        //   selected: false
        // })
        // this.$store.commit('setAny', { city: { value: feature.properties.code, text: feature.properties.name } })
        // this.$store.commit('setAny', { city: null })

        //  const code = inseeMapping[state.city.value] || state.city.value
        const params = { qs: `${levelPropName[this.currentLevel]}:${feature.properties.code}`, sort: '-POPULATION' }
        const inseeInfos = (await axios.get('https://opendata.koumoul.com/data-fair/api/v1/datasets/france-contours-2020-commune-medium/lines', { params })).data.results[0]
        // if (inseeMapping[state.city.value]) {
        //   inseeInfos.INSEE_COM = state.city.value
        //   inseeInfos.NOM_COM = state.city.text.split(' (')[0]
        // }
        this.$store.commit('setAny', { city: { value: inseeInfos.INSEE_COM, text: inseeInfos.NOM_COM } })
      }
    },
    selectFeature () {
      if (this.selected) {
        this.map.setFeatureState(this.selected, {
          selected: false
        })
      }
      const level = levels.find(l => l.id === this.currentLevel)
      this.selected = {
        source: 'admin-divs',
        sourceLayer: level['source-layer'],
        id: this.inseeInfos[levelPropName[this.currentLevel]]
      }
      this.map.setFeatureState(this.selected, {
        selected: true
      })
      this.map.setCenter(this.inseeInfos._geopoint.split(',').reverse())
    },
    updateAdminDivsLayer (newLevel, oldLevel) {
      if (oldLevel) {
        this.map.removeLayer('admin-divs-colors-' + oldLevel)
        this.map.removeLayer('admin-divs-lines-' + oldLevel)
        this.map.removeLayer('admin-divs-labels-' + oldLevel)
        this.map.setZoom(zooms[newLevel])
      }

      const idx = levels.findIndex(l => l.id === newLevel)
      const level = levels[idx]
      this.map.addLayer({
        id: 'admin-divs-colors-' + newLevel,
        type: 'fill',
        source: 'admin-divs',
        'source-layer': level['source-layer'],
        paint: {
          'fill-color': this.$vuetify.theme.themes.light.primary, // ['string', ['feature-state', 'color'], this.$vuetify.theme.themes.light.primary],
          'fill-opacity': ['number', ['feature-state', 'opacity'], 0]
        }
      })

      if (idx > 0) {
        this.map.addLayer({
          id: 'admin-divs-lines-' + levels[idx - 1].id,
          type: 'line',
          source: 'admin-divs',
          'source-layer': levels[idx - 1]['source-layer'],
          paint: {
            'line-color': 'black',
            'line-width': 2
          },
          filter: ['in', 'code', this.inseeInfos[levelPropName[levels[idx - 1].id]]]
        })
      }

      this.map.addLayer({
        id: 'admin-divs-lines-' + newLevel,
        type: 'line',
        source: 'admin-divs',
        'source-layer': level['source-layer'],
        paint: {
          'line-color': ['case', ['boolean', ['feature-state', 'selected'], false], 'red', '#AAAAAA'],
          'line-width': 1,
          'line-offset': ['case', ['boolean', ['feature-state', 'selected'], false], 1, 0]
        }
      })

      this.map.addLayer({
        id: 'admin-divs-labels-' + newLevel,
        source: 'admin-divs',
        'source-layer': level['source-layer'],
        type: 'symbol',
        paint: {
          'text-color': '#333333', // this.$vuetify.theme.themes.light.primary,
          'text-halo-color': 'hsl(0, 0%, 100%)',
          'text-halo-width': 1
        },
        layout: {
          'text-field': '{name}',
          'text-font': ['Klokantech Noto Sans Regular'],
          'text-size': 14
        }
      })

      this.selectFeature()

      // Change the cursor to a pointer when the it enters a feature.
      this.map.on('mouseenter', 'admin-divs-colors-' + newLevel, (e) => {
        const feature = e.features && e.features[0]
        if (feature && (!feature.state || !feature.state.selected)) this.map.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'admin-divs-colors-' + newLevel, () => {
        this.map.getCanvas().style.cursor = ''
      })

      this.updateCompare()
    },
    async updateCompare () {
      if (this.compareData) {
        this.compareData.forEach(d => {
          this.map.setFeatureState({
            source: 'admin-divs',
            sourceLayer: this.compareLevel,
            id: d.code
          }, {
            opacity: undefined
          })
        })
      }
      try {
        const codePropName = {
          0: inseePropName[this.currentLevel],
          4: inseePropName[this.currentLevel],
          8: lovacPropName[this.currentLevel],
          12: pcPropName[this.currentLevel]
        }[this.compare.datasetOffset]
        const params = { size: 5000, select: this.compare.property + ',' + codePropName }
        if (this.currentLevel === 'city') {
          params.qs = (this.compare.datasetOffset === 8 ? 'CODE_REG' : 'REG') + ':' + this.inseeInfos.INSEE_REG
        }
        // const params = { qs: `${lovacPropName[this.currentLevel]}:${this.inseeInfos[levelPropName[this.currentLevel]]}` }
        const results = (await axios.get(this.config.datasets[this.compare.datasetOffset + levelOffset[this.currentLevel]].href + '/lines', { params })).data.results
        this.compareData = results.map(l => ({ code: l[codePropName], value: Number(l[this.compare.property]) }))

        const level = levels.find(l => l.id === this.currentLevel)
        this.compareLevel = level['source-layer']
        const values = this.compareData.map(d => d.value)
        const min = Math.min(...values)
        const max = Math.max(...values)
        this.compareData.forEach(d => {
          this.map.setFeatureState({
            source: 'admin-divs',
            sourceLayer: this.compareLevel,
            id: d.code
          }, {
            opacity: (d.value - min) / (max - min)
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="css">
</style>
