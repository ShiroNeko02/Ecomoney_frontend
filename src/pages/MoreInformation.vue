<template>
    <v-app class="bg-light">
      <Header title="" />

      <!-- Contenu pricipal -->
      <v-main>
        <OptionButton title="Aide" />

        <OptionButton title="CGU" />

        <OptionButton title="Policy" />

        <OptionButton title="About us" />
      </v-main>

      <Footer />
    </v-app>
  </template>


  <script>
    import Header from "@/components/commun/Header.vue";
    import Footer from "@/components/commun/Footer.vue";
    import OptionButton from "@/components/button/OptionButton.vue";

    // Creer le lien avec autres pages
    export default {
        name: 'MoreInformation',
        components: {
          // eslint-disable-next-line vue/no-reserved-component-names
          Header,
          // eslint-disable-next-line vue/no-reserved-component-names
          Footer,
          OptionButton
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
  </style>
