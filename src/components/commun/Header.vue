<template>
  <v-app-bar color="white" elevation="2">
    <!-- Logo -->
    <v-img src="@/assets/logo.png" max-height="40" max-width="40" contain class="ml-4"></v-img>

    <!-- Titre -->
    <v-spacer></v-spacer>
    <v-app-bar-title class="text-center">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-icon class="mr-4 text-primary" size="33">mdi-information-outline</v-icon>

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

.v-spacer {
  flex-grow: 0 !important;
  flex-shrink: 0;
  flex-basis: 2px;
}

.v-toolbar__content > .v-toolbar-title {
  margin-inline-start: 0px;
}
</style>
