<template>
  <v-card
    rounded="lg"
    class="pa-2 ma-2"
    outlined
  >
    <v-row
      v-if="contextData"
      align="center"
    >
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Population
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ contextData.metric.toLocaleString('fr') }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Degré de densité
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ currentLevel === 'city' ? contextData.results[0].LIB_DEG_DENS : '-' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Aire d’attraction des villes
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ currentLevel === 'city' ? contextData.results[0].AAV : '-' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        :cols="6"
        :sm="3"
        class="py-0 px-1 text-center"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              TLV / THLV
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ currentLevel === 'city' ? (contextData.results[0].TLV_THLV && 'oui') || 'non' : '-' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-card-text v-else>
      <v-row>
        <v-col class="text-center px-5 py-1">
          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="20"
          />
          <v-alert
            v-else
            :value="true"
            type="warning"
            outlined
            class="pa-0 ma-0"
          >
            <h4>Aucune information de contexte disponible</h4>
          </v-alert>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['contextData', 'loading', 'currentLevel'])
  }
}
</script>
