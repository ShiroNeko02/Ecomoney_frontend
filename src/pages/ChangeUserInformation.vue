<template>
  <v-app class="bg-light">
    <Header title="Change Information" />

    <v-main>
      <v-container>
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form ref="form" v-model="isFormValid">
            <Input
              v-model="userData.first_name"
              label="First Name"
              class="custom-field"
              :rules="formRules.name"
            />

            <Input
              v-model="userData.last_name"
              label="Last Name"
              class="custom-field"
              :rules="formRules.name"
            />

            <!--
            <Input
              v-model="userData.email"
              label="Email"
              class="custom-field"
              type="email"
              :rules="formRules.email"
            />
            -->

            <div class="d-flex justify-center width-100 mt-6">
              <Button @click="submit" :disabled="!isFormValid || loading">
                <v-progress-circular v-if="loading" indeterminate color="white" size="20"/>
                <span v-else style="color:white;">Update Information</span>
              </Button>
            </div>
          </v-form>
        </v-card>
      </v-container>

      <!-- Notification -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline text-h5 text-center pa-4">
            {{ dialogTitle }}
          </v-card-title>
          <v-card-text class=" pa-6 pr-2" style="min-height: 50px;">
            {{ responseMessage }}
          </v-card-text>
          <v-card-actions class="justify-center pa-4">
            <v-btn color="primary" @click="handleDialogClose">OK</v-btn>
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
import { eventBus } from '@/utils/EventBusManager.js';

export default {
  name: "ChangeInformation",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header, Footer, Input, Button
  },
  data() {
    return {
      userData: {
        first_name: "",
        last_name: "",
        email: ""
      },
      isFormValid: false,
      dialog: false,
      dialogTitle: "",
      responseMessage: "",
      loading: false,
      formRules: {
        name: [
          v => !!v || 'Name is required',
          v => /^[a-zA-ZÀ-ÿ\s'-]{2,30}$/.test(v) || 'Invalid name format'
        ],
        email: [
          v => !!v || 'Email is required',
          v => /.+@.+\..+/.test(v) || 'Invalid email format'
        ]
      }
    };
  },
  async mounted() {
    await this.loadUserData();
  },
  methods: {
    async loadUserData() {
      try {
        const user = await userService.getCurrentUser();
        this.userData = {
          first_name: user.first_name || '',
          last_name: user.last_name || ''
        };
      } catch (error) {
        console.error("Error loading user data:", error);
        this.showNotification("Error", "Unable to load your information");
      }
    },

    async submit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      try {
        const updated = await userService.updateUser(this.userData);

        if (updated) {
          // Met à jour localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = { ...currentUser, ...this.userData };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          // Envoie un signal global
          eventBus.emit('user-updated', this.userData);

          this.showNotification("Success", "Your information has been updated successfully");
        }
      } catch (error) {
        console.error("Error updating information:", error);
        let message = "An error occurred.";
        if (error.response?.status === 401) {
          this.$router.push('/signIn');
          return;
        } else if (error.response?.data?.message) {
          message = error.response.data.message;
        }
        this.showNotification("Error", message);
      } finally {
        this.loading = false;
      }
    },

    showNotification(title, message) {
      this.dialogTitle = title;
      this.responseMessage = message;
      this.dialog = true;
    },

    handleDialogClose() {
      this.dialog = false;
      if (this.dialogTitle === "Success") {
        this.$router.push('/user');
      }
    }
  }
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

.form-card {
  background-color: #f9f9f9 !important;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 20px;
}

.custom-field .v-input__control {
  border: 1px solid #000 !important;
  border-radius: 8px;
}

.width-100 {
  width: 100%;
}

v-dialog{
  color : #003a63;
}
</style>
