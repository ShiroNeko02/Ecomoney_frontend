<template>
  <v-app-bar color="white" elevation="2">
    <!-- Icône du menu -->
    <v-app-bar-nav-icon size="40" color="#2596be" @click="goToInfo"></v-app-bar-nav-icon>

    <!-- Titre -->
    <v-spacer></v-spacer>
    <v-app-bar-title class="text-center">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <!-- Logo -->
    <v-img src="@/assets/logo.png" max-height="30" max-width="30" contain class="mr-4"></v-img>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToInfo() {
      // Si l'utilisateur est déjà sur la page Info, on revient à la page précédente
      if (this.$route.path === '/info') {
        this.$router.back(); // Retour à la page précédente
      } else {
        this.$router.push("/info"); // Si on n'est pas sur la page Info, on y va
      }
    },
  },  
};
</script>

<style scoped>
.v-app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-app-bar-title {
  font-weight: bold;
  color: #2596be;
  flex-grow: 1;
}

.v-spacer {
  flex-grow: 0; 
  flex-shrink: 0; 
  flex-basis: 8px; 
}
</style>
