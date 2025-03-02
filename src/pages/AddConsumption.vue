<template>
  <v-app class="bg-light">
    <Header title="Add New Consumption" />

    <v-main>
      <v-container>
        <!-- Change Form -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" >Add a consumption</RectangleButton></div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" color="grey" @click="goToDevice" >Add a device</RectangleButton></div>
            </v-col>
          </v-row>
        </v-container>

        <!-- Formulaire -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form>
            <!-- Select Device -->
            <div style="margin-top:20px; margin-bottom:17px;"><ComboBox
              label="Device"
              v-model="device"
              :items="['Telephone', 'Heater', 'Lamp', 'PC', 'Laptop', 'Washing Machine']"
            /></div>

            <!-- Select Objective -->
            <ComboBox
              label="Objective"
              v-model="objective"
              :items="['reheat', 'defrost', 'entertainment', 'laundry', 'drying']"
            />

            <!-- Champ Input -->
            <div class="cont-1"><Input label="Duration (minutes)" v-model="duration" class="custom-field" /></div>

            <!-- Bouton de soumission -->
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;"><div style="width:90%; display: flex; justify-content: center;"><Button @click="submit" class="mt-6">Submit</Button></div></div>
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
              <v-btn color="green" @click="create">Stock</v-btn>
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
import Header from "@/components/commun/Header.vue";
import Footer from "@/components/commun/Footer.vue";
import Input from "@/components/input or select/Input.vue";
import ComboBox from "@/components/input or select/ComboBox.vue";
import RectangleButton from "@/components/button/RectangleButton.vue";
import Button from "@/components/button/Button.vue";
import {suggestionService} from "@/services/api.js";

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    RectangleButton,
    ComboBox,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Input
  },
  data() {
    return {
      dialog: false, // Variable pour afficher/masquer l'alert box
      responseMessage: "",
      loading: false, // Variable pour indiquer si la requête est en cours
      device: "",
      objective: "",
      duration: "",
      suggestionData:{
        condition : "",
        message_type : null,
        creation_date : "",
        content : "",
      },
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
      const prompt = `Give me only one short advice (but still enough detailed, efficient, feasible, and realistic) to save energy consumption if I use a ${this.device} in order to ${this.objective} for ${this.duration} minutes. You can also propose other way to do but it must remain my objective and my pleasure (do not ban or reduce)`;

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
    async create(){
      // erreur structure data ?
      const suggestionData = {
        condition : `${this.device} ${this.objective} ${this.duration}`,
        message_type : null,
        creation_date : new Date(),
        content : this.responseMessage,
      }
      try {
        console.log(suggestionData);
        await suggestionService.createSuggestion(suggestionData);

        // Success
        this.responseMessage = "Suggestion successfully stocked!";
        this.dialog = true;

        this.suggestion = {
          condition : `${this.device} ${this.objective} ${this.duration}`,
          message_type : null,
          creation_date : new Date(),
          content : this.responseMessage,
        };

      } catch (error) {
        console.error("Error adding device:", error);

        // Failed
        this.responseMessage = error.response?.data?.error || "Failed to add device.";
        this.dialog = true;
      }
    },
    goToDevice() {
      this.$router.push("/addDevice");
    },
  },
  name: "AddConsumption",
};
</script>

<style scoped>
.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}


.form-card {
  background-color: #f9f9f9 !important;
  border: 1px solid #000 !important;
  border-radius: 10px;
  padding: 20px;
}

 .v-select .v-label {
  color: #000 !important; /* Label noir */
  font-weight: bold;
}

.custom-field .v-input__control {
  border: 1px solid #000 !important; /* Bordure noire */
  border-radius: 8px;
}

.custom-field .v-select__selections,
.custom-field input {
  color: #000 !important; /* Texte noir */
}

.v-card--variant-elevated {
  color: #003a63; /* changer la couleur (bordure et text) ici */
}

.cont-1{
  padding-top: 15px;
}

.cont{
  padding-bottom : 20px;
}

</style>
