<template>
  <!-- :color="!capture ? '#b0e0e6' : undefined"
  :outlined="capture" -->
  <v-card
    outlined
    rounded="lg"
    style="height:100%;display: flex;flex-flow: column;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      {{ config.titleLovac }}
      <card-description
        field="Lovac"
      />
    </div>
    <v-card-text
      v-if="lovacData"
      class="black--text"
    >
      <v-row align="center">
        <v-col
          :cols="9"
          class="pa-2"
        >
          <!-- <span>Logements vacants privés</span> -->
          <compare-select
            label="Logements vacants privés"
            :dataset-offset="8"
            property="Nb_logvac_pp"
          />
        </v-col>
        <v-col
          :cols="3"
          class="pa-2"
        >
          <strong v-if="lovacData">{{ lovacData.Nb_logvac_pp.toLocaleString('fr') }}</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="9"
          class="pa-2"
        >
          <!-- <span>Taux de vacance</span> -->
          <compare-select
            label="Taux de vacance"
            :dataset-offset="8"
            property="Prop_logvac_pp"
            bold
          />
        </v-col>
        <v-col
          :cols="3"
          class="pa-2"
        >
          <strong v-if="lovacData">{{ lovacData.Prop_logvac_pp.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="9"
          class="pa-2"
        >
          <!-- <span>Logements vacants &lt; 2 ans</span> -->
          <compare-select
            label="Vacance frictionnelle (&lt; 2 ans)"
            :dataset-offset="8"
            property="Prop_logvac_pp_C"
          />
        </v-col>
        <v-col
          :cols="3"
          class="pa-2"
        >
          <strong v-if="lovacData">{{ lovacData.Prop_logvac_pp_C.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="9"
          class="pa-2"
        >
          <!-- <span>Logements vacants &gt; 2 ans</span> -->
          <compare-select
            label="Vacance structurelle (&gt; 2 ans)"
            :dataset-offset="8"
            property="Prop_logvac_pp_2A"
          />
        </v-col>
        <v-col
          :cols="3"
          class="pa-2"
        >
          <strong v-if="lovacData">{{ lovacData.Prop_logvac_pp_2A.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          :cols="9"
          class="pa-2"
        >
          <!-- <span>Logements privés</span> -->
          <compare-select
            label="Logements privés"
            :dataset-offset="8"
            property="Nb_log_pp"
          />
        </v-col>
        <v-col
          :cols="3"
          class="pa-2"
        >
          <strong v-if="lovacData">{{ lovacData.Nb_log_pp.toLocaleString('fr') }}</strong>
          <strong v-else>inconnu</strong>
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
      v-if="lovacData && typeof lovacData.TX_COUV === 'number'"
      class="text-center grey--text text--darken-3"
      style="width:100%;font-size:13px"
    >
      Taux de couverture LOVAC : {{ lovacData.TX_COUV.toLocaleString('fr', {maximumFractionDigits: 0}) }} %
    </div>
    <div
      class="text-caption text-center grey--text text--darken-1"
      style="width:100%"
    >
      Sources : {{ config.sourcesLovac }}
    </div>
  </v-card>
</template>

<script>
import CardDescription from './card-description'
import CompareSelect from './compare-select'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { CardDescription, CompareSelect },
  computed: {
    ...mapState(['lovacData', 'loading']),
    ...mapGetters(['config'])
  }
}
</script>
