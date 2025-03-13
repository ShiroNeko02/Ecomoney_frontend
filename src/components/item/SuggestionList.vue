<template>
  <v-container class="bg-light">
    <v-row>
      <v-col v-for="suggestion in suggestions" :key="suggestion.id_suggestion" cols="12" md="4">
        <v-card class="mt-4 pa-4">
          <v-row align="center">
            <v-col cols="1">
              <v-icon size="28" color="#FFC107" class="mr-3">mdi-lightbulb-on-outline</v-icon>
            </v-col>
            <v-col cols="11" class="text-justify">
              <span class="text-h8" :class="suggestion.content < 0 ? 'red--text' : 'green--text'">
                {{ suggestion.content }}
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
      /* version getSuggestionByIdUser
      const id_user = await userService.getCurrentUser().id_user;
      this.suggestions = await suggestionService.getSuggestionsByIdUser(id_user);
      */
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  },
  };
  </script>

<style scoped>
.v-row{
  background-color: white;
  color: #003a63;
  margin: -14px;
}

.v-card--variant-elevated, .v-card--variant-flat {
  background: #2596be;
  border-radius: 10px;
}

.v-container{
  padding-top : 10px;
}

.v-col-12 {
  margin-bottom: -10px;
}
</style>

<script setup lang="ts">
</script>
