<template>
  <div
    class="pa-2"
    style="height:500px"
  >
    <v-card
      flat
      color="#c9dbba"
      rounded="xl"
      style="height:100%;display:flex;flex-direction:column;"
    >
      <div class="text-center text-h5 py-3 grey--text font-weight-bold">
        EMISSIONS GES
      </div>
      <v-card-text
        v-if="inseeData"
        class="text-center black--text"
        style="flex:1"
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import axios from 'axios'

export default {
  data: () => ({
    inseeData: null
  }),
  computed: {
    ...mapState(['city']),
    ...mapGetters(['config'])
  },
  watch: {
    city () {
      this.refresh()
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    async refresh () {
      if (!this.city) this.inseeData = null
      else {
        this.inseeData = true
        // const params = {
        //   qs: `CODGEO:${this.city.value}`
        // }
        // const { data } = (await axios.get(this.config.datasets[0].href + '/lines', { params }))
        // if (data.total) this.inseeData = data.results[0]
      }
    }
  }
}
</script>
