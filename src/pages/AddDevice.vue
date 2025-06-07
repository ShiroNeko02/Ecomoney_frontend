<template>
  <v-app class="bg-light">
    <Header :title="$t('pageAddDevice.headerTitle')" />
    <v-main>
      <v-container>
        <!-- Top buttons -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2">
                <RectangleButton class="mt-4" color="grey" @click="goToActivity">
                  {{ $t('pageAddDevice.addConsumption') }}
                </RectangleButton>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2">
                <RectangleButton class="mt-4">
                  {{ $t('pageAddDevice.addDevice') }}
                </RectangleButton>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <!-- Device form -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form @submit.prevent="submit">
            <div class="cont-1">
              <Input
                v-model="device_user.name_device_user"
                :label="$t('pageAddDevice.deviceName')"
                required
              />
            </div>
            <div class="cont-2">
              <ComboBox
                v-model="device_user.device_ref"
                :items="deviceRefNames"
                :label="$t('pageAddDevice.deviceModel')"
              />
              <div class="text-caption caption1">* {{$t('pageAddDevice.deviceModelCaption')}}</div>
            </div>
            <div class="cont-1">
              <Input
                v-model="device_user.power_watts_user"
                :label="$t('pageAddDevice.powerWatts')"
                type="number"
              />
              <div class="text-caption caption2">* {{$t('pageAddDevice.powerWattsCaption')}}</div>
            </div>
            <div class="cont">
              <Input
                v-model="device_user.avg_consumption_hours_per_week"
                :label="$t('pageAddDevice.avgConsumptionDuration')"
                type="number"
                required
              />
              <div class="text-caption caption2">* {{$t('pageAddDevice.durationCaption')}}</div>
            </div>
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;">
              <div style="width:90%; display: flex; justify-content: center;">
                <Button class="pa-2" :disabled="isSubmitting" @click="submit">
                  {{ $t('pageAddDevice.submit') }}
                </Button>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-container>

      <!-- Dialog -->
      <v-dialog v-model="dialog" max-width="450px">
        <v-card class="bg-light">
          <v-card-title :class="{ 'error-title': isError, 'success-title': !isError }">
            {{ isError ? $t('pageAddDevice.errorTitle') : $t('pageAddDevice.successTitle') }}
          </v-card-title>
          <v-card-text class="text-black">{{ responseMessage }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">
              {{ $t('pageAddDevice.ok') }}
            </v-btn>
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
import { deviceService, deviceUserService, userService } from "@/services/api.js";  // Import your API service

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
      device_user: {
        name_device_user: "",
        power_watts_user: "",
        device_ref_id: "",
        avg_consumption_hours_per_week_ref: 2, // Default consumption duration
        user_id: ""
      },
      list_devices_user :[],
      list_devices_ref :[],
      dialog: false,
      isError: false,
      isSubmitting: false,
      responseMessage: "",
    };
  },
  computed: {
    deviceRefNames() {
      return this.list_devices_ref.map(device => device.name_device_ref);
    },
  },
  async created() {
    try {
      const response = await deviceService.getDevices();
      this.list_devices_ref = response.data || response;
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  },
  methods: {
    goToActivity() {
      this.$router.push("/addConsumption");
    },

    getDeviceRefId(deviceName) {
      const device = this.list_devices_ref.find(d => d.name_device_ref === deviceName);
      return device ? device.id_device_ref : null;
    },

    async submit() {
      if (
        !this.device_user.name_device_user ||
        !this.device_user.avg_consumption_hours_per_week
      ) {
        this.responseMessage = this.$t('pageAddDevice.fillAllFields');
        this.dialog = true;
        this.isError = true;
        this.isSubmitting = false;
        return;
      }

      if (this.isSubmitting) return;
      this.isSubmitting = true;

      const current_id_user = await userService.getCurrentUserId();

      const deviceData = {
        name_device_user: this.device_user.name_device_user,
        power_watts_user: parseInt(this.device_user.power_watts_user),
        device_ref_id: this.getDeviceRefId(this.device_user.device_ref),
        avg_consumption_hours_per_week: parseInt(this.device_user.avg_consumption_hours_per_week),
        user_id: current_id_user,
      };

      try {
        await deviceUserService.createDeviceUser(deviceData);
        this.responseMessage = this.$t('pageAddDevice.deviceAddedSuccess');
        this.dialog = true;
        this.isError = false;

        this.device_user = {
          name_device_user: "",
          power_watts_user: null,
          device_ref_id: "",
          avg_consumption_hours_per_week: 2,
          user_id: "",
        };
      } catch (error) {
        console.error("Error adding device:", error);
        this.responseMessage =
          error.response?.data?.error || this.$t('pageAddDevice.failedAddDevice');
        this.dialog = true;
        this.isError = true;
      } finally {
        this.isSubmitting = false;
      }
    }
  },
};
</script>

<style scoped>
*{
  color : black;
}
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
  color: #000 !important;
}


.cont-1{
  padding-top: 15px;
  margin-bottom: -12px;
}

.cont-2 {
  margin-bottom: -20px !important;
  margin-top: 40px;
}

.cont{
  margin: 45px 0;
}

.v-row[data-v-8c47e836][data-v-8c47e836] {
  margin: -25px;
  margin-top: -38px;
  margin-bottom: 0px;
}

.v-input--horizontal {
  color : #003a63;
  margin-bottom: 20px;
}

.v-form{
  padding: 10px 0;
}

.error-title {
  color: red;
}

.success-title {
  color: forestgreen;
}

.text-caption {
  color: rgba(0, 0, 0, 0.6);
  margin-left: 16px;
}

.caption1{
  margin-top: -40px;
  margin-bottom: 20px;
}

.caption2{
  margin-top: -20px;
  margin-bottom: -25px;
}
</style>
