<template>
    <v-btn
      class="long-button"
      :disabled="disabled"
      @click="$emit('click')"
      block
    >
      <span class="button-text">
        <slot></slot>
      </span>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "LongButton",
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  .long-button {
    background-color: white;
    color: #003a63;
    border-radius: 30px;
    font-weight: bold;
    text-transform: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    margin-top: 24px;
    height: 50px; 
    font-size: 16px;
  }
  
  .long-button:focus {
    outline: none;
  }
  
  .long-button .button-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  
  .long-button:disabled {
    background-color: #f0f0f0;
    color: #b0b0b0;
    box-shadow: none;
  }
  </style>
  