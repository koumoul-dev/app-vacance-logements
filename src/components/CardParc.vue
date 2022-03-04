<template>
  <v-card
    flat
    color="#cbf3d2"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      PARC
      <card-description
        title="Parc total de logements (Insee 2018)"
        field="descParc"
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
                v-if="evolutionData && evolutionData.TOT_PARC_14"
                :value="evolutionCity"
                :labels="evolutionLabels"
                title="Total logements"
              />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col :cols="6">
              <span>Taux de logements sociaux</span>
            </v-col>
            <v-col :cols="4">
              <strong>A venir</strong>
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
import HistoryGraph from './history-graph'
import CardDescription from './card-description'
import { mapState } from 'vuex'

export default {
  components: { HistoryGraph, CardDescription },
  computed: {
    ...mapState(['evolutionData', 'log1Data']),
    evolutionCity () {
      return [
        this.evolutionData.TOT_PARC_14,
        this.evolutionData.TOT_PARC_15,
        this.evolutionData.TOT_PARC_16,
        this.evolutionData.TOT_PARC_17,
        this.evolutionData.TOT_PARC_18
      ]
    },
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
    evolutionLabels () {
      return [
        '2014',
        '2015',
        '2016',
        '2017',
        '2018'
      ]
    }
  }
}
</script>
