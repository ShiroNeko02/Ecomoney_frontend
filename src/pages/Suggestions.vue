<template>
    <v-app class="bg-light">
      <Header title="Conseils" />

      <!-- Contenu pricipal -->
      <v-main>
        <v-container class="pa-4">
          <v-card class="mt-2 pa-4 form elevation-4">
            <div class="text-center text-white">Conseils reçus</div>
          </v-card>

          <ConseilItem text="dnsaujfdsjfbedfseufbnejfnbej"  />

          <ConseilItem text="dnsaujfdsjfbedfseufbnejfnbejnsdigvnsrdjgvnsdrjgvnrsdignvrsujgnsrjgndrujngrujNGUJrngujrngujsengs"  />
        </v-container>
      </v-main>

      <Footer />
    </v-app>
  </template>


  <script>
    import Header from "@/components/commun/Header.vue";
    import Footer from "@/components/commun/Footer.vue";
    import Suggestion from "/src/components/item/Suggestion.vue";

    // Creer le lien avec autres pages
    export default {
      components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Footer,
        // eslint-disable-next-line vue/no-reserved-component-names
        Header,
        // eslint-disable-next-line vue/no-unused-components
        Suggestion
      },
      name: 'Suggestions'
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
  </style>
