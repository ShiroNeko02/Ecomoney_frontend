<template>
  <v-app class="bg-light">
    <Header title="Home" />

    <v-main>
      <v-container>
        <!-- Change Form -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" >By device</RectangleButton></div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" color="grey" @click="searchPeriod" >By period</RectangleButton></div>
            </v-col>
          </v-row>
        </v-container>

        <!-- Select device -->
        <div style="margin-top:20px; margin-bottom:17px;"><ComboBox
          label="Device"
          v-model="device"
          :items="['Telephone', 'Heater', 'Lamp', 'PC', 'Laptop', 'Washing Machine']"
        /></div>

      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

  <script>
  import Header from "@/components/commun/Header.vue";
  import Footer from "@/components/commun/Footer.vue";
  import Input from "@/components/input or select/Input.vue";
  import Button from "@/components/button/Button.vue";
  import RectangleButton from "@/components/button/RectangleButton.vue";
  import ComboBox from "@/components/input or select/ComboBox.vue";

  export default {
      name:"DetailDevice",
      components: {
        ComboBox,
        RectangleButton,
        // eslint-disable-next-line vue/no-reserved-component-names
        Header,
        // eslint-disable-next-line vue/no-reserved-component-names
        Footer,
        // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
        Input,
        // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
        Button
      },
      data() {
        return {

        }
      },
    methods: {
        searchPeriod() {
          this.$router.push("/detailPeriod");
        }
    }
  };
  </script>

  <style scoped>
  /* Style optionnel pour personnaliser l'apparence des onglets */
  .bg-light {
    background-color: #fff !important;
    border-radius: 15px;
  }

  .v-tabs {
    margin-top: 20px;
  }
  </style>


