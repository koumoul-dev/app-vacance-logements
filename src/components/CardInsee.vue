<template>
  <v-card
    flat
    color="#dcdba8"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      VACANCE INSEE
      <card-description
        title="Logements Vacants (Insee 2018)"
        field="descInsee"
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
              <span>Logements vacants</span>
            </v-col>
            <v-col :cols="3">
              <strong>{{ log1Data.TOT_LV.toLocaleString('fr') }}</strong>
            </v-col>
            <v-col
              :cols="3"
              class="px-1 py-0"
            >
              <history-graph
                v-if="evolutionData && evolutionData.TOT_LV_14"
                :value="evolutionTotCity"
                :labels="evolutionLabels"
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
            <v-col :cols="6">
              <span>Taux de vacance</span>
            </v-col>
            <v-col :cols="3">
              <strong>{{ log1Data.TX_LV.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
            <v-col
              :cols="3"
              class="px-1 py-0"
            >
              <history-graph
                v-if="evolutionData && evolutionData.TX_LV_14"
                :value="evolutionTxCity"
                :labels="evolutionLabels"
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
            <v-col :cols="8">
              <span>Part des Logements Individuels vacants</span>
            </v-col>
            <v-col :cols="4">
              <strong>{{ log1Data.TX_LV_MI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          :cols="12"
          :md="6"
        >
          <v-row align="center">
            <v-col :cols="8">
              <span>Part des Logements Collectifs vacants</span>
            </v-col>
            <v-col :cols="4">
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
    evolutionTxCity () {
      return [
        Number(this.evolutionData.TX_LV_14),
        Number(this.evolutionData.TX_LV_15),
        Number(this.evolutionData.TX_LV_16),
        Number(this.evolutionData.TX_LV_17),
        Number(this.evolutionData.TX_LV_18)
      ]
    },
    evolutionTotCity () {
      return [
        parseInt(this.evolutionData.TOT_LV_14),
        parseInt(this.evolutionData.TOT_LV_15),
        parseInt(this.evolutionData.TOT_LV_16),
        parseInt(this.evolutionData.TOT_LV_17),
        parseInt(this.evolutionData.TOT_LV_18)
      ]
    },
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
        this.log1Data.LV_av19_COL,
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
