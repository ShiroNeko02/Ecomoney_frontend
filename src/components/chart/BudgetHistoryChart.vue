   <!-- Nouveau composant BudgetHistory.vue -->
   <template>
     <v-card class="mt-6 pa-4 bg-light elevation-4">
       <h3 class="text-h6 mb-4">{{ $t('pageHome.budgetHistory.title') }}</h3>
       <v-chart v-if="!loading" class="chart" :option="option" />
       <v-skeleton-loader v-else type="chart" class="mx-auto"></v-skeleton-loader>
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
           legend: { data: [this.$t('pageHome.budgetHistory.budget'), this.$t('pageHome.budgetHistory.actualSpending')] },
           xAxis: {
             data: [
               this.$t('pageHome.budgetHistory.months.jan'),
               this.$t('pageHome.budgetHistory.months.feb'),
               this.$t('pageHome.budgetHistory.months.mar'),
               this.$t('pageHome.budgetHistory.months.apr'),
               this.$t('pageHome.budgetHistory.months.may'),
               this.$t('pageHome.budgetHistory.months.jun'),
             ],
           },
           yAxis: { type: 'value', axisLabel: { formatter: '{value} €' } },
           series: [
             {
               name: this.$t('pageHome.budgetHistory.budget'),
               type: 'line',
               data: [100, 120, 120, 150, 150, 180],
               markPoint: { data: [{ type: 'max', name: 'Max' }] }
             },
             {
               name: this.$t('pageHome.budgetHistory.actualSpending'),
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
