<template>
  <v-select
    :model-value="modelValue"
    :items="languages"
    item-title="label"
    item-value="code"
    dense
    hide-details
    variant="outlined"
    class="language-select"
    @update:modelValue="onChange"
  />
</template>

<script>
export default {
  name: "LocaleSelect",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      languages: [
        { code: "en", label: "EN English" },
        { code: "fr", label: "FR Français" },
      ],
    };
  },
  methods: {
    onChange(newValue) {
      this.$emit("update:modelValue", newValue);
      this.$emit("change", newValue);
    },
  },
};
</script>

<style scoped>
.language-select {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 95px;
  font-size: 13px;
  z-index: 20;
}
</style>
