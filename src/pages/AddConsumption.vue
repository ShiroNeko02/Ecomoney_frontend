<template>
  <v-app class="bg-light">
    <Header :title="locale === 'fr' ? 'Ajout Consommation' : 'Add New Consumption'" />

    <v-main>
      <v-container>
          <!-- Navigation Tabs -->
          <v-card class="mb-6 mr-4 ml-4" elevation="3" rounded="lg">
            <v-tabs
              v-model="activeTab"
              grow
              color="primary"
              slider-color="primary"
            >
              <v-tab value="suggestions" class="py-4">
                <v-icon class="mr-2">mdi-lightbulb-on</v-icon>
                {{ $t('pageAddDevice.addConsumption') }}
              </v-tab>
              <v-tab value="devices" class="py-4" @click="goToDevice">
                <v-icon class="mr-2">mdi-devices</v-icon>
                {{ $t('pageAddDevice.addDevice') }}
              </v-tab>
            </v-tabs>
          </v-card>

        <!-- Formulaire -->
        <v-card class="mt-8 pa-4 pr-4 pl-4 form-card elevation-4">
          <v-form>
            <!-- Select Device -->
            <div style="margin-top:20px; margin-bottom:17px;">
              <ComboBox
                :label="locale === 'fr' ? 'Appareil' : 'Device'"
                v-model="device"
                :items="deviceNames"
              />
            </div>

            <!-- Select Objective -->
            <ComboBox
              :label="locale === 'fr' ? 'Objectif' : 'Objective'"
              v-model="objective"
              :items="filteredObjectives"
            />

            <!-- Champ Input -->
            <div class="cont-1">
              <Input :label="locale === 'fr' ? 'Durée (minutes)' : 'Duration (minutes)'" v-model="duration" class="custom-field" />
            </div>

            <!-- Bouton de soumission -->
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;">
              <div style="width:90%; display: flex; justify-content: center;">
                <Button @click="submit" class="mt-6">{{ locale === 'fr' ? 'Soumettre' : 'Submit' }}</Button>
              </div>
            </div>
          </v-form>
        </v-card>

        <!-- ALERT BOX -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="bg-light">
            <v-card-title class="headline text-center" :class="{ 'error-title': errorDialogMode }">
              {{ errorDialogMode ? (locale === 'fr' ? 'Erreur' : 'Error') : (locale === 'fr' ? 'Suggestion' : 'Suggestion') }}
            </v-card-title>

            <v-card-text v-if="loading">
              <v-progress-circular indeterminate color="blue"></v-progress-circular>
              {{ locale === 'fr' ? 'Chargement...' : 'Loading...' }}
            </v-card-text>

            <v-card-text v-else>
              {{ responseMessage }}
            </v-card-text>

            <v-card-actions class="justify-center">
              <template v-if="errorDialogMode">
                <v-btn color="primary" @click="dialog = false">OK</v-btn>
              </template>
              <template v-else>
                <v-btn color="green" @click="stock">{{ locale === 'fr' ? 'Stocker' : 'Stock' }}</v-btn>
                <v-btn color="red" @click="dialog = false">{{ locale === 'fr' ? "Ne pas stocker" : "Don't Stock" }}</v-btn>
              </template>
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
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Button, RectangleButton, ComboBox, Footer, Header, Input
  },
  data() {
    return {
      activeTab: 'suggestions', // ou 'devices' selon l’onglet par défaut souhaité
      locale: this.$i18n.locale,
      devices_user: [],
      dialog: false,
      errorDialogMode: false,
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
      selectedAction: null,
      objectiveOptions: {
        Work: {
          en: ["work", "printing", "browsing", "coding", "design", "document editing", "photo editing", "email", "research", "video conferencing"],
          fr: ["travailler", "imprimer", "naviguer", "coder", "concevoir", "édition de documents", "retouche photo", "email", "recherche", "visioconférence"]
        },
        Security: {
          en: ["surveillance", "recording", "motion detection", "alarm triggering", "remote access"],
          fr: ["surveillance", "enregistrement", "détection de mouvement", "déclenchement d'alarme", "accès à distance"]
        },
        "Household maintenance": {
          en: ["clean dishes", "sanitize", "vacuum", "deep clean", "carpet cleaning", "mow lawn", "edge trimming", "mulching"],
          fr: ["laver la vaisselle", "désinfecter", "passer l’aspirateur", "nettoyage en profondeur", "nettoyage des tapis", "tondre la pelouse", "tailler les bords", "paillage"]
        },
        Entertainment: {
          en: ["communication", "browsing", "streaming", "entertainment", "gaming", "music", "video playback", "social media", "online learning"],
          fr: ["communication", "navigation", "streaming", "divertissement", "jeu", "musique", "lecture vidéo", "réseaux sociaux", "apprentissage en ligne"]
        },
        Cooking: {
          en: ["cook rice", "blend smoothies", "boil water", "reheat food", "preserve food", "toast bread", "brew coffee", "freeze items", "bake dishes", "heat on plates", "deep fry", "slow cook", "defrost"],
          fr: ["cuire du riz", "mixer des smoothies", "faire bouillir de l'eau", "réchauffer des aliments", "conserver les aliments", "griller du pain", "préparer du café", "congeler", "cuire au four", "chauffer dans des assiettes", "frire", "cuisson lente", "décongeler"]
        },
        Comfort: {
          en: ["cooling", "heating", "water heating", "illumination"],
          fr: ["refroidissement", "chauffage", "chauffe-eau", "éclairage"]
        },
        Clothes: {
          en: ["laundry", "drying", "ironing", "steaming"],
          fr: ["lessive", "séchage", "repassage", "vapeur"]
        },
        default: {
          en: ["cooking", "cleaning", "entertainment", "laundry", "drying"],
          fr: ["cuisiner", "nettoyer", "divertissement", "lessive", "séchage"]
        }
      }
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
      const options = this.objectiveOptions[category] || this.objectiveOptions.default;
      return options[this.locale] || options.en;
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
    goToDevice() {
      this.$router.push("/addDevice");
    },

    getEnglishObjective(frenchObjective) {
      for (const category in this.objectiveOptions) {
        const index = this.objectiveOptions[category].fr.indexOf(frenchObjective);
        if (index !== -1) {
          return this.objectiveOptions[category].en[index];
        }
      }
      return frenchObjective;
    },
    async submit(event) {
      event.preventDefault();

      if (!this.device || !this.objective || !this.duration) {
        this.responseMessage = this.locale === 'fr' ? "Veuillez remplir tous les champs !" : "Please fill all fields!";
        this.errorDialogMode = true;
        this.dialog = true;
        return;
      }

      const deviceUser = this.devices_user.find(d => d.name_device_user === this.device);
      const deviceDetailsResponse = await deviceService.getDeviceById(deviceUser.device_ref_id);
      this.deviceDetails = deviceDetailsResponse.data || deviceDetailsResponse;

      const prompt = `Act as an expert in energy efficiency.
Give me only one specific, clever, and practical tip to reduce the energy consumption of a ${this.deviceDetails.name_device_ref} while I use it to ${this.objective} for ${this.duration} minutes.
Your answer should NOT be generic or obvious or too long (no more than 80 words). Instead, give me a less-known but effective trick I can really use, ideally tailored to this kind of device or use-case.
You may suggest a smart workaround or setting adjustment, as long as it achieves the same goal and keeps the activity enjoyable.
Do NOT ban or limit the activity — just help me do it in a smarter, more efficient way.`;

      this.dialog = true;
      this.loading = true;
      this.responseMessage = this.locale === 'fr' ? "Chargement..." : "Loading...";

      try {
        // 1. Appel pour générer la réponse en anglais
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
        const answerEn = data.choices?.[0]?.message?.content || "No response received";

        // 2. Si la locale est fr, retraduire en français
        if (this.locale === 'fr') {
          // Préparer prompt traduction
          const translatePrompt = `Translate direct this text into French (A pragraph, not each phase):\n\n${answerEn}`;

          const translateResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer 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",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "mistralai/mistral-small-24b-instruct-2501:free",
              "messages": [{ "role": "user", "content": translatePrompt }],
              "temperature": 0.3,
              "max_tokens": 150
            })
          });

          const translateData = await translateResponse.json();
          this.responseMessage = translateData.choices?.[0]?.message?.content || answerEn;
        } else {
          this.responseMessage = answerEn;
        }

        this.errorDialogMode = false;
      } catch (error) {
        this.responseMessage = this.locale === 'fr' ? `Erreur : ${error.message || error}` : `Error: ${error.message || error}`;
        this.errorDialogMode = true;
      } finally {
        this.loading = false;
      }
    },
    async stock(){
      const current_id_user = await userService.getCurrentUserId();
      const suggestionData = {
        content : this.responseMessage,
        user_id : current_id_user,
      }
      try {
        await suggestionService.createSuggestion(suggestionData);
        this.dialog = false;
        this.responseMessage = "";
        this.errorDialogMode = false;
        this.suggestionData = {
          content: "",
          id_user: ""
        };
        this.suggestionData ={
          content : "",
          user_id:""
        }
      } catch (error) {
        this.responseMessage = error.response?.data?.error ;
        this.dialog = true;
        this.errorDialogMode = true;
        }
    },
    goToDevice() {
      this.$router.push("/addDevice");
    },
    selectAction(action) {
      this.selectedAction = action;
      if (action != 'consumption') this.goToDevice();
    },
  },
  name: "AddConsumption",
};
</script>

<style scoped>
*{
  color : black;
}

.bg-light {
  background-color: #fff !important;
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
  color: #000 !important;
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

.custom-toggle {
  display: flex;
  margin: 0px -16px;
}

.toggle-btn {
  flex: 1;
  padding: 5px;
  transition: all 0.2s ease;
  border-radius: 0px;
  height: 2.8rem;
  text-transform : none !important;
}

.error-title {
  color: red !important;
}

.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}

.v-tab {
  transition: background-color 0.3s ease;
}

.v-tab:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

.v-tab--selected {
  font-weight: bold;
}

</style>
