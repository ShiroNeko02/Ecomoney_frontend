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
              :items="deviceNames"
            /></div>

            <!-- Select Objective -->
            <ComboBox
              label="Objective"
              v-model="objective"
              :items="filteredObjectives"
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
              Loading...
            </v-card-text>
            <v-card-text v-else>
              {{ responseMessage }}
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="green" @click="stock">Stock</v-btn>
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
import {deviceService, deviceUserService, suggestionService, userService} from "@/services/api.js";

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
      devices_user: [],
      dialog: false,
      responseMessage: "",
      loading: false,
      device: "",
      deviceDetails: "",
      objective: "",
      duration: "",
      typeDevice :"",
      suggestionData:{
        content : "",
        user_id:""
      },
      objectiveOptions: {
        "Work" : ["work", "printing", "browsing", "coding", "design", "document editing", "photo editing", "email", "research", "video conferencing"] ,
        "Security": ["surveillance", "recording", "motion detection", "alarm triggering", "remote access"],
        "Household maintenance": ["clean dishes", "sanitize", "vacuum", "deep clean", "carpet cleaning", "mow lawn", "edge trimming", "mulching"],
        "Entertainment": ["communication", "browsing", "streaming", "entertainment", "gaming", "music", "video playback", "social media", "online learning"],
        "Cooking": ["cook rice", "blend smoothies", "boil water", "reheat food", "preserve food", "toast bread", "brew coffee", "freeze items", "bake dishes", "heat on plates", "deep fry", "slow cook", "defrost"],
        "Comfort" : ["cooling", "heating", "water heating", "illumination"],
        "Clothes" : ["laundry", "drying", "ironing", "steaming"],
        "default": ["cooking", "cleaning", "entertainment", "laundry", "drying"]
      },
    };
  },
  watch: {
    async device(newDeviceName) {
      const deviceUser = this.devices_user.find(d => d.name_device_user === newDeviceName);
      if (deviceUser) {
        try {
          const deviceDetailsResponse = await deviceService.getDeviceById(deviceUser.device_ref_id);
          this.deviceDetails = deviceDetailsResponse.data || deviceDetailsResponse;
        } catch (error) {
          console.error("Error loading device details", error);
          this.deviceDetails = {}; // fallback
        }
      } else {
        this.deviceDetails = {}; // reset if device not found
      }
    }
  },
  computed: {
    deviceNames() {
      return this.devices_user.map(device => device.name_device_user);
    },
    filteredObjectives() {
      const category = this.deviceDetails?.type_device || 'default';
      return this.objectiveOptions[category] || this.objectiveOptions["default"];
    }
  },
  async created() {
    try {
      const response = await deviceUserService.getDevicesUsers();
      this.devices_user = response.data || response;
    } catch (error) {
      console.error("Error fetching devices", error);
    }
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

      const deviceUser = this.devices_user.find(d => d.name_device_user === this.device);
      const deviceDetailsResponse = await deviceService.getDeviceById(deviceUser.device_ref_id);
      this.deviceDetails = deviceDetailsResponse.data || deviceDetailsResponse;

      // Générer dynamiquement la requête
      const prompt = `Act as an expert in energy efficiency.
Give me only one specific, clever, and practical tip to reduce the energy consumption of a ${this.deviceDetails.name_device_ref} while I use it to ${this.objective} for ${this.duration} minutes.
Your answer should NOT be generic or obvious or too long (no more than 80 words). Instead, give me a less-known but effective trick I can really use, ideally tailored to this kind of device or use-case.
You may suggest a smart workaround or setting adjustment, as long as it achieves the same goal and keeps the activity enjoyable.
Do NOT ban or limit the activity — just help me do it in a smarter, more efficient way.`;

      this.dialog = true;
      this.loading = true;
      this.responseMessage = "Loading...";

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "mistralai/mistral-small-24b-instruct-2501:free",
            "messages": [{ "role": "user", "content": prompt }],
            "temperature": 0.5,
            "max_tokens": 100
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
    async stock(){
      const current_user = await userService.getCurrentUser();
      const current_id_user = current_user.id_user;
      const suggestionData = {
        content : this.responseMessage,
        id_user : current_id_user,
      }
      try {
        console.log(suggestionData);
        await suggestionService.createSuggestion(suggestionData);
        this.dialog = false;
        this.responseMessage = "";
        this.suggestionData ={
          content : "",
          id_user:""
        }
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
