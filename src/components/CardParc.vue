<template>
  <div
    class="pa-2"
    style="height:500px"
  >
    <v-card
      flat
      color="#cbf3d2"
      rounded="xl"
      style="height:100%;display:flex;flex-direction:column;"
    >
      <div class="text-center text-h5 py-3 grey--text font-weight-bold">
        PARC
      </div>
      <v-card-text
        v-if="inseeData"
        class="text-center black--text"
        style="flex:1"
      >
        <span>Total logements :</span><br>
        <strong>{{ inseeData.TOT_LOG_INSEE_18.toLocaleString('fr') }}</strong><br>
        <br>
        <span>Taux logement social :</span><br>
        <strong>A venir</strong><br>
        <br>
        <span>MI logements : <strong>{{ inseeData.TX_MI_INSEE_18.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>COLL : <strong>{{ inseeData.TX_COL_INSEE_18.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Age du parc :</span><br>
        <strong>A venir</strong><br>
        <br>
        <span>Evolution sur les X dernières années :</span><br>
        <strong>A venir</strong>
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
import axios from 'axios'

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
        const params = {
          qs: `CODGEO:${this.city.value}`
        }
        const { data } = (await axios.get(this.config.datasets[0].href + '/lines', { params }))
        if (data.total) this.inseeData = data.results[0]
      }
    }
  }
}
</script>
