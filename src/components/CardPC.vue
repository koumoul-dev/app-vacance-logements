<template>
  <v-card
    flat
    color="#faa381"
    rounded="xl"
    style="height:100%;display: flex;flex-flow: column;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      {{ config.titlePC }}
      <card-description
        :title="title"
        field="descPC"
      />
    </div>
    <v-card-text
      v-if="pcData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="10">
          <v-row>
            <v-col :cols="8">
              <span>Logements autorisés</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ pcData.NB_LGT_TOT_AUT.toLocaleString('fr') }}</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="8">
              <span>Indice de construction</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ (100*pcData.NB_LGT_TOT_AUT/log1Data.TOT_PARC).toLocaleString('fr', {maximumFractionDigits: 2}) }} %</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="8">
              <span>Logements Individuels autorisés</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ pcData.NB_LGT_IND_AUT.toLocaleString('fr') }}</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="8">
              <span>Logements Collectifs autorisés</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ pcData.NB_LGT_COL_AUT.toLocaleString('fr') }}</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="2">
          <v-img
            src="../assets/logements autorisés.svg"
            height="96"
            contain
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-row align="center">
        <v-col :cols="10">
          <v-row align="center">
            <v-col :cols="8">
              <span>Logements mis en chantier</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ pcData.NB_LGT_TOT_MEC.toLocaleString('fr') }}</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="8">
              <span>Logements Individuels mis en chantier</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ pcData.NB_LGT_IND_MEC.toLocaleString('fr') }}</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="8">
              <span>Logements Collectifs mis en chantier</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ pcData.NB_LGT_COL_MEC.toLocaleString('fr') }}</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="2">
          <v-img
            src="../assets/logements mis en chantier.svg"
            height="96"
            contain
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-row align="center">
        <v-col :cols="10">
          <v-row align="center">
            <v-col :cols="8">
              <span>Flux d’artificialisation global</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ (pcData.naf18art19 / 10000).toLocaleString('fr', {maximumFractionDigits: 2}) }} ha</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="8">
              <span>Flux d’artificialisation pour l’habitat</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ (pcData.art18hab19/10000).toLocaleString('fr', {maximumFractionDigits: 2}) }} ha</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="2">
          <v-img
            src="../assets/artificialisation.svg"
            height="96"
            contain
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-container
        class="px-5"
      >
        <v-col class="text-center px-5 mb-5">
          <v-alert
            :value="true"
            type="warning"
            outlined
          >
            <h4>Aucune information disponible</h4>
          </v-alert>
        </v-col>
      </v-container>
    </v-card-text>
    <div style="flex: 1 1 auto;" />
    <div
      class="text-caption text-center grey--text text--darken-1"
      style="width:100%"
    >
      {{ title }}
    </div>
  </v-card>
</template>

<script>
import CardDescription from './card-description'
import { mapState, mapGetters } from 'vuex'
// import axios from 'axios'

export default {
  components: { CardDescription },
  computed: {
    ...mapState(['pcData', 'lovacData', 'log1Data']),
    ...mapGetters(['config']),
    // lgtTot () {
    //   return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_TOT_CREES, 0)
    // },
    // lgtInd () {
    //   return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_IND_CREES, 0)
    // },
    // lgtCol () {
    //   return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_COL_CREES, 0)
    // },
    lgtPerc () {
      if (!this.lgtTot) return 0
      return Math.min((this.lovacData.Nb_logvac_2A_010119 || 0) * 100 / this.lgtTot, 100)
    },
    title () {
      return 'Logements Vacants (Insee 2018)'
    }
  }
}
</script>
