<template>
  <v-app class="bg-light">
    <Header title="Change Password" />

    <v-main>
      <v-container>
        <!-- Form -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form>
            <div class="cont-1"><Input v-model="current_password" label="Current Password" class="custom-field" /></div>
            <div class="cont-1"><Input v-model="new_password" label="New Password" class="custom-field" /></div>
            <div class="cont-1"><Input v-model="confirm_new_password" label="Confirm New Password " class="custom-field" /></div>

            <!-- Button Submit -->
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;"><div style="width:90%; display: flex; justify-content: center;"><Button @click="submit" class="mt-6">Submit</Button></div></div>
          </v-form>
        </v-card>
      </v-container>

      <!-- ALERT BOX -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline" >{{dialogTitle}}</v-card-title>
          <v-card-text v-if="loading">
            <v-progress-circular indeterminate color="blue"></v-progress-circular>
            Loading...
          </v-card-text>
          <v-card-text v-else>
            {{ responseMessage }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="dialog = false">OK</v-btn>
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
import Button from "@/components/button/Button.vue";
import { userService } from "@/services/api.js";

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Input
  },
  data() {
    return {
      current_user: null,
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      dialog: false,
      dialogTitle: "",
      responseMessage: ""
    };
  },
  mounted() {
    const userData = localStorage.getItem('savedUser');
    if (userData) {
      this.current_user = JSON.parse(userData);
    }
  },
  methods: {
    async submit() {
      if (!this.current_password || !this.new_password || !this.confirm_new_password) {
        this.showNotification("Error", "All fields are required.");
        return;
      }

      if (this.new_password !== this.confirm_new_password) {
        this.showNotification("Error", "New passwords do not match.");
        return;
      }

      if (this.current_password !== this.current_user.password) {
        this.showNotification("Error", "Wrong passwords");
        return;
      }

      try {
        await userService.signIn({ email: this.current_user.email, password: this.current_user.password });
        const response = await userService.updateUser({
          email: this.current_user.email,
          password: this.new_password,
          data:{
            first_name : this.current_user.first_name,
            last_name : this.current_user.last_name,
          }
        });

        this.showNotification("Success", response.message || "Password changed successfully.");

        this.current_password = "";
        this.new_password = "";
        this.confirm_new_password = "";
      } catch (error) {
        this.showNotification("Error", error.response?.data?.message || "An error occurred.");
      }
    },

    showNotification(title, message) {
      this.dialogTitle = title;
      this.responseMessage = message;
      this.dialog = true;
    }
  },
  name: "ChangePassword",
};
</script>

<style scoped>
.bg-light {
  background-color: #fff !important;
  border-radius: 15px;
}

.form {
  background-color: #2596be!important;
  font-weight: bold;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.form-card {
  background-color: #f9f9f9 !important;
  border: 1px solid #000 !important;
  border-radius: 10px;
  padding: 20px;
}

.v-select .v-label {
  color: #000 !important; /* Label noir */
  font-weight: bold;
}

.custom-field .v-input__control {
  border: 1px solid #000 !important; /* Bordure noire */
  border-radius: 8px;
}

.custom-field .v-select__selections,
.custom-field input {
  color: #000 !important; /* Texte noir */
}

.v-card--variant-elevated {
  color: #003a63; /* changer la couleur (bordure et text) ici */
}

.cont-1{
  padding-top: 15px;
}

.cont{
  padding-bottom : 20px;
}

</style>
