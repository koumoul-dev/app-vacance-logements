<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    value: { type: Array, required: true },
    labels: { type: Array, required: true },
    title: { type: String, required: true }
  },
  computed: {
    chartData () {
      console.log(this.$vuetify.theme.themes.light.primary)
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            borderColor: this.$vuetify.theme.themes.light.primary,
            backgroundColor: undefined,
            data: this.value
          }
        ]
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, { aspectRatio: 2, responsive: true })
  }
}
</script>
