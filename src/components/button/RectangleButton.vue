<template>
  <v-btn
    :disabled="disabled"
    :color="color"
    block
    class="custom-button"
    @click="clickHandler"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "RectangleButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.custom-button {
  background: #2596be;
  color: white !important;
  font-weight: bold;
  text-transform: none;
  box-shadow: none;
}
</style>
