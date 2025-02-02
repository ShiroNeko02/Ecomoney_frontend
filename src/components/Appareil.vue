<template>
    <v-card class="mt-4 pa-4">
      <v-row align="center">
        <v-col cols="8">
          <span class="text-subtitle-1">{{ nom }}</span>
          <p class="text-caption">{{ salle }}</p>
        </v-col>
        <v-col cols="4" class="text-right">
          <span class="text-h6 font-weight-bold" :class="montant < 0 ? 'red--text' : 'green--text'">
            {{ montant }}€
          </span>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      nom: String,
      salle: String,
      montant: Number,
    },
  };
  </script>
  
  <style scoped>
  </style>
  