<template>
  <v-app class="bg-light">
    <Header title="Details" />

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
            <v-radio class="mr-3" label="Per Week" value="week" />
            <v-radio class="mr-3" label="Per Month" value="month" />
            <v-radio class="mr-3" label="Per Year" value="year" />
          </v-radio-group>
        </v-container>

        <!-- Consumption Cards -->
        <v-container>
          <v-row v-if="paginatedConsumptions.length > 0">
            <v-col
              v-for="consumption in paginatedConsumptions"
              :key="consumption.id_consumption_devices_users"
              cols="12"
              md="6"
            >
              <v-card class="mt-2 pa-4 box">
                <v-row align="center">
                  <v-col cols="8" class="text-left">
                    <div>
                      <span class="ml-3 text-subtitle-1 font-weight-medium">
                        {{ getDeviceNameById(consumption.device_user_id) }}
                      </span>
                    </div>
                    <div>
                      <span class="text-h7 font-bold ml-3">
                        {{ consumption.start_date }}
                      </span>
                    </div>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <div>
                      <span class="text-h5 font-weight-bold text-center mr-2">
                        {{ consumption.hours_consumption_users }}
                      </span>
                    </div>
                    <div>
                      <span class="text-h7 text-center mr-2">hour(s)</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12">
              <p class="text-center text-grey">No information</p>
            </v-col>
          </v-row>

          <!-- Pagination -->
          <v-row justify="center" class="mt-4" v-if="totalPages > 1">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
              color="primary"
            />
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
import ComboBox from "@/components/input or select/ComboBox.vue";
import DateInput from "@/components/input or select/DateInput.vue";
import {
  consumptionsDevicesUsersService,
  deviceUserService,
} from "@/services/api.js";

export default {
  name: "DetailDevice",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Header, Footer, ComboBox, DateInput,},
  data() {
    return {
      devices_user: [],
      selectedDeviceName: "All",
      allConsumptions: [],
      currentPage: 1,
      itemsPerPage: 4,
      startDate: null,
      endDate: null,
      period: "week",
    };
  },
  computed: {
    deviceNames() {
      const names = this.devices_user.map((device) => device.name_device_user);
      return ["All", ...names];
    },
    selectedDevice() {
      return this.devices_user.find(
        (device) => device.name_device_user === this.selectedDeviceName
      ) || null;
    },
    filteredConsumptions() {
      let filtered = this.allConsumptions;

      // Filter device
      if (this.selectedDeviceName !== "All") {
        const selectedDevice = this.devices_user.find(
          (device) => device.name_device_user === this.selectedDeviceName
        );
        if (selectedDevice) {
          filtered = filtered.filter(
            (c) => c.device_user_id === selectedDevice.id_device_user
          );
        }
      }

      // Filter dates
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        filtered = filtered.filter((c) => {
          const date = new Date(c.start_date);
          return date >= start && date <= end;
        });
      }
      // Order consumption (recent -> old)
      return filtered.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    },

    paginatedConsumptions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredConsumptions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredConsumptions.length / this.itemsPerPage);
    },
  },
  watch: {
    selectedDeviceName() {
      this.currentPage = 1;
    },
  },
  methods: {
    getDeviceNameById(deviceId) {
      const device = this.devices_user.find((d) => d.id_device_user === deviceId);
      return device ? device.name_device_user : "Unknown device";
    },
    async fetchDevices() {
      try {
        const response = await deviceUserService.getDevicesUsers();
        this.devices_user = response.data || response;
      } catch (error) {
        console.error("Erreur lors du chargement des appareils :", error);
      }
    },
    async fetchConsumptions() {
      try {
        const response = await consumptionsDevicesUsersService.getConsumptions();
        this.allConsumptions = response.data || response;
      } catch (error) {
        console.error("Erreur lors du chargement des consommations :", error);
      }
    },
  },
  async created() {
    await this.fetchDevices();
    await this.fetchConsumptions();
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

.v-input.v-input--horizontal.v-input--center-affix.v-input--density-default.v-theme--dark.v-locale--is-ltr.v-radio-group{
  margin-bottom : -32px;
  margin-top: -20px;
}

.box {
  border: 1px solid #2596be;
  border-radius: 10px;
  background-color: #f0f8ff;
  color: #003a6a;
}

.box span {
  color: #003a6a;
}
</style>
