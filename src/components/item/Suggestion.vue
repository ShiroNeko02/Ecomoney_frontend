<template>
    <v-card class="mt-4 pa-3 d-flex align-center conseil-item" outlined>
      <!-- Icône d'ampoule -->
      <v-icon size="36" color="#FFC107" class="mr-3">mdi-lightbulb-on-outline</v-icon>
      
      <!-- Texte du conseil -->
      <div class="text-content text-black">
        <span class="text-body-1 font-weight-medium">{{ text }}</span>
      </div>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "ConseilItem",
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .conseil-item {
    max-width: 100%;
    background-color: #caf0f8;
    border-radius: 12px;
    transition: box-shadow 0.3s ease;
    padding: 20px;
    margin: 10px 15px;
  }
  
  .text-content {
    word-wrap: break-word;  
    white-space: normal;     
    overflow-wrap: break-word; 
    max-width: 85%; 
  }
  </style>
  