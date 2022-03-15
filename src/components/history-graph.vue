<template>
  <v-menu
    v-model="menu"
    :min-width="`${Math.max(336,windowWidth/3)}px`"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{on: onDialog}">
      <v-tooltip top>
        <template #activator="{ on: onTooltip }">
          <v-btn
            class="px-1"
            outlined
            v-on="{...onDialog, ...onTooltip}"
          >
            <v-icon v-if="value[0]<value[value.length-1]">
              mdi-arrow-top-right
            </v-icon>
            <v-icon v-else-if="value[0]>value[value.length-1]">
              mdi-arrow-bottom-right
            </v-icon>
            <v-icon v-else>
              mdi-arrow-right
            </v-icon>
            <!-- <v-sparkline
              line-width="8"
              auto-draw
              smooth
              :value="value"
            /> -->
          </v-btn>
        </template>
        <span>Détails de l'évolution</span>
      </v-tooltip>
    </template>
    <v-card v-if="menu">
      <v-toolbar
        dense
        flat
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click.native="menu = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <bar-chart
          :value="value"
          :labels="labels"
          :title="title"
          :width="null"
          :height="null"
        />
        <!-- <v-sparkline
          smooth
          auto-line-width
          type="bar"
          :labels="labels"
          :value="value"
          :padding="16"
          :label-size="8"
        /> -->
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import BarChart from './bar-chart'

export default {
  components: { BarChart },
  props: {
    value: { type: Array, required: true },
    title: { type: String, required: true },
    labels: { type: Array, required: true }
  },
  data () {
    return {
      menu: null
    }
  }
}
</script>
