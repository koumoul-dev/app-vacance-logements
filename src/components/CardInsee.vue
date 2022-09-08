<template>
  <!-- :color="!capture ? '#dcdba8' : undefined"
  :outlined="capture" -->
  <v-card
    outlined
    rounded="lg"
    style="height:100%;display: flex;flex-flow: column;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      {{ config.titleInsee }}
      <card-description
        field="Insee"
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
            <v-col
              :cols="7"
              class="pa-2"
            >
              <!-- <span>Logements vacants</span> -->
              <compare-select
                label="Logements vacants"
                :dataset-offset="0"
                property="TOT_LV"
              />
            </v-col>
            <v-col
              :cols="3"
              class="pa-2"
            >
              <strong>{{ log1Data.TOT_LV.toLocaleString('fr') }}</strong>
            </v-col>
            <v-col
              :cols="2"
              class="px-1 py-0"
            >
              <history-graph
                v-if="evolutionData && evolutionData.length > 1"
                :value="evolutionData.map(d => d.TOT_LV)"
                :labels="evolutionData.map(d => d.ANNEE)"
                title="Logements vacants"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          :cols="12"
          :md="6"
        >
          <v-row align="center">
            <v-col
              :cols="7"
              class="pa-2"
            >
              <!-- <span>Taux de vacance</span> -->
              <compare-select
                label="Taux de vacance"
                :dataset-offset="0"
                property="TX_LV"
                bold
              />
            </v-col>
            <v-col
              :cols="3"
              class="pa-2"
            >
              <strong>{{ log1Data.TX_LV.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
            <v-col
              :cols="2"
              class="px-1 py-0"
            >
              <history-graph
                v-if="evolutionData && evolutionData.length > 1"
                :value="evolutionData.map(d => d.TX_LV)"
                :labels="evolutionData.map(d => d.ANNEE)"
                title="Taux de vacance"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="12"
          :md="6"
        >
          <v-row align="center">
            <v-col
              :cols="7"
              class="pa-2"
            >
              <!-- <span>Part des Logements Individuels vacants</span> -->
              <compare-select
                label="Part des Logements Individuels vacants"
                :dataset-offset="0"
                property="TX_LV_MI"
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ log1Data.TX_LV_MI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          :cols="12"
          :md="6"
        >
          <v-row align="center">
            <v-col
              :cols="7"
              class="pa-2"
            >
              <!-- <span>Part des Logements Collectifs vacants</span> -->
              <compare-select
                label="Part des Logements Collectifs vacants"
                :dataset-offset="0"
                property="TX_LV_COLL"
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ log1Data.TX_LV_COLL.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="12"
          :md="6"
          class="text-center"
        >
          <v-sparkline
            v-if="agesMi"
            smooth
            auto-line-width
            type="bar"
            :gradient="[$vuetify.theme.themes.light.primary]"
            :labels="ageLabels"
            :value="agesMi"
            :padding="16"
            :label-size="8"
          />
          <span>Age des logements individuels vacants</span>
        </v-col>
        <v-divider
          v-if="windowWidth >= 600"
          vertical
        />
        <v-col
          :cols="12"
          :md="6"
          class="text-center"
        >
          <v-sparkline
            v-if="agesColl"
            smooth
            auto-line-width
            type="bar"
            :gradient="[$vuetify.theme.themes.light.primary]"
            :labels="ageLabels"
            :value="agesColl"
            :padding="16"
            :label-size="8"
          />
          <span>Age des logements collectifs vacants</span>
        </v-col>
      </v-row>
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
      style="width:100%;"
    >
      Sources : {{ config.sourcesInsee }}
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
    ...mapState(['evolutionData', 'log1Data', 'loading']),
    ...mapGetters(['config']),
    agesMi () {
      return [
        this.log1Data.LV_av19_MI,
        this.log1Data.LV_19_45_MI,
        this.log1Data.LV_46_70_MI,
        this.log1Data.LV_71_90_MI,
        this.log1Data.LV_91_05_MI,
        this.log1Data.LV_06_15_MI
      ]
    },
    agesColl () {
      return [
        typeof this.log1Data.LV_av19_COLL === 'number' ? this.log1Data.LV_av19_COLL : this.log1Data.LV_av19_COL, // or for temporary compatibility
        this.log1Data.LV_19_45_COLL,
        this.log1Data.LV_46_70_COLL,
        this.log1Data.LV_71_90_COLL,
        this.log1Data.LV_91_05_COLL,
        this.log1Data.LV_06_15_COLL
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
