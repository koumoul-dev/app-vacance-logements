<template>
  <div
    class="pa-2"
    style="height:500px"
  >
    <v-card
      flat
      color="#dcdba8"
      rounded="xl"
      style="height:100%;display:flex;flex-direction:column;"
    >
      <div class="text-center text-h5 py-3 grey--text font-weight-bold">
        VACANCE INSEE (18)
      </div>
      <v-card-text
        v-if="inseeData"
        class="text-center black--text"
        style="flex:1"
      >
        <span>Taux de vacance : <strong>{{ inseeData.TX_LV_INSEE_18.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Logements vacants :</span><br>
        <strong>{{ inseeData.TOT_LV_INSEE_18.toLocaleString('fr') }}</strong><br>
        <br>
        <span>LV MI : <strong>{{ inseeData.TX_MI_LV_INSEE_18.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Génération MI LV : <strong>A venir</strong></span><br>
        <br>
        <span>LV COLL : <strong>{{ inseeData.TX_COL_LV_INSEE_18.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Génération COLL LV : <strong>A venir</strong></span><br>
        <br>
        <v-divider />
        <br>
        <strong>EPCI</strong><br>
        <br>
        <span>Taux de vacance : <strong>A venir</strong></span><br>
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
