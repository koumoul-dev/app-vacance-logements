<template>
  <!-- :color="!capture ? '#faa381' : undefined"
  :outlined="capture" -->
  <v-card
    outlined
    rounded="lg"
    style="height:100%;display: flex;flex-flow: column;"
  >
    <div class="text-center text-h5 py-3 grey--text text--darken-1 font-weight-bold">
      {{ config.titlePC }}
      <card-description
        field="PC"
      />
    </div>
    <v-card-text
      v-if="pcData"
      class="black--text"
    >
      <v-row align="center">
        <v-col :cols="10">
          <v-row>
            <v-col
              :cols="8"
              class="pa-2"
            >
              <!-- <span>Logements autorisés</span> -->
              <compare-select
                label="Logements autorisés"
                :dataset-offset="12"
                property="NB_LGT_TOT_AUT"
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ pcData.NB_LGT_TOT_AUT.toLocaleString('fr') }}</strong>
               &nbsp;
              <v-btn
                icon
                small
                @click="expandAuthorized = !expandAuthorized"
              >
                <v-icon>mdi-chevron-{{ expandAuthorized ? 'up' : 'down' }}<v-icon /></v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col
              :cols="8"
              class="pa-2"
            >
              <!-- <span>Taux d’effort de construction</span> -->
              <compare-select
                label="Taux d’effort de construction"
                :dataset-offset="12"
                property="NB_LGT_TOT_AUT"
                disabled
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ (100*pcData.NB_LGT_TOT_AUT/log1Data.TOT_PARC).toLocaleString('fr', {maximumFractionDigits: 2}) }} %</strong>
            </v-col>
          </v-row>
          <v-expand-transition>
            <v-card
              v-show="expandAuthorized"
              flat
              class="mt-2"
            >
              <v-row align="center">
                <v-col
                  :cols="8"
                  class="pa-2"
                >
                  <!-- <span>Logements Individuels autorisés</span> -->
                  <compare-select
                    label="Logements Individuels autorisés"
                    :dataset-offset="12"
                    property="NB_LGT_IND_AUT"
                  />
                </v-col>
                <v-col
                  :cols="4"
                  class="pa-2"
                >
                  <strong>{{ pcData.NB_LGT_IND_AUT.toLocaleString('fr') }}</strong>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col
                  :cols="8"
                  class="pa-2"
                >
                  <!-- <span>Logements Collectifs autorisés</span> -->
                  <compare-select
                    label="Logements Collectifs autorisés"
                    :dataset-offset="12"
                    property="NB_LGT_COL_AUT"
                  />
                </v-col>
                <v-col
                  :cols="4"
                  class="pa-2"
                >
                  <strong>{{ pcData.NB_LGT_COL_AUT.toLocaleString('fr') }}</strong>
                </v-col>
              </v-row>
            </v-card>
          </v-expand-transition>
        </v-col>
        <v-col :cols="2">
          <v-img
            src="../assets/logements autorisés.svg"
            height="96"
            contain
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-row align="start">
        <v-col :cols="10">
          <v-row align="center">
            <v-col
              :cols="8"
              class="pa-2"
            >
              <!-- <span>Logements mis en chantier</span> -->
              <compare-select
                label="Logements mis en chantier"
                :dataset-offset="12"
                property="NB_LGT_TOT_MEC"
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ pcData.NB_LGT_TOT_MEC.toLocaleString('fr') }}</strong>
              &nbsp;
              <v-btn
                icon
                small
                @click="expandBuilt = !expandBuilt"
              >
                <v-icon>mdi-chevron-{{ expandBuilt ? 'up' : 'down' }}<v-icon /></v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-expand-transition>
            <v-card
              v-show="expandBuilt"
              flat
              class="mt-2"
            >
              <v-row align="center">
                <v-col
                  :cols="8"
                  class="pa-2"
                >
                  <!-- <span>Logements Individuels mis en chantier</span> -->
                  <compare-select
                    label="Logements Individuels mis en chantier"
                    :dataset-offset="12"
                    property="NB_LGT_IND_MEC"
                  />
                </v-col>
                <v-col
                  :cols="4"
                  class="pa-2"
                >
                  <strong>{{ pcData.NB_LGT_IND_MEC.toLocaleString('fr') }}</strong>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col
                  :cols="8"
                  class="pa-2"
                >
                  <!-- <span>Logements Collectifs mis en chantier</span> -->
                  <compare-select
                    label="Logements Collectifs mis en chantier"
                    :dataset-offset="12"
                    property="NB_LGT_COL_MEC"
                  />
                </v-col>
                <v-col
                  :cols="4"
                  class="pa-2"
                >
                  <strong>{{ pcData.NB_LGT_COL_MEC.toLocaleString('fr') }}</strong>
                </v-col>
              </v-row>
            </v-card>
          </v-expand-transition>
        </v-col>
        <v-col
          :cols="2"
        >
          <v-img
            v-scale-transition
            src="../assets/logements mis en chantier.svg"
            :height="expandBuilt? 96 : 32"
            contain
            :class="expandBuilt ? 'mt-3': ''"
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-row align="center">
        <v-col :cols="10">
          <v-row align="center">
            <v-col
              :cols="8"
              class="pa-2"
            >
              <!-- <span>Flux d’artificialisation global</span> -->
              <compare-select
                label="Flux d’artificialisation global"
                :dataset-offset="12"
                property="naf19art20"
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ (pcData.naf19art20/ 10000).toLocaleString('fr', {maximumFractionDigits: 2}) }} ha</strong>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col
              :cols="8"
              class="pa-2"
            >
              <!-- <span>Flux d’artificialisation pour l’habitat</span> -->
              <compare-select
                label="Flux d’artificialisation pour l’habitat"
                :dataset-offset="12"
                property="art19hab20"
              />
            </v-col>
            <v-col
              :cols="4"
              class="pa-2"
            >
              <strong>{{ (pcData.art19hab20/10000).toLocaleString('fr', {maximumFractionDigits: 2}) }} ha</strong>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="2">
          <v-img
            src="../assets/artificialisation.svg"
            height="96"
            contain
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-container
        class="px-5"
      >
        <v-col class="text-center px-5 mb-5">
          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="80"
          />
          <v-alert
            v-else
            :value="true"
            type="warning"
            outlined
          >
            <h4>Aucune information disponible</h4>
          </v-alert>
        </v-col>
      </v-container>
    </v-card-text>
    <div style="flex: 1 1 auto;" />
    <div
      class="text-caption text-center grey--text text--darken-1"
      style="width:100%"
    >
      Sources : {{ config.sourcesPC }}
    </div>
  </v-card>
</template>

<script>
import CardDescription from './card-description'
import CompareSelect from './compare-select'
import { mapState, mapGetters } from 'vuex'
// import axios from 'axios'

export default {
  components: { CardDescription, CompareSelect },
  data: () => ({
    expandAuthorized: false,
    expandBuilt: false
  }),
  computed: {
    ...mapState(['pcData', 'lovacData', 'log1Data', 'loading']),
    ...mapGetters(['config']),
    lgtPerc () {
      if (!this.lgtTot) return 0
      return Math.min((this.lovacData.Nb_logvac_2A || 0) * 100 / this.lgtTot, 100)
    }
  }
}
</script>
