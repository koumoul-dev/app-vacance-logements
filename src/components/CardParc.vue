<template>
  <v-card
    flat
    color="#cbf3d2"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text font-weight-bold">
      PARC
    </div>
    <v-card-text
      v-if="ageInseeData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="6">
          <span>Total logements</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ ageInseeData.TOT_PARC.toLocaleString('fr') }}</strong>
        </v-col>
        <v-col>
          <v-sparkline
            v-if="cityHistoricalData && cityHistoricalData.TOT_PARC_14"
            auto-draw
            smooth
            line-width="8"
            :value="evolutionCity"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Taux logement social</span>
        </v-col>
        <v-col
          :cols="4"
          class="px-0"
        >
          <strong>A venir</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Part des Logements Individuels</span>
        </v-col>
        <v-col
          :cols="4"
          class="px-0"
        >
          <strong>{{ ageInseeData.TX_MI.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Part des Logements Collectifs</span>
        </v-col>
        <v-col
          :cols="4"
          class="px-0"
        >
          <strong>{{ ageInseeData.TX_COLL.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Age du parc</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-sparkline
      v-if="ages"
      smooth
      auto-line-width
      type="bar"
      :labels="ageLabels"
      :value="ages"
      :padding="16"
    />
    <v-card-text
      v-if="ageInseeData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="6">
          <span>Total logements EPCI</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ epciHistoricalData.TOT_PARC_18_EPCI.toLocaleString('fr') }}</strong>
        </v-col>
        <v-col>
          <v-sparkline
            v-if="epciHistoricalData && epciHistoricalData.TOT_PARC_14_EPCI"
            line-width="8"
            auto-draw
            smooth
            :value="evolutionEPCI"
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
    evolutionCity () {
      return [
        0,
        (this.cityHistoricalData.TOT_PARC_15 / this.cityHistoricalData.TOT_PARC_14 - 1) * 100,
        (this.cityHistoricalData.TOT_PARC_16 / this.cityHistoricalData.TOT_PARC_14 - 1) * 100,
        (this.cityHistoricalData.TOT_PARC_17 / this.cityHistoricalData.TOT_PARC_14 - 1) * 100,
        (this.cityHistoricalData.TOT_PARC_18 / this.cityHistoricalData.TOT_PARC_14 - 1) * 100
      ]
    },
    evolutionEPCI () {
      return [
        0,
        (this.epciHistoricalData.TOT_PARC_15_EPCI / this.epciHistoricalData.TOT_PARC_14_EPCI - 1) * 100,
        (this.epciHistoricalData.TOT_PARC_16_EPCI / this.epciHistoricalData.TOT_PARC_14_EPCI - 1) * 100,
        (this.epciHistoricalData.TOT_PARC_17_EPCI / this.epciHistoricalData.TOT_PARC_14_EPCI - 1) * 100,
        (this.epciHistoricalData.TOT_PARC_18_EPCI / this.epciHistoricalData.TOT_PARC_14_EPCI - 1) * 100
      ]
    },
    ages () {
      return [
        this.ageInseeData.TOT_PARC_av19,
        this.ageInseeData.TOT_PARC_19_45,
        this.ageInseeData.TOT_PARC_46_70,
        this.ageInseeData.TOT_PARC_71_90,
        this.ageInseeData.TOT_PARC_91_05,
        this.ageInseeData.TOT_PARC_06_15
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
