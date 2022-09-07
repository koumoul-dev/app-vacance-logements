<template>
  <v-card
    v-if="legend"
    rounded="lg"
    flat
    outlined
    :height="32"
  >
    <svg
      :height="30"
      :width="legend.width"
    >
      <defs>
        <linearGradient
          id="grad1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            :style="`stop-color:${$vuetify.theme.themes.light.primary};stop-opacity:0.1`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${$vuetify.theme.themes.light.primary};stop-opacity:1`"
          />
        </linearGradient>
      </defs>
      <rect
        x="100"
        :width="legend.width-200"
        height="30"
        fill="url(#grad1)"
        style="stroke:black; stroke-width:1;"
      />
      <line
        :y1="0"
        :x1="100+(legend.width-200)*(legend.value - legend.min) / (legend.max - legend.min)+1"
        :y2="30"
        :x2="100+(legend.width-200)*(legend.value - legend.min) / (legend.max - legend.min)+1"
        style="stroke:black; stroke-width:3;"
      />
      <text
        dx="90"
        dy="15"
        font-size="16px"
        text-anchor="end"
        dominant-baseline="central"
      >
        {{ legend.min }}
      </text>
      <text
        :dx="legend.width-90"
        dy="15"
        font-size="16px"
        text-anchor="start"
        dominant-baseline="central"
      >
        {{ legend.max }}
      </text>

    </svg>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['compare', 'legend'])
  }
}
</script>
