<template>
  <div
    class="pa-2"
    style="height:500px"
  >
    <v-card
      flat
      color="#b0e0e6"
      rounded="xl"
      style="height:100%;display:flex;flex-direction:column;"
    >
      <div class="text-center text-h5 py-3 grey--text font-weight-bold">
        VACANCE LOVAC (19)
      </div>
      <v-card-text
        v-if="lovacData"
        class="text-center black--text"
        style="flex:1"
      >
        <span>Taux de vacance : <strong>{{ lovacData.Prop_logvac_pp_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Vacance &lt; 2 ans : <strong>{{ lovacData.Prop_logvac_pp_C_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Vacance &gt; 2 ans : <strong>{{ lovacData.Prop_logvac_pp_2A_010119.toLocaleString('fr', {maximumFractionDigits: 1}) }} %</strong></span><br>
        <br>
        <span>Parc logements privés :</span><br>
        <strong>{{ lovacData.Nb_log_pp_2020.toLocaleString('fr') }}</strong><br>
        <br>
        <span>Logements vacants privés :</span><br>
        <strong>{{ lovacData.Nb_logvac_pp_010119.toLocaleString('fr') }}</strong><br>
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
    lovacData: null
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
      if (!this.city) this.lovacData = null
      else {
        const params = {
          qs: `INSEE_COM:${this.city.value}`
        }
        const { data } = (await axios.get(this.config.datasets[1].href + '/lines', { params }))
        if (data.total) this.lovacData = data.results[0]
      }
    }
  }
}
</script>
