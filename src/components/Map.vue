<template lang="html">
  <div :style="`height:100%;width:100%`">
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
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import 'maplibre-gl/dist/maplibre-gl.css'
import axios from 'axios'

const maplibregl = require('maplibre-gl')

const zooms = {
  city: 10,
  epci: 9,
  department: 7,
  region: 6
}

const levelPropName = {
  city: 'INSEE_COM',
  epci: 'CODE_EPCI',
  department: 'INSEE_DEP',
  region: 'INSEE_REG'
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
    loading: true
  }),
  computed: {
    ...mapState(['inseeInfos', 'currentLevel', 'compareData']),
    ...mapGetters(['tileserverUrl', 'config'])
  },
  watch: {
    // layers: {
    //   handler (layers) {
    //     for (const layer of Object.values(layers)) {
    //       for (const id of layer.ids) {
    //         this.map.setLayoutProperty(id, 'visibility', layer.visible ? 'visible' : 'none')
    //         const l = this.config.layers.find(e => e.dataset.id === id)
    //         const source = this.map.getSource(id)
    //         if (source && source.tiles) {
    //           const select = ['_id']
    //           if (l.colors.type === 'enum' && l.colors.enumOptions.field) select.push(l.colors.enumOptions.field)
    //           else if (l.colors.type === 'range' && l.colors.rangeOptions.field) select.push(l.colors.rangeOptions.field)
    //           if (l.shapes.type === 'icon-multiple' && l.shapes.field) select.push(l.shapes.field)
    //           else if (l.shapes.type === 'circle' && layer.shapes.radius.field) select.push(l.shapes.radius.field)
    //           const qs = []
    //           Object.entries(layer.filters || {}).forEach(([field, value]) => {
    //             qs.push(`(${field}:"${value}")`)
    //           })
    //           const dataTilesUrl = `${this.datasetInfos[id].href}/lines?format=pbf&size=10000&sort=_rand&select=${select.join(',')}${qs.length ? ('&qs=' + qs.join(' AND ')) : ''}&finalizedAt=${this.datasets[id].finalizedAt}&xyz={x},{y},{z}`
    //           if (source.tiles[0] !== dataTilesUrl) {
    //             source.tiles = [dataTilesUrl]
    //             this.map.style.sourceCaches[id].clearTiles()
    //             this.map.style.sourceCaches[id].update(this.map.transform)
    //             this.map.triggerRepaint()
    //           }
    //         }
    //       }
    //     }
    //   },
    //   deep: true
    // },
    // datasets (val) {
    //   if (!this.map) this.initMap()
    // },
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
        for (const level of levels) {
          if (level.id === this.currentLevel) {
            this.map.addLayer({
              id: 'admin-divs-colors-' + level.id,
              type: 'fill',
              source: 'admin-divs',
              'source-layer': level['source-layer'],
              paint: {
                'fill-color': ['string', ['feature-state', 'color'], 'white'],
                'fill-opacity': 0.7
              }
            })

            this.map.addLayer({
              id: 'admin-divs-lines-' + level.id,
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
              id: 'admin-divs-labels-' + level.id,
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

            this.map.setFeatureState({
              source: 'admin-divs',
              sourceLayer: level['source-layer'],
              id: this.inseeInfos[levelPropName[this.currentLevel]]
            }, {
              selected: true
            })

            // Change the cursor to a pointer when the it enters a feature.
            this.map.on('mouseenter', 'admin-divs-colors-' + level.id, (e) => {
              const feature = e.features && e.features[0]
              if (feature && (!feature.state || !feature.state.selected)) this.map.getCanvas().style.cursor = 'pointer'
            })

            // Change it back to a pointer when it leaves.
            this.map.on('mouseleave', 'admin-divs-colors-' + level.id, () => {
              this.map.getCanvas().style.cursor = ''
            })
          }
        }
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
        const level = levels.find(l => l.id === this.currentLevel)
        this.map.setFeatureState({
          source: 'admin-divs',
          sourceLayer: level['source-layer'],
          id: this.inseeInfos[levelPropName[this.currentLevel]]
        }, {
          selected: false
        })
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
      // if (this.selected) {
      //   this.selected.forEach(feature => {
      //     this.map.setFeatureState({
      //       source: feature.source,
      //       sourceLayer: 'results',
      //       id: feature.id
      //     }, {
      //       selected: false
      //     })
      //   })
      //   this.$store.commit('setAny', { selected: null })
      // }
      // if (features && features.length) {
      //   features.slice(0, 1).forEach(feature => {
      //     this.map.setFeatureState({
      //       source: feature.source,
      //       sourceLayer: 'results',
      //       id: feature.id
      //     }, {
      //       selected: true
      //     })
      //   })
      //   this.$store.commit('setAny', { selected: features.slice(0, 1) })
      // }
    }
  }
}
</script>

<style lang="css">
</style>
