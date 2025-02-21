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
              :items="['Telephone', 'Heater', 'Lamp', 'PC', 'Laptop', 'Washing Machine']['A1', 'A2', 'A3', 'A4', 'A5', 'A6']"
            /></div>

            <!-- Select Objective -->
            <ComboBox
              label="Objective"
              :items="['reheat', 'defrost', 'entertainment', 'laundry', 'drying']"
            />

            <!-- Champ Input -->
            <div class="cont-1"><Input label="Duration" class="custom-field" /></div>

            <!-- Bouton de soumission -->
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;"><div style="width:90%; display: flex; justify-content: center;"><Button @click="submit" class="mt-6">Submit</Button></div></div>
          </v-form>
        </v-card>
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
  methods: {
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

.form {
  background-color: #2596be!important;
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
