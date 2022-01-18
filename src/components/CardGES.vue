<template>
  <v-card
    flat
    color="#c9dbba"
    rounded="xl"
    style="height:100%;"
  >
    <div class="text-center text-h5 py-3 grey--text font-weight-bold">
      EMISSIONS GES
    </div>
    <v-card-text
      v-if="ageInseeData"
      class="text-center black--text"
    >
      <span>Construction des MI : <strong>A venir</strong></span><br>
      <br>
      <span>Construction des COLL : <strong>A venir</strong></span><br>
      <br>
      <span>Total : <strong>A venir</strong></span><br>
      <br>
      <v-divider />
      <br>
      <span>Equivalent transport</span><br>
      <br>
      <span><strong>## km</strong> parcourus en voiture</span><br>
      <br>
      <span><strong>##</strong> vols A/R entre Montréal et Toronto</span><br>
      <br>
      <span><strong>##</strong> A/R en train entre Paris et Bordeaux</span><br>
      <br>

      <!-- Emission carbone maison individuelle = 425 kg co2 . m²
        Emission carbone logement collectif = 525 kg co2 . m²
        Surface moyenne maison individuelle = 112 m²
        Surface moyenne logement collectif = 63 m² -->
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
    ...mapState(['ageInseeData'])
  }
}
</script>
