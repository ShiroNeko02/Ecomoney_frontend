   <!-- Nouveau composant BudgetHistory.vue -->
   <template>
     <v-card class="mt-6 pa-4 bg-light elevation-4">
       <h3 class="text-h6 mb-4 text-black">Budget History</h3>
       <v-chart v-if="!loading" class="chart" :option="option" />
       <v-skeleton-loader v-else type="chart" class="mx-auto text-black"></v-skeleton-loader>
     </v-card>
   </template>

   <script>
   import { use } from 'echarts/core';
   import { CanvasRenderer } from 'echarts/renderers';
   import { LineChart } from 'echarts/charts';
   import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
   import VChart from 'vue-echarts';

   use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);

   export default {
     components: { VChart },
     data() {
       return {
         loading: false,
         option: {
           tooltip: { trigger: 'axis' },
           legend: { data: ['Budget', 'Actual Spending'] },
           xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
           yAxis: { type: 'value', axisLabel: { formatter: '{value} €' } },
           series: [
             {
               name: 'Budget',
               type: 'line',
               data: [100, 120, 120, 150, 150, 180],
               markPoint: { data: [{ type: 'max', name: 'Max' }] }
             },
             {
               name: 'Actual Spending',
               type: 'line',
               data: [90, 110, 135, 145, 160, 170],
               markLine: { data: [{ type: 'average', name: 'Avg' }] }
             }
           ]
         }
       };
     }
   }
   </script>
