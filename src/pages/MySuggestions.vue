<template>
  <v-app class="bg-light">
    <Header title="My Suggestions" />

    <v-main>
      <v-container class="pa-4">
        <!-- Change Form -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" >Suggestions Received</RectangleButton></div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" color="grey" @click="goToMyDevice">My Devices</RectangleButton></div>
            </v-col>
          </v-row>
        </v-container>

        <SuggestionList />

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
  </style>
