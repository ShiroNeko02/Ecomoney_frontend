<template>
  <v-bottom-navigation  height="70" grow bg-color="white" >
  <v-btn value="home" to="/home">
    <v-icon size="30" color="#2596be">mdi-home</v-icon>
  </v-btn>

  <v-btn value="consommation" to="/detail">
    <v-icon size="30" color="#2596be">mdi-chart-bar</v-icon>
  </v-btn>

  <v-btn value="ajout" to="/ajoutCon">
    <v-icon  size="30" color="#2596be">mdi-plus</v-icon>
  </v-btn>
  
  <v-btn value="stock" to="/conseil">
    <v-icon size="30" color="#2596be">mdi-database</v-icon>
  </v-btn>

  <v-btn value="utilisateur" to="/utilisateur">
    <v-icon size="30" color="#2596be">mdi-account</v-icon>
  </v-btn>

</v-bottom-navigation>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
</style>

