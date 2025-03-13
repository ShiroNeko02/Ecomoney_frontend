<template>
  <v-app class="bg-light">
    <Header title="Detail by device" />

    <v-main>
      <v-container>
        <!-- Change Form -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" >By device</RectangleButton></div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" color="grey" @click="searchPeriod" >By period</RectangleButton></div>
            </v-col>
          </v-row>
        </v-container>

        <v-form>
          <!-- Select Device -->
          <div style="margin-top:20px;"><ComboBox
            label="Device"
            v-model="device"
            :items="deviceNames"
          /></div>

          <!-- Bouton de soumission -->
          <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;"><div style="width:90%; display: flex; justify-content: center;"><Button @click="submit" class="mt-6">Submit</Button></div></div>
        </v-form>

      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/commun/Header.vue";
  import Footer from "@/components/commun/Footer.vue";
  import Input from "@/components/input or select/Input.vue";
  import Button from "@/components/button/Button.vue";
  import RectangleButton from "@/components/button/RectangleButton.vue";
  import ComboBox from "@/components/input or select/ComboBox.vue";
import {deviceUserService} from "@/services/api.js";

export default {
  name:"DetailDevice",
  components: {
    ComboBox,
    RectangleButton,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Input,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Button
  },
  data() {
    return {
      devices_user: [],
    }
  },
  computed: {
    deviceNames() {
      return this.devices_user.map(device => device.name_device_user);
    },
  },
  async created() {
    try {
      const response = await deviceUserService.getDevicesUsers();
      this.devices_user = response.data || response;
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  },
  methods: {
    searchPeriod() {
      this.$router.push("/detailPeriod");
    }
  }
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
  color : #003a63;
}

data-v-8d484fae{
  margin-top: -37px;
}
</style>


