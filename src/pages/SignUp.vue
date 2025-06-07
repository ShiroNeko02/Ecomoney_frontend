<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-sheet class="login-card pa-2" elevation="10">

      <!-- Language -->
      <LocaleSelect
        v-model="locale"
        @change="changeLanguage"
      />

      <v-container class="d-flex flex-column align-center" style="height: 100%; margin-top:30px;">
        <v-row justify="center">
          <v-avatar size="90">
            <v-img src="@/assets/logo.png" alt="EcoMoney Logo" />
          </v-avatar>
        </v-row>

        <h2 class="text-center font-weight-bold mt-4 mb-4 title-color">{{ $t('pageSignUp.title') }}</h2>

        <v-form ref="form" v-model="isFormValid" @submit.prevent="signUp" style="width: 100%;">
          <div class="cont-1">
            <Input
              v-model="userData.first_name"
              :label="$t('pageSignUp.firstName')"
              :placeholder="$t('pageSignUp.firstName')"
              :rules="[v => !!v || $t('pageSignUp.errorFieldsRequired')]"
              required
            />
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.last_name"
              :label="$t('pageSignUp.lastName')"
              :placeholder="$t('pageSignUp.lastName')"
              :rules="[v => !!v || $t('pageSignUp.errorFieldsRequired')]"
              required
            />
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.email"
              :label="$t('pageSignUp.email')"
              :placeholder="$t('pageSignUp.email')"
              type="email"
              :rules="[
                v => !!v || $t('pageSignUp.errorFieldsRequired'),
                v => /.+@.+\..+/.test(v) || $t('pageSignUp.errorInvalidEmail')
              ]"
              required
            />
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.password"
              :label="$t('pageSignUp.password')"
              :placeholder="$t('pageSignUp.password')"
              type="password"
              :rules="passwordRules"
              required
            />
            <div class="password-requirements text-caption mt-1 ml-4">
              {{ $t('pageSignUp.passwordRequirements') }}
              <ul>
                <li>{{ $t('pageSignUp.requirementLength') }}</li>
                <li>{{ $t('pageSignUp.requirementUppercase') }}</li>
                <li>{{ $t('pageSignUp.requirementNumber') }}</li>
              </ul>
            </div>
          </div>

          <div class="cont-1">
            <Input
              v-model="userData.confirm_password"
              :label="$t('pageSignUp.confirmPassword')"
              :placeholder="$t('pageSignUp.confirmPassword')"
              type="password"
              :rules="[
                v => !!v || $t('pageSignUp.errorFieldsRequired'),
                v => v === userData.password || $t('pageSignUp.errorPasswordsNotMatching')
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
            <span v-else style="color:white;">{{ $t('pageSignUp.signUp') }}</span>
          </Button>
        </v-form>

        <div class="separator mb-6">
          <span style="color:#003a6a;">{{ $t('pageSignUp.or') }}</span>
        </div>

        <Button @click="goToSignIn" style="margin-bottom:30px;">
          {{ $t('pageSignUp.signIn') }}
        </Button>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="bg-light">
            <v-card-title :class="{ 'red--text': !success, 'green--text': success }">
              {{ $t(success ? 'pageSignUp.successTitle' : 'pageSignUp.errorTitle') }}
            </v-card-title>
            <v-card-text>{{ responseMessage }}</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="handleDialogClose">{{ $t('pageSignUp.ok') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";
import { userService } from "@/services/api.js";
import LocaleSelect from "@/components/input or select/LocaleSelect.vue";

export default {
  name: "SignUp",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {LocaleSelect, Input, Button },
  data() {
    return {
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        consumption_goal_euros: 0
      },
      isFormValid: false,
      loading: false,
      dialog: false,
      responseMessage: "",
      success: false,
      locale: this.$i18n.locale
    };
  },
  computed: {
    passwordRules() {
      return [
        v => !!v || this.$t('pageSignUp.errorFieldsRequired'),
        v => v.length >= 6 || this.$t('pageSignUp.requirementLength'),
        v => /[A-Z]/.test(v) || this.$t('pageSignUp.requirementUppercase'),
        v => /\d/.test(v) || this.$t('pageSignUp.requirementNumber')
      ];
    }
  },
  methods: {
    changeLanguage(newLocale) {
      this.$i18n.locale = newLocale;
    },
    validatePassword(password) {
      return password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
    },
    async signUp() {
      if (!this.$refs.form.validate()) return;

      if (!this.validatePassword(this.userData.password)) {
        this.showNotification(this.$t('pageSignUp.errorTitle'), this.$t('pageSignUp.errorWeakPassword'));
        return;
      }

      this.loading = true;
      try {
        const signUpData = {
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          email: this.userData.email,
          password: this.userData.password,
          consumption_goal_euros: 0
        };

        await userService.signUp(signUpData);
        this.success = true;
        this.showNotification(this.$t('pageSignUp.successTitle'), this.$t('pageSignUp.successMessage'));
      } catch (error) {
        this.success = false;
        this.showNotification(this.$t('pageSignUp.errorTitle'), error.response?.data?.message || error.response?.data?.error || this.$t('pageSignUp.errorSignUp'));
      } finally {
        this.loading = false;
      }
    },
    showNotification(title, message) {
      this.responseMessage = message;
      this.dialog = true;
    },
    handleDialogClose() {
      this.dialog = false;
      if (this.success) this.goToSignIn();
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

button:disabled,
button[disabled] {
  background-color: grey !important;
  color: white !important;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
