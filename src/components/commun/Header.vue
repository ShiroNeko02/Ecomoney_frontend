<template>
  <v-app-bar color="white" elevation="2">
    <!-- Logo -->
    <v-img src="@/assets/logo.png" max-height="36" max-width="36" contain class="ml-4"></v-img>

    <!-- Titre -->
    <v-spacer></v-spacer>
    <v-app-bar-title class="text-center">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-icon class="mr-4 text-primary">mdi-bell</v-icon>

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

v-spacer {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 8px;
}
</style>
