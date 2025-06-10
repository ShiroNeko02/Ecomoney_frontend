<template>
  <v-app class="bg-light">
    <Header :title="$t('pageMyDevices.title')" />

    <v-main>
      <v-container class="py-6">
        <!-- Navigation Tabs -->
        <v-card class="mb-6" elevation="3" rounded="lg">
          <v-tabs
            v-model="activeTab"
            grow
            color="primary"
            slider-color="primary"
          >
            <v-tab value="suggestions" class="py-4" @click="goToMySuggestions">
              <v-icon class="mr-2">mdi-lightbulb-on</v-icon>
              {{ $t('pageMyDevices.mySuggestions') }}
            </v-tab>
            <v-tab value="devices" class="py-4">
              <v-icon class="mr-2">mdi-devices</v-icon>
              {{ $t('pageMyDevices.myDevices') }}
            </v-tab>
          </v-tabs>
        </v-card>

        <!-- Device List -->
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <DeviceList />
          </v-card-text>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>



<script>
import Header from "@/components/commun/Header.vue";
import Footer from "@/components/commun/Footer.vue";
import DeviceList from "/src/components/item/DeviceList.vue";
import RectangleButton from "@/components/button/RectangleButton.vue";

// Creer le lien avec autres pages
export default {
  components: {
    RectangleButton,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-unused-components
    DeviceList,
  },
  name: 'MyDevices',
  data() {
    return {
      activeTab: 'devices', // Default active tab
    };
  },
  methods: {
    goToMySuggestions() {
      this.$router.push("/mySuggestions");
    }
  }
};
</script>

<style scoped>
.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}

.v-tab {
  transition: background-color 0.3s ease;
}

.v-tab:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

.v-tab--selected {
  font-weight: bold;
}
</style>

