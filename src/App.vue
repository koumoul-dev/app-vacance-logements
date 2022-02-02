<template>
  <v-app>
    <v-main>
      <div v-if="application">
        <div
          v-if="!configureError"
          data-iframe-height
        >
          <search />
          <v-container v-if="inseeInfos">
            <city-infos />
            <v-row class="mx-0">
              <v-col
                :cols="12"
                :sm="6"
                :md="4"
              >
                <card-parc />
              </v-col>
              <v-col
                :cols="12"
                :sm="6"
                :md="4"
              >
                <card-insee />
              </v-col>
              <v-col
                :cols="12"
                :sm="6"
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
            v-else
            class="px-5"
          >
            <v-col class="text-center pa-6 mt-6">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :size="100"
              />
              <v-alert
                v-else
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
  computed: {
    ...mapState(['application', 'inseeInfos', 'loading']),
    ...mapGetters(['config']),
    configureError () {
      // if (!this.datasetUrl) return 'Veuillez sélectionner une source de données'
      return null
    }
  },
  methods: {
    params (p) {
      const params = new URLSearchParams(window.location.search)
      return params.get(p)
    }
  }
}
</script>
