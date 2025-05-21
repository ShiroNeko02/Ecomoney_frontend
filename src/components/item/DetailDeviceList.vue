<template>
  <v-container class="bg-light">
    <v-row>
      <v-col v-for="consumption in consumptions_devices_users"
             :key="consumption.id_consumption_devices_users"
             cols="12"
             md="4"
      >
        <!-- Budget -->
        <v-card class="mt-6 pa-4 bg-light elevation-20">
          <v-row align="center">
            <v-col cols="6" class="d-flex align-center">
              <span class="ml-3 text-subtitle-1 text-black font-weight-medium">{{ selectedDevice?.name_device_user }}</span>
            </v-col>

            <v-col cols="6" class="text-right">
              <div>
                <span class="text-h5 font-weight-bold text-black text-center">{{ consumption.hours_consumption_users }}</span>
              </div>
              <div>
                <span class="text-h7 text-black text-center">hour(s)</span>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { consumptionsDevicesUsersService } from "@/services/api.js";

export default {
  name: "DetailDeviceList",
  data() {
    return {
      consumptions_devices_users: [],
    };
  },
  async created() {
    try {
      const response = await consumptionsDevicesUsersService.getConsumptions();
      this.consumptions_devices_users = response.data || response;
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  },
  props: {
    selectedDevice: {
      type: Object,
      default: null,
    },
  },
  watch: {
    selectedDevice: {
      immediate: true,
      handler: 'fetchConsumptions', // Trigger the method when the device changes
    },
  },
  methods: {
    async fetchConsumptions() {
      try {
        if (!this.selectedDevice) {
          const response = await consumptionsDevicesUsersService.getConsumptions();
          this.consumptions_devices_users = response.data;
        } else {
          const response = await consumptionsDevicesUsersService.getConsumptionById(this.selectedDevice.id_devices_users);
          this.consumptions_devices_users = response.data;
        }
      } catch (error) {
        console.error("Error fetching consumptions", error);
      }
    },
  }
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

.v-input--horizontal {
  grid-template-areas: none;
}
</style>
