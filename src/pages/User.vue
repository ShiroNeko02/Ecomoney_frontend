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

      <OptionButton title="Change my password" @click="goToChangePassword" />

      <OptionButton title="Change my informations"  />

      <OptionButton title="Delete my account" @click="confirmDeleteAccount" />

      <OptionButton title="Log Out" @click="signOut" />

      <!-- Notification delete -->
      <v-dialog v-model="dialog" max-width="450px">
        <v-card class="bg-light">
          <v-card-title style="color:red;">Alert</v-card-title>
          <v-card-text style="color: black;">Are you sure you want to delete your account? The data will not be recoverable</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="green">No</v-btn>
            <v-btn color="red" >Yes</v-btn>
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

    // Creer le lien avec autres pages
    export default {
        name: 'User',
        components: {
          // eslint-disable-next-line vue/no-reserved-component-names
          Header, Footer, OptionButton
        },
        data() {
          return {
            dialog: false,
            user: {
              email: "",
              password: ""
            }
          };
        },
        mounted() {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            this.user = JSON.parse(savedUser);
          }
        },
        methods: {
          async signOut() {
            try {
              await userService.signOut();
              localStorage.removeItem("user");
              this.$router.push("/signIn");
            } catch (error) {
              console.error("Error during sign out:", error);
            }
          },
          goToChangePassword() {
            this.$router.push("/changePassword");
          },
          confirmDeleteAccount() {
            this.dialog = true;
          },
          async deleteAccount() {
            try {
              await userService.delete();
              localStorage.removeItem("user");
              this.$router.push("/signIn");
            } catch (error) {
              console.error("Error during sign out:", error);
            }
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
