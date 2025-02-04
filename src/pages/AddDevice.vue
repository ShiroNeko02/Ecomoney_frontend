<template>
  <v-app class="bg-light">
    <Header title="Add Device" />
    <v-main>
      <v-container>
        <v-card class="mt-5 pa-4 form elevation-4">
          <div class="text-center text-white">Add a New Device</div>
        </v-card>

        <!-- Form -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form>
            <v-text-field v-model="device.name_device" label="Device Name" required></v-text-field>
            <v-text-field v-model="device.power_watts" label="Power Watts" type="number" required></v-text-field>
            <v-select v-model="device.type_device" :items="['A1', 'A2', 'A3', 'A4', 'A5', 'A6']" label="Device Type" required></v-select>
            <v-select v-model="device.status_list" :items="['active', 'inactive']" label="Status" required></v-select>
            <v-text-field v-model="device.avg_consumption_duration" label="Average Consumption Duration" type="number" required></v-text-field>
            <v-btn @click.prevent="submit">Submit</v-btn>
          </v-form>
        </v-card>
      </v-container>

      <!-- Change Form -->
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="cont-2"><Button class="mt-6" color="grey"  @click="goToActivity">Activity</Button></div>
          </v-col>
          <v-col cols="6">
            <div class="cont-2"><Button class="mt-6" >Device</Button></div>
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
import { deviceService } from "@/services/api.js";  // Import your API service

export default {
  name: "AddDevice",
  components: {
    Header,
    Footer,
    Input,
    ComboBox,
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
    };
  },
  methods: {
    goToActivity() {
      this.$router.push("/ajoutCon"); // TODO MODIFIER LA ROUTE
    },

    async submit() {
      // Form data to send
      const deviceData = {
        name_device: this.device.name_device,
        power_watts: parseInt(this.device.power_watts),
        type_device: this.device.type_device,
        status_list: this.device.status_list,
        avg_consumption_duration: this.device.avg_consumption_duration,
      };

      try {
        const response = await deviceService.createDevice(deviceData);
        console.log("Device added:", response);
        this.$router.push("/home");  // TODO (update route?) Redirect after successful submission
      } catch (error) {
        console.error("Error adding device", error);
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
  padding: 20px 16px 0;
}

.cont{
  padding: 0 16px 20px;
}

</style>
