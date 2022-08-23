<template>
  <v-app>
    <v-main>
      <div v-if="application">
        <div
          v-if="!configureError"
          data-iframe-height
        >
          <search />
          <v-tooltip
            v-if="inseeInfos && params('capture') !== 'true'"
            top
          >
            <template #activator="{ on }">
              <v-btn
                :disabled="!!downloading"
                icon
                fab
                absolute
                right
                target="_blank"
                @click="download(captureLink, inseeInfos.INSEE_COM+'-'+currentLevel+'.pdf')"
                v-on="on"
              >
                <v-icon v-if="!downloading">
                  mdi-file-pdf-box
                </v-icon>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="primary"
                />
              </v-btn>
            </template>
            <span>Exporter au format PDF</span>
          </v-tooltip>
          <v-container
            v-if="inseeInfos"
            class="pa-0"
          >
            <city-infos />
            <v-row
              v-if="!loading"
              class="mx-0"
            >
              <v-col :cols="12">
                <card-parc />
              </v-col>
              <v-col
                :cols="12"
                :md="8"
              >
                <card-insee />
              </v-col>
              <v-col
                :cols="12"
                :md="4"
              >
                <card-lovac />
              </v-col>
              <v-col
                :cols="12"
                :sm="6"
              >
                <card-pc />
              </v-col>
              <v-col
                :cols="12"
                :sm="6"
              >
                <card-ges />
              </v-col>
            </v-row>
          </v-container>
          <v-container
            class="px-5"
          >
            <v-col class="text-center pa-6 mt-6">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :size="100"
              />
              <v-alert
                v-else-if="!inseeInfos"
                :value="true"
                type="info"
                outlined
              >
                <h4>Veuillez sélectionner une commune</h4>
              </v-alert>
            </v-col>
          </v-container>
        </div>
        <v-img v-else-if="params('draft') === 'true'">
          <v-container class="px-5">
            <v-col class="text-center px-5 mb-5">
              <v-alert
                :value="true"
                type="warning"
                outlined
              >
                <h3>{{ configureError }}</h3>
              </v-alert>
            </v-col>
          </v-container>
        </v-img>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Search from './components/Search'
import CardParc from './components/CardParc'
import CardInsee from './components/CardInsee'
import CardLovac from './components/CardLovac'
import CardPc from './components/CardPC'
import CardGes from './components/CardGES'
import CityInfos from './components/CityInfos'
import fileDownload from 'js-file-download'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Search,
    CardParc,
    CardInsee,
    CardLovac,
    CardPc,
    CardGes,
    CityInfos
  },
  data: () => ({
    downloading: false
  }),
  computed: {
    ...mapState(['application', 'inseeInfos', 'loading', 'currentLevel']),
    ...mapGetters(['config', 'captureUrl']),
    configureError () {
      return null
    },
    captureLink () {
      const params = new URLSearchParams(window.location.search)
      params.set('capture', true)
      return `${this.captureUrl}/api/v1/print?format=A2&target=${encodeURIComponent(this.application.exposedUrl + '?' + params.toString())}`
    }
  },
  methods: {
    params (p) {
      const params = new URLSearchParams(window.location.search)
      return params.get(p)
    },
    async download (url, name) {
      this.downloading = true
      try {
        const { data } = await axios.get(url, { responseType: 'blob' })
        fileDownload(data, name)
      } catch (err) {
        console.log(err)
      }
      this.downloading = null
    }
  }
}
</script>
