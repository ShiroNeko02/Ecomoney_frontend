<template>
  <v-app class="bg-light">
    <Header title="Details consumptions" />

    <v-main>
      <v-container>

        <!-- Select Device -->
        <v-form>
          <div style="margin-top: 20px;">
            <ComboBox
              label="Device"
              v-model="selectedDeviceName"
              :items="deviceNames"
            />
          </div>
        </v-form>

        <!-- Select Dates -->
        <v-row>
          <v-col cols="6">
            <DateInput v-model="startDate" label="Start Date"/>
          </v-col>
          <v-col cols="6">
            <DateInput v-model="endDate" label="End Date"/>
          </v-col>
        </v-row>

        <!-- Select Period -->
        <v-container>
          <v-radio-group v-model="period" inline>
            <v-radio class="mr-3" label="Per Week" value="week"></v-radio>
            <v-radio class="mr-3" label="Per Month" value="month"></v-radio>
            <v-radio class="mr-3" label="Per year" value="year"></v-radio>
          </v-radio-group>
        </v-container>


        <!-- Consumption Cards -->
        <v-container class="cont">
          <v-row>
            <v-col
              v-for="consumption in consumptions_devices_users"
              :key="consumption.label"
              cols="12"
              md="4"
            >
              <v-card class="mt-2 pa-4 bg-light elevation-20">
                <v-row align="center">
                  <v-col cols="6" class="d-flex align-center">
                    <span
                      class="ml-3 text-subtitle-1 text-black font-weight-medium"
                    >
                      {{ consumption.label }}
                    </span>
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <div>
                      <span
                        class="text-h5 font-weight-bold text-black text-center"
                      >
                        {{ consumption.total_euros }}
                      </span>
                    </div>
                    <div>
                      <span class="text-h7 text-black text-center">euro</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/commun/Header.vue";
import Footer from "@/components/commun/Footer.vue";
import Input from "@/components/input or select/Input.vue";
import DateInput from "@/components/input or select/DateInput.vue";
import Button from "@/components/button/Button.vue";
import RectangleButton from "@/components/button/RectangleButton.vue";
import ComboBox from "@/components/input or select/ComboBox.vue";
import { consumptionsDevicesUsersService, deviceUserService, operationsService,} from "@/services/api.js";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Details",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    ComboBox, RectangleButton, Header, Footer, Input, Button, DateInput
  },
  data() {
    return {
      devices_user: [],
      consumptions_devices_users: [],
      selectedDeviceName: "",
      startDate: "",
      endDate: "",
      period: "week",
    };
  },
  computed: {
    deviceNames() {
      return this.devices_user.map((device) => device.name_device_user);
    },
    selectedDevice() {
      return (
        this.devices_user.find(
          (device) => device.name_device_user === this.selectedDeviceName
        ) || null
      );
    },
  },
  async created() {
    await this.fetchDevices();
    await this.fetchConsumptions();
  },
  methods: {
    async fetchDevices() {
      try {
        const response = await deviceUserService.getDevicesUsers();
        this.devices_user = response.data || response;
      } catch (error) {
        console.error("Error fetching devices", error);
      }
    },
    async fetchConsumptions() {
      try {
        if (!this.selectedDeviceName || !this.startDate || !this.endDate) {
          const response = await consumptionsDevicesUsersService.getConsumptions();
          this.consumptions_devices_users = response.data || response;
        } else {
          const selected = this.selectedDevice;
          const response = await operationsService.filtre(selected.id_devices_users,this.period,this.startDate,this.endDate)
          this.consumptions_devices_users = response.data || response;
        }

      } catch (error) {
        console.error("Error fetching consumptions", error);
      }
    },
  },
  watch: {
    selectedDeviceName() {
      this.fetchConsumptions(); // update changes after selecting
    },
    startDate() {
      this.fetchConsumptions();
    },
    endDate() {
      this.fetchConsumptions();
    },
    period() {
      this.fetchConsumptions();
    },
  },
};
</script>

<style scoped>

.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}
.v-tabs {
  margin-top: 20px;
}
.v-input--horizontal {
  color: #003a63;
}

.v-container{
  padding : 0 16px !important;
}
</style>
