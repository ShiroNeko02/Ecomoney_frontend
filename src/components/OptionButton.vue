<template>
    <v-card
      class="mt-8 option-button"
      @click="handleClick"
      v-bind="props" 
    >
      <v-card-subtitle class="text-center">{{ title }}</v-card-subtitle>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'OptionButton',
    props: {
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      // Ajoute ici d'autres props si nécessaire, par exemple pour personnaliser les liens
      to: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick() {
        // Si une route est fournie dans "to", alors on effectue une navigation
        if (this.to) {
          this.$router.push(this.to);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .option-button {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    background-color: #2596be;
    border-radius: 15px;
    padding: 20px;
    margin: 10px 25px;
  }
  
  .option-button .v-card-subtitle {
    font-size: 1.15rem;
    color : #fff;
    font-weight : bold;
  }
  
  </style>
  