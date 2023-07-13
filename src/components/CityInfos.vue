<template>
  <v-card
    rounded="lg"
    class="pa-2 ma-2"
    outlined
  >
    <v-row
      v-if="inseeInfos"
      align="center"
    >
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item
          color="primary"
          :input-value="!capture && currentLevel === 'region'"
          @click="select('region')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Région
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.nom_reg }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item
          color="primary"
          :input-value="!capture && currentLevel === 'department'"
          @click="select('department')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Département
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.nom_dep }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item
          color="primary"
          :input-value="!capture && currentLevel === 'epci'"
          @click="select('epci')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Intercommunalité
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.nom_epci }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item
          color="primary"
          :input-value="!capture && currentLevel === 'city'"
          @click="select('city')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Commune
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.nom_com }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-container
      v-else
      class="text-center"
    >
      <v-alert
        :value="true"
        type="warning"
        outlined
      >
        <h4>Aucune information disponible</h4>
      </v-alert>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['inseeInfos', 'currentLevel']),
    capture () {
      return window.triggerCapture
    }
  },
  mounted () {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('current-level')) {
      params.set('current-level', this.currentLevel)
      window.history.replaceState(null, null, window.location.pathname + '?' + params.toString())
    } else {
      this.$store.state.currentLevel = params.get('current-level')
    }
  },
  methods: {
    select (level) {
      if (level !== this.currentLevel) {
        this.$store.commit('setAny', { currentLevel: level })
        const params = new URLSearchParams(window.location.search)
        params.set('current-level', level)
        window.history.replaceState(null, null, window.location.pathname + '?' + params.toString())
        this.$store.dispatch('fetch')
      }
    }
  }
}
</script>
