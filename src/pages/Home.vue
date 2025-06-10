<template>
  <v-app class="bg-light">
    <Header :title="$t('pageHome.title')" />

    <v-main>
      <v-container>
        <!-- Budget History Chart -->
        <div style="height: 400px;">
          <BudgetHistoryChart />
        </div>

        <!-- Budget -->
        <v-card class="mt-6 pa-4 bg-light elevation-20">
          <v-row align="center">
            <v-col cols="6" class="d-flex align-center">
              <v-progress-circular
                :model-value="budget.percentage"
                :color="getBudgetColor"
                :size="40"
                width="4"
              ></v-progress-circular>
              <span class="ml-3 text-subtitle-1 font-weight-medium">{{ $t('pageHome.budgetStatus') }}</span>
            </v-col>

            <v-col cols="6" class="text-right">
              <div v-if="loading">
                <v-skeleton-loader type="text" width="100"></v-skeleton-loader>
              </div>
              <template v-else>
                <div>
                  <span class="text-h5 font-weight-bold">
                    {{ formatAmount(budget.remaining) }}€
                  </span>
                </div>
                <div>
                  <span class="text-subtitle-2 text-grey">
                    {{ $t('pageHome.of') }} {{ formatAmount(budget.goal) }}€
                  </span>
                </div>
                <div>
                  <span class="text-caption" :class="getBudgetTextColor">
                    {{ getBudgetStatus }}
                  </span>
                </div>
              </template>
            </v-col>
          </v-row>
        </v-card>


        <!-- Quick Actions -->
        <v-card class="mt-6 pa-4 bg-light elevation-20">
          <v-row class="align-content-center">
            <v-col cols="12">
              <h3 class="text-h6 mb-4">{{ $t('pageHome.quickActions') }}</h3>
              <v-btn
                color="primary"
                class="mr-2"
                @click="$router.push('/consumptionGoal')"
              >
                <v-icon class="mr-2">mdi-target</v-icon>
                {{ $t('pageHome.updateBudgetGoal') }}
              </v-btn>
              <v-btn
                color="secondary"
                @click="loadBudgetData"
              >
                <v-icon class="mr-2">mdi-refresh</v-icon>
                {{ $t('pageHome.refreshData') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import BarChart from "@/components/chart/BarChart.vue";
import { userService } from "@/services/api.js";
import BudgetHistoryChart from "@/components/chart/BudgetHistoryChart.vue";

export default {
  name: "Home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BudgetHistoryChart, BarChart,
  },
  data() {
    return {
      loading: false,
      budget: {
        goal: 0,
        remaining: 0,
        percentage: 0,
      },
    };
  },
  mounted() {
    this.loadBudgetData();
  },
  computed: {
    getBudgetColor() {
      const percentage = this.budget.percentage;
      if (percentage > 66) return "green";
      if (percentage > 33) return "orange";
      return "red";
    },
    getBudgetTextColor() {
      return `text--${this.getBudgetColor}`;
    },
    getBudgetStatus() {
      const percentage = this.budget.percentage;
      if (percentage > 66) return this.$t("pageHome.goodStanding");
      if (percentage > 33) return this.$t("pageHome.watchSpending");
      return this.$t("pageHome.budgetAlert");
    },
  },
  methods: {
    async loadBudgetData() {
      this.loading = true;
      try {
        const goalData = await userService.getCurrentGoal();
        if (goalData && goalData.consumption_goal_euros !== undefined) {
          this.budget.goal = goalData.consumption_goal_euros;
          this.budget.remaining = goalData.consumption_goal_euros * 0.8; // placeholder
          this.budget.percentage = (this.budget.remaining / this.budget.goal) * 100;
        }
      } catch (error) {
        console.error("Error loading budget data:", error);
      } finally {
        this.loading = false;
      }
    },

    formatAmount(amount) {
      return parseFloat(amount).toLocaleString(this.$i18n.locale === 'fr' ? 'fr-FR' : 'en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
};
</script>


<style scoped>
*{
  color : #003a6a;
}

.bg-light {
  height: 100%;
  background-color: #fff !important;
  border-radius: 15px;
}

.budget-card {
  transition: all 0.3s ease;
}

.budget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.text-caption {
  font-size: 0.75rem;
  letter-spacing: 0.0333333333em;
  line-height: 1.25rem;
  font-weight: 500;
}

.quick-actions {
  margin-top: 2rem;
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

.chart-container {
  min-height: 300px;
  position: relative;
}
</style>
