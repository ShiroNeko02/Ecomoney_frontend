<template>
  <v-bottom-navigation  height="70" grow bg-color="white" >
  <v-btn value="home" to="/home">
    <v-icon size="30" color="#2596be">mdi-home</v-icon>
  </v-btn>

  <v-btn value="consommation" to="/detailConsumption">
    <v-icon size="30" color="#2596be">mdi-chart-bar</v-icon>
  </v-btn>

  <v-btn value="ajout" to="/addConsumption">
    <v-icon  size="30" color="#2596be">mdi-plus</v-icon>
  </v-btn>

  <v-btn value="stock" to="/mySuggestions">
    <v-icon size="30" color="#2596be">mdi-database</v-icon>
  </v-btn>

  <v-btn value="utilisateur" to="/user">
    <v-icon size="30" color="#2596be">mdi-account</v-icon>
  </v-btn>

</v-bottom-navigation>
</template>

<script>
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Footer",
};
</script>

<style scoped>
  v-bottom-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
</style>

