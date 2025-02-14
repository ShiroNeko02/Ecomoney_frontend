<template>
  <v-app class="bg-light">
    <Header title="Add Consumption" />

    <v-main>
      <v-container>
        <v-card class="mt-5 pa-4 form elevation-4">
          <div class="text-center text-white">Add a consumption</div>
        </v-card>

        <!-- Formulaire -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form @submit.prevent="submit">
            <!-- Select Device -->
            <div style="margin-top:20px; margin-bottom:17px;">
              <ComboBox
                label="Device"
                :items="['Telephone', 'Heater', 'Lamp', 'PC', 'Laptop', 'Washing Machine']"
                v-model="device"
              />
            </div>

            <!-- Select Objective -->
            <ComboBox
              label="Objective"
              :items="['reheat', 'defrost', 'entertainment', 'laundry', 'drying']"
              v-model="objective"
            />

            <!-- Champ Input Duration -->
            <div class="cont-1">
              <Input label="Duration" class="custom-field" v-model="duration" />
            </div>

            <!-- Bouton de soumission -->
            <div class="cont">
              <Button type="submit" class="mt-12">Submit</Button>
            </div>
          </v-form>
        </v-card>

        <!-- ALERT BOX -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="bg-light">
            <v-card-title class="headline" >Suggestion</v-card-title>
            <v-card-text v-if="loading">
              <v-progress-circular indeterminate color="blue"></v-progress-circular>
              Generating response...
            </v-card-text>
            <v-card-text v-else>
              {{ responseMessage }}
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="green" @click="stockSuggestion">Stock</v-btn>
              <v-btn color="red" @click="dialog = false">Don't Stock</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import axios from "axios";
import Header from "@/components/commun/Header.vue";
import Footer from "@/components/commun/Footer.vue";
import Input from "@/components/input or select/Input.vue";
import ComboBox from "@/components/input or select/ComboBox.vue";

export default {
  components: {
    ComboBox,
    Header,
    Footer,
    Input
  },
  data() {
    return {
      dialog: false, // Variable pour afficher/masquer l'alert box
      responseMessage: "",
      loading: false, // Variable pour indiquer si la requête est en cours
      device: "",
      objective: "",
      duration: ""
    };
  },
  methods: {
    async submit(event) {
      event.preventDefault();

      // Vérifier que tous les champs sont remplis
      if (!this.device || !this.objective || !this.duration) {
        this.responseMessage = "Please fill all fields!";
        this.dialog = true;
        return;
      }

      // Générer dynamiquement la requête
      const prompt = `Give me only one short advice (but still enough detailed, efficient, feasible, and realistic) to save energy consumption if I use a ${this.device} in order to ${this.objective} for ${this.duration}. You can also propose other way to do but it must remain my objective and my pleasure (do not ban or reduce)`;

      this.dialog = true;  // Afficher immédiatement la boîte de dialogue
      this.loading = true; // Activer le chargement
      this.responseMessage = "Loading..."; //  Afficher un message d'attente

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "mistralai/mistral-small-24b-instruct-2501:free",
            "messages": [{ "role": "user", "content": prompt }]
          })
        });

        const data = await response.json();
        this.responseMessage = data.choices?.[0]?.message?.content || "No response received";
      } catch (error) {
        this.responseMessage = ` Error: ${error}`;
      } finally {
        this.loading = false; //  Désactiver le chargement une fois la réponse reçue
      }
    },
    async stockSuggestion() {
      console.log(" Suggestion stockée:", this.responseMessage);
      this.dialog = false;
    }
  },
  name: "AddConsumption"
};
</script>


<style scoped>
.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}

.form {
  background-color: #2596be !important;
  font-weight: bold;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.form-card {
  background-color: #f9f9f9 !important;
  border: 1px solid #000 !important;
  border-radius: 10px;
  padding: 20px;
}

.cont-1 {
  padding: 0 16px;
  padding-top: 15px;
}

.cont {
  padding: 0 16px;
  padding-bottom: 20px;
}

.v-card--variant-elevated {
  color: #003a63;
}
</style>
