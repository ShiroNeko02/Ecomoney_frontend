<template>
    <v-app class="bg-light">
        <Header title="Home" />

        <v-main>
        </v-main>

        <Footer />
    </v-app>
</template>

  <script>
  import Header from "@/components/commun/Header.vue";
  import Footer from "@/components/commun/Footer.vue";
  import Input from "@/components/input or select/Input.vue";
  import Button from "@/components/button/Button.vue";

  export default {
      name:"Detail",
      components: {
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
          tab: 'Par appareil',
        items: [
          'Par appareil', 'Par type d energie',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        };
    },
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


