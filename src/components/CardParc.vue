<template>
  <v-card
    flat
    :color="!capture ? '#cbf3d2' : undefined"
    :outlined="capture"
    rounded="xl"
    style="height:100%;display: flex;flex-flow: column;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      {{ config.titleParc }}
      <card-description
        field="Parc"
      />
    </div>
    <v-card-text
      v-if="log1Data"
      class="black--text"
    >
      <v-row align="center">
        <v-col
          :cols="12"
          :md="6"
        >
          <v-row align="center">
            <v-col :cols="6">
              <span>Parc total de logements</span>
            </v-col>
            <v-col :cols="3">
              <strong>{{ log1Data.TOT_PARC.toLocaleString('fr') }}</strong>
            </v-col>
            <v-col
              :cols="3"
              class="px-1 py-0"
            >
              <history-graph
                v-if="evolutionData && evolutionData.length > 1"
                :value="evolutionData.map(d => d.TOT_PARC)"
                :labels="evolutionData.map(d => d.ANNEE)"
                title="Total logements"
              />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="6">
              <span>Résidences principales</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ log1Data.TX_RP.toLocaleString('fr', {maximumFractionDigits: 0}) }} %</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="6">
              <span>Résidences secondaires</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ log1Data.TX_RS.toLocaleString('fr', {maximumFractionDigits: 0}) }} %</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="6">
              <span>Taux de logements sociaux</span>
            </v-col>
            <v-col :cols="4">
              <strong v-if="currentLevel === 'city'">{{ log1Data.TX_LS.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
              <strong v-else>A venir</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="6">
              <span>Part des Logements Individuels</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ log1Data.TX_MI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="6">
              <span>Part des Logements Collectifs</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ log1Data.TX_COLL.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          :cols="12"
          :md="6"
          class="text-center"
        >
          <v-sparkline
            v-if="ages"
            smooth
            auto-line-width
            type="bar"
            :labels="ageLabels"
            :value="ages"
            :padding="16"
            :label-size="8"
          />
          <span>Age du parc</span>
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
      Sources : {{ config.sourcesParc }}
    </div>
  </v-card>
</template>

<script>
import HistoryGraph from './history-graph'
import CardDescription from './card-description'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { HistoryGraph, CardDescription },
  computed: {
    ...mapState(['evolutionData', 'log1Data', 'currentLevel']),
    ...mapGetters(['config']),
    ages () {
      return [
        this.log1Data.TOT_PARC_av19,
        this.log1Data.TOT_PARC_19_45,
        this.log1Data.TOT_PARC_46_70,
        this.log1Data.TOT_PARC_71_90,
        this.log1Data.TOT_PARC_91_05,
        this.log1Data.TOT_PARC_06_15
      ]
    },
    ageLabels () {
      return [
        'Avant 1919',
        '1919 - 1945',
        '1945 - 1970',
        '1971 - 1990',
        '1991 - 2005',
        '2006 - 2015'
      ]
    },
    capture () {
      return window.triggerCapture
    }
  }
}
</script>
