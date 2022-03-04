<template>
  <v-card
    flat
    color="#c9dbba"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      EMISSIONS GES
      <card-description
        title="Emissions de Gaz à Effet de Serre (estimations, eqCO2)"
        field="descGES"
      />
    </div>
    <v-card-text
      v-if="pcData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="8">
          <span>GES émis pour la construction neuve</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ totGES.toLocaleString('fr', {maximumFractionDigits: 0}) }} t</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>GES émis pour la construction de logements individuels</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ constIndiv.toLocaleString('fr', {maximumFractionDigits: 0}) }} t</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>GES émis pour la construction de logements collectifs</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ constColl.toLocaleString('fr', {maximumFractionDigits: 0}) }} t</strong>
        </v-col>
      </v-row>
      <div class="text-center text-h6 py-3 grey--text font-weight-bold">
        Cela correspond à :
      </div>
      <v-row align="center">
        <v-col
          :cols="4"
          class="text-right"
        >
          <strong>{{ (totGES/0.00014).toLocaleString('fr') }}</strong>
        </v-col>
        <v-col :cols="8">
          <span>km parcourus en citadine thermique</span>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="4"
          class="text-right"
        >
          <strong>{{ (totGES/1.0088).toLocaleString('fr', {maximumFractionDigits: 0}) }}</strong>
        </v-col>
        <v-col :cols="8">
          <span>A/R Paris - New York en avion</span>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="4"
          class="text-right"
        >
          <strong>{{ (totGES/0.001858).toLocaleString('fr', {maximumFractionDigits: 0}) }}</strong>
        </v-col>
        <v-col :cols="8">
          <span>A/R Paris - Bordeaux en TGV</span>
        </v-col>
      </v-row>

      <!-- Emission carbone maison individuelle = 425 kg co2 . m²
        Emission carbone logement collectif = 525 kg co2 . m²
        Surface moyenne maison individuelle = 112 m²
        Surface moyenne logement collectif = 63 m² -->
    </v-card-text>
    <v-container
      v-else
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
  </v-card>
</template>

<script>
import CardDescription from './card-description'
import { mapState } from 'vuex'

export default {
  components: { CardDescription },
  computed: {
    ...mapState(['pcData']),
    lgtInd () {
      return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_IND_CREES, 0)
    },
    lgtCol () {
      return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_COL_CREES, 0)
    },
    constIndiv () {
      return (425 * 112 * this.lgtInd) / 1000
    },
    constColl () {
      return (525 * 63 * this.lgtCol) / 1000
    },
    totGES () {
      return this.constIndiv + this.constColl
    }
  }
}
</script>
