<template>
  <v-card
    flat
    color="#b0e0e6"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text font-weight-bold">
      VACANCE LOVAC (19)
    </div>
    <v-card-text
      v-if="cityLovacData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="6">
          <span>Taux de vacance</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ cityLovacData.Prop_logvac_pp_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Vacance &lt; 2 ans</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ cityLovacData.Prop_logvac_pp_C_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Vacance &gt; 2 ans</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ cityLovacData.Prop_logvac_pp_2A_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Parc logements privés</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ cityLovacData.Nb_log_pp_2020.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Logements vacants privés</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ cityLovacData.Nb_logvac_pp_010119.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <!-- <v-divider /> -->
      <v-row align="center">
        <v-col :cols="6">
          <span>Taux de vacance EPCI</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong v-if="epciLovacData">{{ epciLovacData.Prop_logvac_pp_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong>
          <strong v-else>inconnu</strong>
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
          <strong v-if="epciLovacData">{{ epciLovacData.Nb_logvac_pp_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }}</strong>
          <strong v-else>inconnu</strong>
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
    ...mapState(['cityLovacData', 'epciLovacData'])
  }
}
</script>
