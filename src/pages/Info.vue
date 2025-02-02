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
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import OptionButton from"@/components/OptionButton.vue";

    // Creer le lien avec autres pages 
    export default {
        name: 'Info'
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
  