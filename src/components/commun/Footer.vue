<template>
  <v-bottom-navigation  height="70" grow bg-color="white" >
  <v-btn value="home" to="/home">
    <v-icon size="30" color="#2596be">mdi-home</v-icon>
  </v-btn>

  <v-btn value="consommation" to="/detail">
    <v-icon size="30" color="#2596be">mdi-chart-bar</v-icon>
  </v-btn>

  <v-btn value="ajout" to="/addConsumption">
    <v-icon  size="30" color="#2596be">mdi-plus</v-icon>
  </v-btn>

  <v-btn value="stock" to="/suggestions">
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
</style>

