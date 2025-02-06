<template>
    <v-text-field
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :type="type"
      variant="outlined"
      dense
      class="custom-input"
      :rules="rules"
    />
  </template>

  <script>
  export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    name: "Input",
    props: {
      modelValue: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "text",
      },
      rules: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>

  <style scoped>
  .custom-input {
    border-radius: 10px;
    margin-bottom: 20px;
    color: #003a63;
    height: 6vh;
    box-shadow: none;
  }
  </style>
