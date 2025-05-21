<template>
  <v-app class="bg-light">
    <Header title="Choose New Password" />

    <v-main>
      <v-container>
        <!-- Form -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form ref="form" v-model="isFormValid">
            <div class="cont-1">
              <Input
                v-model="new_password"
                label="New Password"
                class="custom-field"
                type="password"
                :rules="passwordRules"
                :hint="passwordHint"
                persistent-hint
              />
            </div>
            <div class="cont-1">
              <Input
                v-model="confirm_new_password"
                label="Confirm New Password"
                class="custom-field"
                type="password"
                :rules="[
                  v => !!v || 'Password confirmation is required',
                  v => v === new_password || 'Passwords do not match'
                ]"
              />
            </div>

            <!-- Button Submit -->
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;">
              <div style="width:90%; display: flex; justify-content: center;">
                <Button
                  @click="submit"
                  class="mt-6"
                  :disabled="!isFormValid || loading"
                >Submit</Button>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-container>

      <!-- ALERT BOX -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline">{{dialogTitle}}</v-card-title>
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
  name: "ChooseNewPassword",
  components: {
    Button,
    Footer,
    Header,
    Input
  },
  data() {
    return {
      current_user: null,
      access_token: "",
      new_password: "",
      confirm_new_password: "",
      dialog: false,
      dialogTitle: "",
      loading: false,
      responseMessage: "",
      isFormValid: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
        v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        v => /\d/.test(v) || 'Password must contain at least one number'
      ],
      passwordHint: 'Password must be at least 6 characters, contain one uppercase letter and one number'
    };
  },
  mounted() {
    const userData = localStorage.getItem('savedUser');
    if (userData) {
      this.current_user = JSON.parse(userData);
    }
    this.access_token = new URLSearchParams(window.location.hash.slice(1)).get('access_token');
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      if (!this.new_password || !this.confirm_new_password) {
        this.showNotification("Error", "All fields are required.");
        return;
      }

      if (this.new_password !== this.confirm_new_password) {
        this.showNotification("Error", "New passwords do not match.");
        return;
      }

      this.loading = true;
      try {
        const response = await userService.chooseNewPassword(
          this.new_password,
          this.access_token
        );

        this.showNotification("Success", response.message || "Password successfully changed.");
        this.resetForm();
        this.$router.push("/signIn");
      } catch (error) {
        let errorMessage = "An error occurred.";
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
        this.showNotification("Error", errorMessage);
      } finally {
        this.loading = false;
      }
    },

    showNotification(title, message) {
      this.dialogTitle = title;
      this.responseMessage = message;
      this.dialog = true;
    },

    resetForm() {
      this.new_password = "";
      this.confirm_new_password = "";
      this.$refs.form.resetValidation();
    }
  }
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
  color: #000 !important;
  font-weight: bold;
}

.custom-field .v-input__control {
  border: 1px solid #000 !important;
  border-radius: 8px;
}

.custom-field .v-select__selections,
.custom-field input {
  color: #000 !important;
}

.v-card--variant-elevated {
  color: #003a63;
}

.cont-1 {
  padding-top: 15px;
}

.cont {
  padding-bottom: 20px;
}
</style>
