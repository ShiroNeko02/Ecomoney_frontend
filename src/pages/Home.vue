<template>
  <v-app class="bg-light">
    <Header title="Home" />

    <v-main >
      <v-container>

        <!-- Bar Chart -->
        <v-card class="mt-4 pa-4 bg-light elevation-20">
          <BarChart />
        </v-card>

        <!-- Budget -->
        <v-card class="mt-6 pa-4 bg-light elevation-20">
          <v-row align="center">
            <v-col cols="6" class="d-flex align-center">
              <v-progress-circular :model-value="80" :size="40" width="4" color="cyan"></v-progress-circular>
              <span class="ml-3 text-subtitle-1 text-black font-weight-medium">Budget</span>
            </v-col>

            <v-col cols="6" class="text-right">
              <div>
                <span class="text-h5 font-weight-bold text-black text-center">200.00€</span>
              </div>
              <div>
                <span class="text-h7 text-black text-center">remaining</span>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- Pie Chart -->
        <v-card class="mt-6 pa-4 bg-light elevation-20">
          <PieChart :labels="['Device A', 'Device B', 'Device C','Others']" :data="[40, 30, 30, 20]" />
        </v-card>

      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script>
import BarChart from "@/components/chart/BarChart.vue";

export default {
  name: "Home",
  components: {
    BarChart,
  },
};
</script>

<style scoped>
.bg-light {
  height: 100%;
  background-color: #fff !important;
  border-radius: 15px;
}

.form {
  background-color: transparent!important;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 10px;
  margin-bottom: 22px;
  text-align: center;
  color: #2596be;
}
</style>
