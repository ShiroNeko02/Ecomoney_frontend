<template>
  <v-app class="bg-light">
    <Header title="Ajout" />

    <v-main>
      <v-container>
        <v-card class="mt-5 pa-4 form elevation-4">
          <div class="text-center text-white">Ajout d'un appareil</div>
        </v-card>

        <!-- Formulaire -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form>
            <!-- Champ Input -->
            <div class="cont-1"><Input label="Nom d'appareil" class="custom-field" /></div>

            <!-- Select type d'appareil -->
            <div style="padding-top: 17px; padding-bottom:0;"><ComboBox
              label="Type d'appareil"
              :items="['A1', 'A2', 'A3', 'A4', 'A5', 'A6']"
            /></div>

            <!-- Select Salle -->
            <div style="padding-top:8px; padding-bottom:0;"><ComboBox
              label="Salle d'installation"
              :items="['S1', 'S2', 'S3', 'S4', 'S5', 'S6']"
            /></div>

            <!-- Champ Input -->
            <div class="cont-1" style="padding-top: 10px;"><Input label="Puissance" class="custom-field" /></div>

            <!-- Bouton de soumission -->
            <div class="cont"><Button @click="submit" class="mt-12">Soumettre</Button></div>
          </v-form>
        </v-card>
      </v-container>

      <!----- Changer formulaire ------>
      <v-container>
          <v-row>
          <v-col cols="6">
              <div class="cont-2"><Button class="mt-6" color="grey"  @click="goToActivite">Activite</Button></div>
          </v-col>
          <v-col cols="6">
              <div class="cont-2"><Button class="mt-6" >Appareil</Button></div>
          </v-col>
          </v-row>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Input from "@/components/Input.vue";
import ComboBox from "@/components/ComboBox.vue";

export default {
  name: "AjoutAp",
  components: {
    Header,
    Footer,
    Input,
    ComboBox
  },
  methods: {
        goToActivite() {
            this.$router.push("/ajoutCon");
          }
        },
};
</script>

<style scoped>
.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}

.form {
  background-color: #2596be!important;
  font-weight: bold;
  border-radius: 10px;
  padding: 20px;
  text-justify: center;
  text-align: center;
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
  padding: 0 16px;
  padding-top: 20px;
  }

.cont{
  padding: 0 16px;
  padding-bottom : 20px;
}

</style>
