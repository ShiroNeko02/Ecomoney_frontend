<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-sheet class="login-card pa-6" elevation="10">
      <v-container class="d-flex flex-column align-center" style="height: 100%">
        <v-row justify="center">
          <v-avatar size="90">
            <v-img src="@/assets/logo.png" alt="EcoMoney Logo" />
          </v-avatar>
        </v-row>

        <h2 class="text-center font-weight-bold mt-8 title-color">Reset Password</h2>
      </v-container>

      <v-form @submit.prevent="resetPassword" style="width: 100%;">
        <Input
          v-model="email"
          label="Email"
          placeholder="Enter your email address"
          :rules="[v => !!v || 'Email is required']"
          required
        />

        <Button
          type="submit"
          class="mt-8"
          :disabled="loading || !email"
        >
          <v-progress-circular v-if="loading" indeterminate color="white" size="20"/>
          <span v-else style="color:white">Send Reset Link</span>
        </Button>
      </v-form>

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
            <v-btn color="primary" @click="handleDialogClose">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="separator mb-6">
        <span style="color:#003a6a;">Or</span>
      </div>

      <Button @click="backToSignIn">Back to Sign In</Button>
    </v-sheet>
  </v-container>
</template>

<script>
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";
import { userService } from "@/services/api.js";

export default {
  name: 'ResetPassword',
  components: {
    Input,
    Button
  },
  data() {
    return {
      email: '',
      loading: false,
      dialog: false,
      dialogTitle: '',
      responseMessage: '',
      success: false
    };
  },
  methods: {
    async resetPassword() {
      if (!this.email) {
        this.showNotification('Error', 'Email is required');
        return;
      }

      this.loading = true;
      try {
        await userService.requestPasswordReset(this.email);
        this.success = true;
        this.showNotification(
          'Success',
          'If an account exists with this email, you will receive password reset instructions.'
        );
      } catch (error) {
        this.showNotification(
          'Error',
          'Unable to process your request. Please try again later.'
        );
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
      if (this.success) {
        this.backToSignIn();
      }
    },

    backToSignIn() {
      this.$router.push('/signIn');
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: #003a63;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 87%;
  min-height: 58vh;
  max-width: 400px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(10px);
  padding: 30px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
}

.title-color {
  color: #003a6a;
}

.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 20px;
  width: 100%;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #003a6a;
  margin: 0 10px;
}
</style>
