<template>
  <!-- :color="!capture ? '#c9dbba' : undefined"
  :outlined="capture" -->
  <v-card
    outlined
    rounded="lg"
    style="height:100%;display: flex;flex-flow: column;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      {{ config.titleGES }}
      <card-description
        field="GES"
      />
    </div>
    <v-card-text
      v-if="pcData"
      class="black--text"
    >
      <div class="text-h6 py-3 grey--text text--darken-1 font-weight-bold">
        Emissions de GES (estimations, eqCO2)
      </div>
      <v-row align="center">
        <v-col
          :cols="7"
          :offset="1"
        >
          <span>Total pour la construction neuve</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ totGES.toLocaleString('fr', {maximumFractionDigits: 0}) }} t</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="7"
          :offset="1"
        >
          <span>Logements individuels</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ constIndiv.toLocaleString('fr', {maximumFractionDigits: 0}) }} t</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="7"
          :offset="1"
        >
          <span>Logements collectifs</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ constColl.toLocaleString('fr', {maximumFractionDigits: 0}) }} t</strong>
        </v-col>
      </v-row>
      <div class="text-h6 py-3 grey--text text--darken-1 font-weight-bold">
        Cela correspond à :
      </div>
      <v-row align="center">
        <v-col
          :cols="2"
          :offset="1"
        >
          <strong>{{ (totGES/1.0088).toLocaleString('fr', {maximumFractionDigits: 0}) }}</strong>
        </v-col>
        <v-col :cols="9">
          <span>vols A/R Paris - New York</span>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="2"
          :offset="1"
        >
          <strong>{{ (contextData && contextData.results[0].POP_COM ? totGES/contextData.results[0].POP_COM : 0).toLocaleString('fr', {maximumFractionDigits: 1}) }}</strong>
        </v-col>
        <v-col :cols="9">
          <span>t. CO2 / habitant</span>
        </v-col>
      </v-row>
      <template v-if="lovacData">
        <div class="text-h6 py-3 grey--text text--darken-1 font-weight-bold">
          Gisement vacant
        </div>
        <v-row align="center">
          <v-col
            :cols="7"
            :offset="1"
          >
            <span>Potentiel vacant mobilisable (nb logement)</span>
          </v-col>
          <v-col :cols="4">
            <strong>{{ lovacData.Nb_logvac_2A.toLocaleString('fr', {maximumFractionDigits: 0}) }}</strong>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            :cols="7"
            :offset="1"
          >
            <span>Potentiel vacant mobilisable (production neuve)</span>
          </v-col>
          <v-col :cols="4">
            <strong>{{ (100*lovacData.Nb_logvac_2A/pcData.NB_LGT_TOT_AUT).toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
    <v-card-text v-else>
      <v-container
        class="px-5"
      >
        <v-col class="text-center px-5 mb-5">
          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="80"
          />
          <v-alert
            v-else
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
      Sources : {{ config.sourcesGES }}
    </div>
  </v-card>
</template>

<script>
import CardDescription from './card-description'
// import CompareSelect from './compare-select'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { CardDescription },
  computed: {
    ...mapState(['pcData', 'loading', 'contextData', 'lovacData']),
    ...mapGetters(['config']),
    constIndiv () {
      return (425 * 112 * this.pcData.NB_LGT_IND_MEC) / 1000
    },
    constColl () {
      return (525 * 63 * this.pcData.NB_LGT_COL_MEC) / 1000
    },
    totGES () {
      return this.constIndiv + this.constColl
    },
    capture () {
      return window.triggerCapture
    }
  }
}
</script>
