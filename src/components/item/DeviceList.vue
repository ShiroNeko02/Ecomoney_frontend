<template>
  <v-container class="bg-light">
    <v-row>
      <v-col v-for="device_user in devices_user" :key="device_user.id_device_user" cols="12" md="4">
        <v-card class="mt-4 pa-4">
          <v-row align="center">
            <v-col cols="6">
              <span class="text-subtitle-1">{{ device_user.name_device_user }}</span>
              <p class="text-caption"> {{ device_user.room }} </p>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-switch
                v-model="device_user.switchValue"
                :label="device_user.switchValue ? 'Active' : 'Inactive'"
                color="primary"
                inset
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { deviceUserService } from "@/services/api.js";
import { roomService } from "@/services/api.js";

export default {
  name: "DeviceList",
  data() {
    return {
      devices_user: [], // To store the list of devices
    };
  },
  async created() {
    try {
      const response = await deviceUserService.getDevicesUsers();
      this.devices_user = response.data || response;
      //Switch
      this.devices_user.forEach(device => {
        device.switchValue = true;
      });
      // Room
      for (const device_user of this.devices_user) {
        try {
          const roomResponse = await roomService.getRoomById(device_user.room_id);
          device_user.room = roomResponse.name_room;
        } catch (error) {
          console.error("Error fetching room for device", device_user.id_device_user, error);
          device_user.room = "Unknown";
        }
      }
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  },
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
