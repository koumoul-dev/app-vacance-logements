<template>
  <v-card
    flat
    color="#faa381"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text font-weight-bold">
      PC AUTORISES
    </div>
    <v-card-text
      v-if="pcData"
      class="text-center black--text"
    >
      <v-row align="center">
        <v-col :cols="6">
          <span>Logements autorisés</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ pcData.NB_LGT_TOT_CREES.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Logements Individuels autorisés </span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ pcData.NB_LGT_IND_CREES.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col :cols="6">
          <span>Logements Collectifs autorisés</span>
        </v-col>
        <v-col
          :cols="2"
          class="px-0"
        >
          <strong>{{ pcData.NB_LGT_COL_CREES.toLocaleString('fr') }}</strong>
        </v-col>
      </v-row>
      <br>
      <div>Rénover les <strong>##</strong> logements vacants &gt; 2 ans aurait contribué à <strong>## %</strong> de la construction neuve cette année</div>
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
// import axios from 'axios'

export default {
  computed: {
    ...mapState(['pcData'])
  }
}
</script>
