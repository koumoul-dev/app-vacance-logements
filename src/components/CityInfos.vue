<template>
  <v-card
    rounded="xl"
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
          :input-value="currentLevel === 'region'"
          @click="select('region')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Région
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.NOM_REG }}
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
          :input-value="currentLevel === 'department'"
          @click="select('department')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Département
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.NOM_DEP }}
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
          :input-value="currentLevel === 'epci'"
          @click="select('epci')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Intercommunalité
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.NOM_EPCI }}
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
          :input-value="currentLevel === 'city'"
          @click="select('city')"
        >
          <v-list-item-content>
            <v-list-item-title>
              Commune
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inseeInfos.NOM_COM }}
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
    ...mapState(['inseeInfos', 'currentLevel'])
  },
  methods: {
    select (level) {
      if (level !== this.currentLevel) {
        this.$store.commit('setAny', { currentLevel: level })
        this.$store.dispatch('fetch')
      }
    }
  }
}
</script>
