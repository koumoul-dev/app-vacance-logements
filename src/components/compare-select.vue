<template>
  <v-checkbox
    :input-value="!disabled && compare.datasetOffset === datasetOffset && compare.property === property"
    :readonly="disabled || (compare.datasetOffset === datasetOffset && compare.property === property)"
    :off-icon="!disabled && !capture ? '$radioOff' : ''"
    :on-icon="!capture ? '$radioOn' : ''"
    dense
    hide-details
    @click="!disabled && $store.commit('setAny', {compare: { datasetOffset, property } })"
  >
    <template #label>
      <span :class="bold ? 'font-weight-bold':''">{{ label }}</span>
    </template>
  </v-checkbox>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    label: { type: String, required: true },
    datasetOffset: { type: Number, required: true },
    property: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    bold: { type: Boolean, default: false }
  },
  computed: {
    ...mapState(['compare']),
    capture () {
      return window.triggerCapture
    }
  }
}
</script>
