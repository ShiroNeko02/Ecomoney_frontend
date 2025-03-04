<template>
  <v-container>
    <v-row>
      <v-col v-for="device in devices" :key="device.id_device" cols="12" md="4">
        <v-card class="mt-4 pa-4">
          <v-row align="center">
            <v-col cols="8">
              <span class="text-subtitle-1">{{ device.name_device_ref }}</span>
              <p class="text-caption"> room </p>
            </v-col>
            <v-col cols="4" class="text-right">
              <span class="text-h6 font-weight-bold" :class="device.power_watts_ref < 0 ? 'red--text' : 'green--text'">
                {{ device.power_watts_ref }} W
              </span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { deviceService } from "@/services/api.js";  // Import your API service

export default {
  name: "DeviceList",
  data() {
    return {
      devices: [], // To store the list of devices
    };
  },
  async created() {
    try {
      this.devices = await deviceService.getDevices();
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  },
};
</script>

<style scoped>

</style>
