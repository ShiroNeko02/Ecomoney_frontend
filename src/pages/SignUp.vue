<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-sheet class="login-card pa-6" elevation="10">
      <v-container class="d-flex flex-column align-center" style="height: 100%; margin-top:30px;">
        <v-row justify="center">
          <v-avatar size="90">
            <v-img src="@/assets/logo.png" alt="EcoMoney Logo" />
          </v-avatar>
        </v-row>

        <h2 class="text-center font-weight-bold mt-8 title-color">Sign Up</h2>

        <v-form ref="form" v-model="isFormValid" @submit.prevent="signUp" style="width: 100%;">
          <div class="cont-1">
            <Input
              v-model="userData.first_name"
              label="First Name"
              placeholder="First Name"
              :rules="[v => !!v || 'First name is required']"
              required
            />
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.last_name"
              label="Last Name"
              placeholder="Last Name"
              :rules="[v => !!v || 'Last name is required']"
              required
            />
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.email"
              label="Email"
              placeholder="Email"
              type="email"
              :rules="[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
              ]"
              required
            />
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.password"
              label="Password"
              placeholder="Password"
              type="password"
              :rules="passwordRules"
              required
            />
            <div class="password-requirements text-caption mt-1">
              Password must:
              <ul>
                <li>Be at least 6 characters long</li>
                <li>Contain at least one uppercase letter</li>
                <li>Contain at least one number</li>
              </ul>
            </div>
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.confirm_password"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              :rules="[
                v => !!v || 'Please confirm your password',
                v => v === userData.password || 'Passwords do not match'
              ]"
              required
            />
          </div>

          <Button
            type="submit"
            class="mt-8"
            :disabled="!isFormValid || loading"
          >
            <v-progress-circular v-if="loading" indeterminate color="white" size="20"/>
            <span v-else style="color:white;">Sign Up</span>
          </Button>
        </v-form>

        <div class="separator mb-6">
          <span style="color:#003a6a;">Or</span>
        </div>

        <Button @click="goToSignIn" style="margin-bottom:50px;">Sign In</Button>

        <!-- Message d'erreur -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="bg-light">
            <v-card-title :class="{ 'red--text': !success, 'green--text': success }">
              {{dialogTitle}}
            </v-card-title>
            <v-card-text>{{ responseMessage }}</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="handleDialogClose">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import Header from "@/components/commun/Header.vue";
import Footer from "@/components/commun/Footer.vue";
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";
import { userService } from "@/services/api.js";

export default {
  name: "SignUp",
  components: {
    Header,
    Footer,
    Input,
    Button
  },
  data() {
    return {
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        consumption_goal_euros: 0 //valeur par defaut
      },
      isFormValid: false,
      loading: false,
      dialog: false,
      dialogTitle: "",
      responseMessage: "",
      success: false
    };
  },
  computed: {
    passwordRules() {
      return [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
        v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        v => /\d/.test(v) || 'Password must contain at least one number'
      ];
    }
  },
  methods: {
    validatePassword(password) {
      return (
        password.length >= 6 &&
        /[A-Z]/.test(password) &&
        /\d/.test(password)
      );
    },

    async signUp() {
      if (!this.$refs.form.validate()) {
        return;
      }

      if (!this.validatePassword(this.userData.password)) {
        this.showNotification(
          "Error",
          "Password must be at least 6 characters long, contain at least one uppercase letter and one number"
        );
        return;
      }

      this.loading = true;
      try {
        // Préparer les données à envoyer
        const signUpData = {
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          email: this.userData.email,
          password: this.userData.password,
          consumption_goal_euros: 0
        };

        const response = await userService.signUp(signUpData);
        this.success = true;
        this.showNotification(
          "Success",
          "Account created successfully! Please sign in."
        );
      } catch (error) {
        this.success = false;
        this.showNotification(
          "Error",
          error.response?.data?.message || error.response?.data?.error || "Failed to create account"
        );
        console.error("SignUp Error:", error);
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
        this.goToSignIn();
      }
    },

    goToSignIn() {
      this.$router.push("/signIn");
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

.cont-1 {
  margin-bottom: 16px;
}

.password-requirements {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  margin-top: 4px;
  text-align: left;
}

.password-requirements ul {
  margin: 4px 0 0 20px;
  padding: 0;
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

.mb-6 {
  margin-bottom: 20px;
}

.mt-8 {
  margin-top: 32px;
}

span {
  color: #003a6a;
}
</style>
