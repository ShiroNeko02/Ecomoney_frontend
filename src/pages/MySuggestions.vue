<template>
  <v-app class="bg-light">
    <Header :title="$t('pageMySuggestions.title')" />

    <v-main>
      <v-container class="py-6 pr-7 pl-7">
        <!-- Navigation Tabs -->
        <v-card class="mb-6" elevation="3" rounded="lg">
          <v-tabs
            v-model="activeTab"
            grow
            color="primary"
            slider-color="primary"
          >
            <v-tab value="suggestions" class="py-4">
              <v-icon class="mr-2">mdi-lightbulb-on</v-icon>
              {{ $t('pageMyDevices.mySuggestions') }}
            </v-tab>
            <v-tab value="devices" class="py-4" @click="goToMyDevice">
              <v-icon class="mr-2">mdi-devices</v-icon>
              {{ $t('pageMyDevices.myDevices') }}
            </v-tab>
          </v-tabs>
        </v-card>

        <!-- Main Content -->
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <SuggestionList />
        </v-card-text>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>


  <script>
    import Header from "@/components/commun/Header.vue";
    import Footer from "@/components/commun/Footer.vue";
    import RectangleButton from "@/components/button/RectangleButton.vue";
    import SuggestionList from "@/components/item/SuggestionList.vue";

    // Creer le lien avec autres pages
    export default {
      components: {
        SuggestionList,
        RectangleButton,
        // eslint-disable-next-line vue/no-reserved-component-names
        Footer,
        // eslint-disable-next-line vue/no-reserved-component-names
        Header,
        // eslint-disable-next-line vue/no-unused-components
        Suggestion: SuggestionList
      },
      name: 'MySuggestions',
      methods: {
        goToMyDevice() {
          this.$router.push("/myDevices");
        }
      }
    };
  </script>

  <style scoped>
  .fill-height {
    min-height: calc(100vh - 80px);
  }

  .bg-light {
    background-color: #fff !important;
    border-radius: 15px;
  }

  .form {
  background-color: #2596be!important;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 10px;
  margin: 30px 0;
  text-align: center;
}

  .v-container {
    padding: 16px 0;
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
