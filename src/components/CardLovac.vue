<template>
  <v-card
    flat
    color="#b0e0e6"
    rounded="xl"
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
        <v-col :cols="8">
          <span>Logements vacants privés</span>
        </v-col>
        <v-col :cols="4">
          <strong v-if="lovacData">{{ lovacData.Nb_logvac_pp.toLocaleString('fr') }}</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>Taux de vacance</span>
        </v-col>
        <v-col :cols="4">
          <strong v-if="lovacData">{{ lovacData.Prop_logvac_pp.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>Logements vacants &lt; 2 ans</span>
        </v-col>
        <v-col :cols="4">
          <strong v-if="lovacData">{{ lovacData.Prop_logvac_pp_C.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>Logements vacants &gt; 2 ans</span>
        </v-col>
        <v-col :cols="4">
          <strong v-if="lovacData">{{ lovacData.Prop_logvac_pp_2A.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>Logements privés</span>
        </v-col>
        <v-col :cols="4">
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
      Sources : Lovac 2020
    </div>
  </v-card>
</template>

<script>
import CardDescription from './card-description'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { CardDescription },
  computed: {
    ...mapState(['lovacData']),
    ...mapGetters(['config'])
  }
}
</script>
