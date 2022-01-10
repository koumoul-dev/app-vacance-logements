<template>
  <v-app>
    <v-main>
      <div v-if="application">
        <search />
        <div
          v-if="!configureError"
        >
          <card-parc style="width:20%;display:inline-block;" />
          <card-insee style="width:20%;display:inline-block;" />
          <card-lovac style="width:20%;display:inline-block;" />
          <card-pc style="width:20%;display:inline-block;" />
          <card-ges style="width:20%;display:inline-block;" />
        </div>
        <v-img v-else-if="params('draft') === 'true'">
          <v-container class="px-5">
            <v-col class="text-center px-5 mb-5">
              <v-alert
                :value="true"
                type="warning"
                outlined
              >
                <h3>{{ configureError }}</h3>
              </v-alert>
            </v-col>
          </v-container>
        </v-img>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Search from './components/Search'
import CardParc from './components/CardParc'
import CardInsee from './components/CardInsee'
import CardLovac from './components/CardLovac'
import CardPc from './components/CardPC'
import CardGes from './components/CardGES'

export default {
  name: 'App',
  components: {
    Search,
    CardParc,
    CardInsee,
    CardLovac,
    CardPc,
    CardGes
  },
  computed: {
    ...mapState(['application']),
    ...mapGetters(['config']),
    configureError () {
      // if (!this.datasetUrl) return 'Veuillez sélectionner une source de données'
      return null
    }
  },
  mounted () {
    if (!this.configureError) this.$store.dispatch('init')
  },
  methods: {
    params (p) {
      const params = new URLSearchParams(window.location.search)
      return params.get(p)
    }
  }
}
</script>
