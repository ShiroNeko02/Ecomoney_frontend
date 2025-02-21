<template>
  <v-app class="bg-light">
    <Header title="Add new Device" />
    <v-main>
      <v-container>
        <!-- Change Form -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" color="grey" @click="goToActivity">Add a consumption</RectangleButton></div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" >Add a device</RectangleButton></div>
            </v-col>
          </v-row>
        </v-container>

        <!-- Form -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form>
            <div class="cont-1"><Input v-model="device.name_device" label="Device Name" required></Input></div>
            <div class="cont-1"><Input v-model="device.power_watts" label="Power Watts" type="number" required></Input></div>
            <div class="mt-9"><ComboBox v-model="device.type_device" :items="['Telephone', 'Heater', 'Lamp', 'PC', 'Laptop', 'Washing Machine']" label="Device Type" required></ComboBox></div>
            <div class="mt-9"><ComboBox v-model="device.status_list" :items="['active', 'inactive']" label="Status" required></ComboBox></div>
            <div class="cont"><Input v-model="device.avg_consumption_duration" label="Average Consumption Duration" type="number" required></Input></div>
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;"><div style="width:90%; display: flex; justify-content: center;"><Button class="pa-2" @click.prevent="submit">Submit</Button></div></div>
          </v-form>
        </v-card>
      </v-container>

      <!-- Notification -->
      <v-dialog v-model="dialog" max-width="450px">
        <v-card class="bg-light">
          <v-card-title>Result</v-card-title>
          <v-card-text>{{ responseMessage }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
import { deviceService } from "@/services/api.js";  // Import your API service

export default {
  name: "AddDevice",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Input,
    // eslint-disable-next-line vue/no-unused-components
    ComboBox,
    RectangleButton,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  data() {
    return {
      device: {
        name_device: "",
        power_watts: null,
        type_device: "",
        status_list: "active", // Default status
        avg_consumption_duration: 2, // Default consumption duration
      },
      dialog: false,
      responseMessage: "",
    };
  },
  methods: {
    goToActivity() {
      this.$router.push("/addConsumption");
    },

    async submit() {
      const deviceData = {
        name_device: this.device.name_device,
        power_watts: parseInt(this.device.power_watts),
        type_device: this.device.type_device,
        status_list: this.device.status_list,
        avg_consumption_duration: this.device.avg_consumption_duration,
      };

      try {
        await deviceService.createDevice(deviceData);

        // Success
        this.responseMessage = "Device successfully added!";
        this.dialog = true;

        this.device = {
          name_device: "",
          power_watts: null,
          type_device: "",
          status_list: "active",
          avg_consumption_duration: 2,
        };

      } catch (error) {
        console.error("Error adding device:", error);

        // Failed
        this.responseMessage = error.response?.data?.error || "Failed to add device.";
        this.dialog = true;
      }
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
  text-justify: auto;
  text-align: center;
}

.form-card {
  background-color: #f9f9f9 !important;
  border: 1px solid #000 !important;
  border-radius: 10px;
  padding: 20px;
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

.mt-9 {
  margin-top: 36px !important;
  margin-bottom: -36px !important;
}

.cont{
  margin: 45px 0;
}

.v-row[data-v-8c47e836]{
  margin: -20px -25px;
}

</style>
