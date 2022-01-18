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
      v-if="ageInseeData"
      class="text-center black--text"
    >
      <span>Logements autorisés : <strong>A venir</strong></span><br>
      <br>
      <span>MI : <strong>A venir</strong></span><br>
      <br>
      <span>COLL : <strong>A venir</strong></span><br>
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
    ...mapState(['ageInseeData'])
  }
}
</script>
