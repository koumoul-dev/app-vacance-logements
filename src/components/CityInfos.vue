<template>
  <v-card
    rounded="xl"
    class="ma-2"
    outlined
  >
    <v-row align="center">
      <v-col :cols="3">
        <v-list-item>
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
      <v-col :cols="3">
        <v-list-item>
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
      <v-col :cols="3">
        <v-list-item>
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
      <v-col :cols="3">
        <v-list-item>
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
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    inseeInfos: null
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
      if (!this.city) this.inseeInfos = null
      else {
        this.inseeInfos = true
        const params = {
          qs: `INSEE_COM:${this.city.value}`
        }
        const { data } = (await axios.get('https://opendata.koumoul.com/data-fair/api/v1/datasets/france-contours-2020-commune-medium/lines', { params }))
        if (data.total) this.inseeInfos = data.results[0]
      }
    }
  }
}
</script>
