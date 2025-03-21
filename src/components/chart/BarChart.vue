<template>
  <v-card class="bg-light elevation-0">
    <div class="text-center">
        <h6 class="text-h6" style="color: black;">You have spend</h6>
        <h4 class="text-h4 font-weight-bold" style="color: black;">{{ totalSpending }}€</h4>
    </div>

    <div id="chart-container" style="height: 300px;">
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </v-card>
</template>

<script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export default {
    name: 'BarChart',
    components: {
      Bar
    },
    data() {
      return {
        expenses: [40, 20, 30, 40, 50, 87, 94, 75, 37, 78, 98, 87],
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Monthly expenses',
              data: [40, 20, 30, 40, 50, 87, 94, 75, 37, 78, 98, 87],
              backgroundColor: '#33c7d8',
              borderColor: 'transparent',
              borderWidth: 1
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.raw}€`;
                }
              }
            }
          },
          scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
              ticks: {
                callback: function(value) {
                  return `${value}€`;
                }
              }
            }
          }
        }
      };
    },
    computed: {
      totalSpending() {
        return this.expenses.reduce((acc, cur) => acc + cur, 0);
      }
    }
  };
</script>

<style scoped>
</style>
