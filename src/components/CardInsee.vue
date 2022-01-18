<template>
  <v-card
    flat
    color="#dcdba8"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text font-weight-bold">
      VACANCE INSEE (18)
    </div>
    <v-card-text
      v-if="ageInseeData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="6">
          <span>Logements vacants</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ ageInseeData.TOT_LV.toLocaleString('fr') }}</strong>
        </v-col>
        <v-col>
          <v-sparkline
            v-if="cityHistoricalData && cityHistoricalData.TOT_LV_14"
            line-width="8"
            auto-draw
            smooth
            :value="evolutionTotCity"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Taux de vacance</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ ageInseeData.TX_LV.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
        <v-col>
          <v-sparkline
            v-if="cityHistoricalData && cityHistoricalData.TX_LV_14"
            line-width="8"
            auto-draw
            smooth
            :value="evolutionTxCity"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Part des Logements Individuels vacants</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ ageInseeData.TX_LV_MI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Part des Logements Collectifs vacants</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ ageInseeData.TX_LV_COLL.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="12">
          <span>Age des logements individuels vacants</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-sparkline
      v-if="agesMi"
      smooth
      auto-line-width
      type="bar"
      :labels="ageLabels"
      :value="agesMi"
      :padding="16"
    />
    <v-card-text
      v-if="ageInseeData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="12">
          <span>Age des logements collectifs vacants</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-sparkline
      v-if="agesColl"
      smooth
      auto-line-width
      type="bar"
      :labels="ageLabels"
      :value="agesColl"
      :padding="16"
    />
    <v-card-text
      v-if="ageInseeData"
      class="black--text"
    >
      <!-- <v-divider /> -->
      <v-row align="center">
        <v-col :cols="6">
          <span>Taux de vacance EPCI</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong v-if="epciHistoricalData">{{ epciHistoricalData.TX_LV_18_EPCI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
        <v-col>
          <v-sparkline
            v-if="epciHistoricalData && epciHistoricalData.TX_LV_14_EPCI"
            line-width="8"
            auto-draw
            smooth
            :value="evolutionTxEPCI"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Logements vacants EPCI</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong v-if="epciHistoricalData">{{ epciHistoricalData.TOT_LV_18_EPCI.toLocaleString('fr', {maximumFractionDigits: 1}) }}</strong>
          <strong v-else>inconnu</strong>
        </v-col>
        <v-col>
          <v-sparkline
            v-if="epciHistoricalData && epciHistoricalData.TOT_LV_14_EPCI"
            line-width="8"
            auto-draw
            smooth
            :value="evolutionTotEPCI"
          />
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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cityHistoricalData', 'epciHistoricalData', 'ageInseeData']),
    evolutionTxCity () {
      return [
        Number(this.cityHistoricalData.TX_LV_14),
        Number(this.cityHistoricalData.TX_LV_15),
        Number(this.cityHistoricalData.TX_LV_16),
        Number(this.cityHistoricalData.TX_LV_17),
        Number(this.cityHistoricalData.TX_LV_18)
      ]
    },
    evolutionTotCity () {
      return [
        parseInt(this.cityHistoricalData.TOT_LV_14),
        parseInt(this.cityHistoricalData.TOT_LV_15),
        parseInt(this.cityHistoricalData.TOT_LV_16),
        parseInt(this.cityHistoricalData.TOT_LV_17),
        parseInt(this.cityHistoricalData.TOT_LV_18)
      ]
    },
    evolutionTxEPCI () {
      return [
        Number(this.epciHistoricalData.TX_LV_14_EPCI),
        Number(this.epciHistoricalData.TX_LV_15_EPCI),
        Number(this.epciHistoricalData.TX_LV_16_EPCI),
        Number(this.epciHistoricalData.TX_LV_17_EPCI),
        Number(this.epciHistoricalData.TX_LV_18_EPCI)
      ]
    },
    evolutionTotEPCI () {
      return [
        Number(this.epciHistoricalData.TOT_LV_14_EPCI),
        Number(this.epciHistoricalData.TOT_LV_15_EPCI),
        Number(this.epciHistoricalData.TOT_LV_16_EPCI),
        Number(this.epciHistoricalData.TOT_LV_17_EPCI),
        Number(this.epciHistoricalData.TOT_LV_18_EPCI)
      ]
    },
    agesMi () {
      return [
        this.ageInseeData.LV_av19_MI,
        this.ageInseeData.LV_19_45_MI,
        this.ageInseeData.LV_46_70_MI,
        this.ageInseeData.LV_71_90_MI,
        this.ageInseeData.LV_91_05_MI,
        this.ageInseeData.LV_06_15_MI
      ]
    },
    agesColl () {
      return [
        this.ageInseeData.LV_av19_COL,
        this.ageInseeData.LV_19_45_COLL,
        this.ageInseeData.LV_46_70_COLL,
        this.ageInseeData.LV_71_90_COLL,
        this.ageInseeData.LV_91_05_COLL,
        this.ageInseeData.LV_06_15_COLL
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
