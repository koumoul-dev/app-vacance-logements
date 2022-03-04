<template>
  <v-card
    flat
    color="#faa381"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      PC AUTORISES
      <card-description
        title="Permis de construire autorisés (Sitadel, 2018)"
        field="descPC"
      />
    </div>
    <v-card-text
      v-if="pcData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="8">
          <span>Logements autorisés</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ lgtTot.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>Logements Individuels autorisés </span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ lgtInd.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="8">
          <span>Logements Collectifs autorisés</span>
        </v-col>
        <v-col :cols="4">
          <strong>{{ lgtCol.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <br>
      <div v-if="lovacData">
        Rénover les <strong>{{ lovacData.Nb_logvac_2A_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }}</strong> logements vacants &gt; 2 ans aurait contribué à <strong>{{ lgtPerc }} %</strong> de la construction neuve cette année
      </div>
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
import CardDescription from './card-description'
import { mapState } from 'vuex'
// import axios from 'axios'

export default {
  components: { CardDescription },
  computed: {
    ...mapState(['pcData', 'lovacData']),
    lgtTot () {
      return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_TOT_CREES, 0)
    },
    lgtInd () {
      return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_IND_CREES, 0)
    },
    lgtCol () {
      return this.pcData.reduce((acc, curr) => acc + curr.NB_LGT_COL_CREES, 0)
    },
    lgtPerc () {
      if (!this.lgtTot) return 0
      return Math.min((this.lovacData.Nb_logvac_2A_010119 || 0) * 100 / this.lgtTot, 100)
    }
  }
}
</script>
