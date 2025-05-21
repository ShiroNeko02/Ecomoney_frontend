<template>
  <v-app class="bg-light">
    <Header title="User's space" />

    <v-main>
      <v-container class="mt-12 d-flex justify-center align-center">
        <v-row align="center" justify="center">
          <v-col cols="auto" class="text-center">
            <div class="circle-icon"><v-icon size="50" color="white">mdi-account</v-icon></div>
            <span class="text-h6 d-block mt-2">{{user.first_name}}</span>
          </v-col>
        </v-row>
      </v-container>
      <OptionButton title="Set Budget Goal" @click="goToConsumptionGoal" />
      <OptionButton title="Change my password" @click="goToChangePassword" />
      <OptionButton title="Change my informations" @click="goToChangeInformation" />
      <OptionButton title="Delete my account" @click="confirmDeleteAccount" />
      <OptionButton title="Log Out" @click="signOut" />

      <!-- Notification delete -->
      <v-dialog v-model="dialog" max-width="450px">
        <v-card class="bg-light">
          <v-card-title style="color:red;">Alert</v-card-title>
          <v-card-text style="color: black;">Are you sure you want to delete your account? The data will not be recoverable</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="green" @click="dialog = false">No</v-btn>
            <v-btn color="red" @click="deleteAccount">Yes</v-btn>
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
    import OptionButton from "@/components/button/OptionButton.vue";
    import '@mdi/font/css/materialdesignicons.css';
    import {userService} from "@/services/api.js";
    import { eventBus } from '@/utils/EventBusManager.js';


    // Creer le lien avec autres pages
    export default {
      name: 'User',
      components: {
        Header,
        Footer,
        OptionButton
      },
      data() {
        return {
          dialog: false,
          user: {
            first_name: "",
            last_name: "",
            email: ""
          }
        };
      },
      mounted() {
        eventBus.on('user-updated', this.updateUserData);
        this.loadUserData();
      },
      beforeUnmount() {
        eventBus.off('user-updated', this.updateUserData);
      },
      methods: {
        async loadUserData() {
          try {
            const userData = await userService.getCurrentUser();
            console.log('Données utilisateur chargées:', userData);
            this.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
          } catch (error) {
            console.error('Erreur chargement données utilisateur:', error);
          }
        },
        async updateUserData(data) {
          console.log('Mise à jour des données utilisateur:', data);
          await this.loadUserData();
        },

        async signOut() {
          try {
            await userService.signOut();
          } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
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
          }
      }
    };
</script>

  <style scoped>
  .fill-height {
    min-height: calc(100vh - 80px);
  }

  .bg-light {
    background-color: #fff !important;
    border-radius: 15px;
  }

  .circle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #003a63;
  margin: 0 auto;
    }

  span {
  font-size: 16px;
  font-weight: bold;
  color: #003a63;
  }

  </style>
