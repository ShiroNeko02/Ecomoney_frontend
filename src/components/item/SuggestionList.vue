<template>
  <v-container>
    <v-row>
      <v-col v-for="suggestion in suggestions" :key="suggestion.id_suggestion" cols="12" md="4">
        <v-card class="mt-4 pa-4">
          <v-row align="center">
            <v-col cols="2">
              <v-icon size="36" color="#FFC107" class="mr-3">mdi-lightbulb-on-outline</v-icon>
            </v-col>
            <v-col cols="10" class="text-right">
              <span class="text-h6 font-weight-bold" :class="suggestion.content < 0 ? 'red--text' : 'green--text'">
                {{ suggestion.content }} W
              </span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {suggestionService} from "@/services/api.js";

export default {
  name: "SuggestionList",
  data() {
    return {
      suggestions: [], // To store the list of devices
    };
  },
  async created() {
    try {
      this.suggestions = await suggestionService.getSuggestions();
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
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
<script setup lang="ts">
</script>
