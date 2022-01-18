<template>
  <v-row align="center">
    <v-col :cols="3">
      <v-img
        src="../assets/pdvplv.png"
        height="96"
        contain
      />
    </v-col>
    <v-col :cols="6">
      <v-autocomplete
        v-model="city"
        class="mt-5"
        :items="cities"
        :loading="loading"
        :search-input.sync="search"
        :filter="() => true"
        :clearable="true"
        return-object
        outlined
        rounded
        prepend-inner-icon="mdi-magnify"
        placeholder="Commune ou code postal"
      />
    </v-col>
    <v-col :cols="3" />
  </v-row>
</template>

<script>
// import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    cities: [],
    search: '',
    loading: false
  }),
  computed: {
    city: {
      set: async function (val) { this.$store.state.city = val },
      get () { return this.$store.state.city }
    }
  },
  watch: {
    async search () {
      this.loading = true
      if (!this.search || this.search.length < 3) {
        this.cities = [...this.cities]
      } else {
        const cities = (await axios.get('https://koumoul.com/data-fair/api/v1/datasets/base-officielle-des-codes-postaux/lines', { params: { q: this.search, q_mode: 'complete' } })).data.results
        this.cities = cities.map(r => ({ text: r.Nom_commune + ` (${r.Code_postal})`, value: r.Code_commune_INSEE }))
      }
      this.loading = false
    },
    city () {
      this.$store.dispatch('refresh')
    }
  }
}
</script>
