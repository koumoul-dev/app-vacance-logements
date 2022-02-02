<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template #activator="{on: onDialog}">
      <v-tooltip top>
        <template #activator="{ on: onTooltip }">
          <v-btn
            class="px-1"
            outlined
            text
            v-on="{...onDialog, ...onTooltip}"
          >
            <v-sparkline
              line-width="8"
              auto-draw
              smooth
              :value="value"
            />
          </v-btn>
        </template>
        <span>Description des champs</span>
      </v-tooltip>
    </template>
    <v-card v-if="dialog">
      <v-toolbar
        dense
        flat
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click.native="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <line-chart
          :value="value"
          :labels="labels"
          :title="title"
          :width="null"
          :height="null"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LineChart from './line-chart'

export default {
  components: { LineChart },
  props: {
    value: { type: Array, required: true },
    title: { type: String, required: true },
    labels: { type: Array, required: true }
  },
  data () {
    return {
      dialog: null
    }
  }
}
</script>
