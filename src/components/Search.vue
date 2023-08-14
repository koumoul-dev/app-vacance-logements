<template>
  <v-row
    align="center"
    :class="capture ? 'mt-3' : ''"
  >
    <v-col
      :cols="6"
      :sm="3"
      :order-sm="0"
    >
      <a
        v-if="config.leftLogo.length"
        :href="config.leftLink"
        target="blank"
      >
        <v-img
          :src="config.leftLogo"
          height="96px"
          contain
        />
      </a>
    </v-col>
    <v-col
      :cols="6"
      :sm="3"
      :order-sm="2"
    >
      <a
        v-if="config.rightLogo.length"
        :href="config.rightLink"
        target="blank"
      >
        <v-img
          :src="config.rightLogo"
          height="96px"
          contain
        />
      </a>
    </v-col>
    <v-col
      :cols="12"
      :sm="6"
      :order-sm="1"
      class="py-0"
    >
      <v-autocomplete
        v-if="!capture"
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
        :dense="windowWidth < 600"
        prepend-inner-icon="mdi-magnify"
        placeholder="Commune ou code postal"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    cities: [],
    search: '',
    loading: false
  }),
  computed: {
    ...mapGetters(['config']),
    city: {
      set: async function (val) { this.$store.state.city = val },
      get () { return this.$store.state.city }
    },
    capture () {
      return window.triggerCapture
    }
  },
  watch: {
    async search () {
      this.loading = true
      if (!this.search || this.search.length < 3) {
        this.cities = [...this.cities]
      } else {
        const cities = (await axios.get('https://datanova.laposte.fr/data-fair/api/v1/datasets/laposte-hexasmal/lines', { params: { q: this.search, q_mode: 'complete' } })).data.results
        this.cities = cities.map(r => ({ text: r.nom_de_la_commune + ` (${r.code_postal})`, value: r.code_commune_insee }))
        if ('paris'.includes(this.search.toLowerCase())) this.cities.unshift({ text: 'PARIS', value: '75056' })
        if ('lyon'.includes(this.search.toLowerCase())) this.cities.unshift({ text: 'LYON', value: '69123' })
        if ('marseille'.includes(this.search.toLowerCase())) this.cities.unshift({ text: 'Marseille', value: '13055' })
      }
      this.loading = false
    },
    city () {
      const params = new URLSearchParams(window.location.search)
      params.set('city-code', this.city.value)
      params.set('city-text', this.city.text)
      window.history.replaceState(null, null, window.location.pathname + '?' + params.toString())
      this.$store.dispatch('refresh')
    }
  },
  mounted () {
    const params = new URLSearchParams(window.location.search)
    const value = params.get('city-code')
    const text = params.get('city-text')
    if (value && text) {
      this.search = text
      this.cities = [{ value, text }]
      this.$store.state.city = { value, text }
    }
  }
}
</script>
