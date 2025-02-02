<template>
      <v-select
        :label="label" 
        :items="items"
        variant="outlined"
        dense
        class="custom-select"
        :menu-props="{ maxHeight: '250px', maxWidth: 'auto',contentClass: 'menu' }"  
      ></v-select>
  </template>
  
  <script>
  export default {
    name: "ComboBox",
    props: {
      label: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true,
      }
    }
  };
  </script>
  
  <style>
  .custom-select {
    padding: 0 16px !important;
  }
  
  .custom-select.v-input--is-focused .v-input__control {
    border-color: #003a63 !important;
    box-shadow: 0 0 5px rgba(0, 58, 99, 0.5);
  }

  .v-card--variant-elevated {
    color: #003a63; /* changer la couleur (bordure et text) ici */
  }

  .menu .v-list-item {  
    color: #003a63 !important;         
  }

  .menu .v-list {
    background-color: white !important;       
    color: #003a63 !important;             
  }
  </style>
  