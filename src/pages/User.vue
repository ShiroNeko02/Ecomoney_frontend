<template>
  <v-app class="bg-app">
    <Header :title="$t('pageUser.header')" />

    <v-main>
      <v-container class="mt-5 d-flex justify-center">
        <v-card class="user-card" elevation="6">
          <v-card-text class="text-center">
            <div class="profile-icon">
              <v-icon size="48" color="white">mdi-account-circle</v-icon>
            </div>
            <h3 class="user-name">{{ user.first_name }} {{ user.last_name }}</h3>
            <p class="user-email">{{ user.email }}</p>
            <v-chip class="mt-2" color="primary" text-color="white" size="small">
              {{ $t('pageUser.activeAccount') }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-container>

      <v-container class="card">
        <h3 class="user-name mt-4 mb-4">{{ $t('pageUser.settingsTitle') }}</h3>
        <v-row dense>
          <v-col cols="11" v-for="(item, index) in settings" :key="index">
            <v-card elevation="3" :class="['setting-button']" :color="item.bg" @click="item.action">
              <v-card-text class="d-flex align-center ml-3 mt-1">
                <div class="icon-box d-flex align-center justify-center">
                  <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
                </div>
                <span class="ml-3 font-weight-medium">{{ item.label }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="dialog" max-width="450px" class="bg-light">
        <v-card class="bg-light">
          <v-card-title class="text-red font-weight-bold">⚠️ {{ $t('pageUser.alertTitle') }}</v-card-title>
          <v-card-text>
            {{ $t('pageUser.alertBody') }} <br />
            <strong>{{ $t('pageUser.alertIrreversible') }}</strong>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="grey" @click="dialog = false">{{ $t('pageUser.cancel') }}</v-btn>
            <v-btn color="red" @click="deleteAccount">{{ $t('pageUser.confirmDelete') }}</v-btn>
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
import { userService } from "@/services/api.js";
import { eventBus } from "@/utils/EventBusManager.js";

export default {
  name: "User",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header, Footer,
  },
  data() {
    return {
      dialog: false,
      user: {
        first_name: "",
        last_name: "",
        email: "",
      },
    };
  },
  computed: {
    settings() {
      return [
        {
          label: this.$t("pageUser.setBudgetGoal"),
          icon: "mdi-cash",
          iconColor: "green",
          bg: "#dcfce7",
          action: () => this.goToConsumptionGoal(),
        },
        {
          label: this.$t("pageUser.changePassword"),
          icon: "mdi-lock",
          iconColor: "blue",
          bg: "#e0f2fe",
          action: () => this.goToChangePassword(),
        },
        {
          label: this.$t("pageUser.editInfo"),
          icon: "mdi-account-edit",
          iconColor: "indigo",
          bg: "#e5e9ff",
          action: () => this.goToChangeInformation(),
        },
        {
          label: this.$t("pageUser.deleteAccount"),
          icon: "mdi-delete",
          iconColor: "red",
          bg: "#feecec",
          action: () => this.confirmDeleteAccount(),
        },
        {
          label: this.$t("pageUser.logout"),
          icon: "mdi-logout",
          iconColor: "grey",
          bg: "#f3f4f6",
          action: () => this.signOut(),
        },
      ];
    },
  },
  mounted() {
    eventBus.on("user-updated", this.updateUserData);
    this.loadUserData();
  },
  beforeUnmount() {
    eventBus.off("user-updated", this.updateUserData);
  },
  methods: {
    async loadUserData() {
      try {
        const userData = await userService.getCurrentUser();
        this.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    },
    async updateUserData() {
      await this.loadUserData();
    },
    async signOut() {
      try {
        await userService.signOut();
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.$router.push("/signIn");
      }
    },
    goToChangePassword() {
      this.$router.push("/changePassword");
    },
    confirmDeleteAccount() {
      this.dialog = true;
    },
    goToChangeInformation() {
      this.$router.push("/changeInformation");
    },
    goToConsumptionGoal() {
      this.$router.push("/consumptionGoal");
    },
    async deleteAccount() {
      try {
        await userService.deleteUser();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.$router.push("/signIn");
      } catch (error) {
        console.error("Error during account deletion:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.$router.push("/signIn");
        }
      }
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
*{
  color: black;
}

.bg-app {
  background-color: white;
  width: 100%;
  height: 100%;
}


.user-card {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  padding: 5px;
  background: ghostwhite;
  margin-bottom: 32px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}

.profile-icon {
  background: linear-gradient(125deg, #003a6a,#2596be);
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  margin-top: -50px;
}

.user-name {
  margin-top: 12px;
  font-weight: 600;
  font-size: 20px;
}

.user-email {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 8px;
}

.settings-container {
  max-width: 420px;
  margin: 0 auto;
}

.settings-title {
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
  text-align: center;
  font-size: 18px;
}

.setting-button {
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  min-height: 75px;
  align-items: center;
  text-align: center;
}

.setting-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.profile-icon[data-v-8976b1c1] {
  margin-top : 0;
}

.v-container{
  padding : 0;
  margin-bottom: -22px;
}

.v-card-text {
  font-size : 1.1rem;
}

.card{
  margin: 10px 15px;
}

v-col{
  width : 80%;
}

.v-row--dense > .v-col, .v-row--dense > [class*=v-col-] {
  padding: 4px;
  margin-bottom: 5px;
}

.icon-box {
  background-color: white;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
