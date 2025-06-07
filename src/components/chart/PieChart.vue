<template>
  <div style="max-width: 300px; margin: auto;">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    data: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: ['#33c7d8', '#4BA3C3', '#66D1E0', '#1E5F73', '#A5E6ED'],
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.$t('pageHome.deviceConsumptionDistribution'),
            font: {
              size: 16
            },
            color: '#003a6a'
          },
          legend: {
            position: 'bottom',
          },
        }
      }
    }
  }
}
</script>
