<template>
  <v-app class="bg-light">
    <Header :title="$t('pageDetailConsumption.title')" />

    <v-main>
      <v-container>
        <!-- Select Device -->
        <v-form>
          <div style="margin-top: 20px;">
            <ComboBox
              :label="$t('pageDetailConsumption.deviceLabel')"
              v-model="selectedDeviceName"
              :items="deviceNames"
            />
          </div>
        </v-form>

        <!-- Select Dates -->
        <v-row dense>
          <v-col cols="6">
            <DateInput v-model="startDate" :label="$t('pageDetailConsumption.startDate')" />
          </v-col>
          <v-col cols="6">
            <DateInput v-model="endDate" :label="$t('pageDetailConsumption.endDate')" />
          </v-col>
        </v-row>

        <!-- Select Period -->
        <v-radio-group v-model="period">
          <div class="row">
            <v-radio :label="$t('pageDetailConsumption.perUseLabel')" value="use" />
            <v-radio :label="$t('pageDetailConsumption.perWeekLabel')" value="week" />
          </div>
          <div class="row">
          <v-radio :label="$t('pageDetailConsumption.perMonthLabel')" value="month" />
          <v-radio :label="$t('pageDetailConsumption.perYearLabel')" value="year" />
          </div>
        </v-radio-group>

        <!-- Consumption Cards -->
        <v-container class="card">
          <v-row v-if="paginatedConsumptions.length > 0">
            <v-col
              v-for="consumption in paginatedConsumptions"
              :key="consumption.start_date"
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
                        {{ formatPeriod(consumption.start_date) }}
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
                      <span class="text-h7 text-center mr-2">{{ $t('pageDetailConsumption.hours') }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12">
              <p class="text-center text-grey">{{ $t('pageDetailConsumption.noInfo') }}</p>
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
  components: { Header, Footer, ComboBox, DateInput },
  data() {
    return {
      devices_user: [],
      selectedDeviceName: "All",
      allConsumptions: [],
      currentPage: 1,
      itemsPerPage: 4,
      startDate: null,
      endDate: null,
      period: "use", // par défaut Per Use
    };
  },
  computed: {
    deviceNames() {
      const names = this.devices_user.map((device) => device.name_device_user);
      return ["All", ...names];
    },
    selectedDevice() {
      return (
        this.devices_user.find(
          (device) => device.name_device_user === this.selectedDeviceName
        ) || null
      );
    },
    filteredConsumptions() {
      let filtered = this.allConsumptions;

      // Filter by device
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

      // Filter by date range
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        filtered = filtered.filter((c) => {
          const date = new Date(c.start_date);
          return date >= start && date <= end;
        });
      }

      // Group by period
      return this.groupByPeriod(filtered, this.period);
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
    period() {
      this.currentPage = 1;
    },
    startDate() {
      this.currentPage = 1;
    },
    endDate() {
      this.currentPage = 1;
    },
  },
  methods: {
    getDeviceNameById(deviceId) {
      if (this.selectedDeviceName === "All") {
        return this.$i18n.locale === "fr" ? "Tout" : "All";
      }
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
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      return weekNo;
    },
    groupByPeriod(data, type) {
      if (type === "use") {
        // Pas de regroupement, on renvoie les données brutes
        return data;
      }

      const grouped = {};

      data.forEach((entry) => {
        const date = new Date(entry.start_date);
        let key;

        if (type === "week") {
          const week = this.getWeekNumber(date);
          key = `${date.getFullYear()}-W${week}`;
        } else if (type === "month") {
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        } else if (type === "year") {
          key = `${date.getFullYear()}`;
        }

        if (!grouped[key]) {
          grouped[key] = {
            ...entry,
            groupKey: key,
            totalHours: 0,
          };
        }

        grouped[key].totalHours += entry.hours_consumption_users;
      });

      return Object.values(grouped).map((item) => ({
        ...item,
        hours_consumption_users: Math.round(item.totalHours * 10) / 10, // Arrondi à 1 chiffre après la virgule
        start_date: item.groupKey,
      }));
    },
    formatPeriod(key) {
      if (this.period === "use") {
        const date = new Date(key);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      if (this.period === "week") {
        return `${this.$t('pageDetailConsumption.weekLabel')} ${key.split("-W")[1]} - ${key.split("-W")[0]}`;
      }
      if (this.period === "month") {
        const [year, month] = key.split("-");
        const monthNamesFr = [
          "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        const monthNamesEn = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const locale = this.$i18n.locale;
        const monthName = locale === 'fr' ? monthNamesFr[Number(month) - 1] : monthNamesEn[Number(month) - 1];
        return `${monthName} ${year}`;
      }
      return key; // pour l'année (affiche juste l'année)
    }
  },
  async created() {
    await this.fetchDevices();
    await this.fetchConsumptions();
  },
};
</script>





<style scoped>
*{
  color : #003a6a;
}

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

.period{
  padding : 0 16px;
  margin-bottom: -20px !important;
}

.card{
  margin-bottom: -10px;
  margin-top: -25px;
}

.row {
  display: flex;
  gap: 16px;
  margin-bottom: 2px;
  margin-top: -4px;
  margin-left: 8px;
}
</style>
