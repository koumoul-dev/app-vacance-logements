<template>
  <!-- :color="!capture ? '#cbf3d2' : undefined"
  :outlined="capture" -->
  <v-card
    outlined
    rounded="lg"
    style="height:100%;min-height:540px;display: flex;flex-flow: column;"
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
          :cols="7"
          class="pa-2"
        >
          <!-- <span v-if="capture">Parc total de logements</span> -->
          <compare-select
            label="Parc total de logements"
            :dataset-offset="0"
            property="TOT_PARC"
            bold
          />
        </v-col>
        <v-col
          :cols="3"
          class="pa-2"
        >
          <strong>{{ log1Data.TOT_PARC.toLocaleString('fr') }}</strong>
        </v-col>
        <v-col
          :cols="2"
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
        <v-col
          :cols="7"
          class="pa-2"
        >
          <!-- <span v-if="capture">Résidences principales</span> -->
          <compare-select
            label="Résidences principales"
            :dataset-offset="0"
            property="TX_RP"
          />
        </v-col>
        <v-col
          :cols="4"
          class="pa-2"
        >
          <strong>{{ log1Data.TX_RP.toLocaleString('fr', {maximumFractionDigits: 0}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="7"
          class="pa-2"
        >
          <!-- <span v-if="capture">Résidences secondaires</span> -->
          <compare-select
            label="Résidences secondaires"
            :dataset-offset="0"
            property="TX_RS"
          />
        </v-col>
        <v-col
          :cols="4"
          class="pa-2"
        >
          <strong>{{ log1Data.TX_RS.toLocaleString('fr', {maximumFractionDigits: 0}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="7"
          class="pa-2"
        >
          <!-- <span v-if="capture">Taux de logements sociaux</span> -->
          <compare-select
            label="Taux de logements sociaux"
            :dataset-offset="0"
            property="TX_LS"
          />
        </v-col>
        <v-col
          :cols="4"
          class="pa-2"
        >
          <strong v-if="currentLevel === 'city'">{{ log1Data.TX_LS.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>A venir</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="7"
          class="pa-2"
        >
          <!-- <span v-if="capture">Part des Logements Individuels</span> -->
          <compare-select
            label="Logements Individuels"
            :dataset-offset="0"
            property="TX_MI"
          />
        </v-col>
        <v-col
          :cols="4"
          class="pa-2"
        >
          <strong>{{ log1Data.TX_MI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="7"
          class="pa-2"
        >
          <!-- <span v-if="capture">Part des Logements Collectifs</span> -->
          <compare-select
            label="Logements Collectifs"
            :dataset-offset="0"
            property="TX_COLL"
          />
        </v-col>
        <v-col
          :cols="4"
          class="pa-2"
        >
          <strong>{{ log1Data.TX_COLL.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <!-- </v-col>
        <v-col
          :cols="12"
          :md="6"
          class="text-center"
        > -->
      <div class="text-center mt-4">
        <v-sparkline
          v-if="ages"
          smooth
          auto-line-width
          type="bar"
          :gradient="[$vuetify.theme.themes.light.primary]"
          :labels="ageLabels"
          :value="ages"
          :padding="16"
          :label-size="8"
        />
        <span>Age du parc</span>
      </div>
      <!-- </v-col>
      </v-row> -->
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
      Sources : {{ config.sourcesParc }}
    </div>
  </v-card>
</template>

<script>
import HistoryGraph from './history-graph'
import CardDescription from './card-description'
import CompareSelect from './compare-select'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { HistoryGraph, CardDescription, CompareSelect },
  computed: {
    ...mapState(['loading', 'evolutionData', 'log1Data', 'currentLevel']),
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
    }
  }
}
</script>
