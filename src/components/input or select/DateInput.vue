<template>
  <v-text-field
    v-bind="$attrs"
    :label="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="yyyy-mm-dd"
    variant="outlined"
    dense
    class="custom-input"
    type="date"
  />
</template>

<script>
export default {
  name: "DateInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.custom-input {
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 0 16px !important;
  color: #003a63;
  height: 6vh;
  box-shadow: none;
}
</style>
