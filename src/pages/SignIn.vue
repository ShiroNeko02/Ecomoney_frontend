<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-sheet class="login-card pa-6" elevation="10">

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

        <h2 class="text-center font-weight-bold mt-8 title-color">{{ $t("pageSignIn.title") }}</h2>
      </v-container>

      <v-form @submit.prevent="signIn" style="width: 100%;">
        <!-- Email -->
        <Input
          v-model="user.email"
          :label="$t('pageSignIn.email')"
          :placeholder="$t('pageSignIn.email')"
          required
        />

        <!-- Password -->
        <Input
          v-model="user.password"
          :label="$t('pageSignIn.password')"
          :placeholder="$t('pageSignIn.password')"
          type="password"
          class="mb-6"
          required
        />

        <!-- Forgot Password Link -->
        <div class="text-right mb-4">
          <v-btn
            variant="text"
            color="#003a6a"
            class="text-none"
            @click="forgotPassword"
          >
            {{ $t("pageSignIn.forgotPassword") }}
          </v-btn>
        </div>

        <!-- Button Sign In -->
        <Button type="submit" class="mt-8" :disabled="loading || !formValid">
          <v-progress-circular v-if="loading" indeterminate color="white" size="20"/>
          <span v-else style="color:white">{{ $t("pageSignIn.signIn") }}</span>
        </Button>
      </v-form>

      <!-- ALERT BOX -->
      <v-dialog class="bg-light" v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
          <v-card-text v-if="loading">
            <v-progress-circular indeterminate color="blue"></v-progress-circular>
            {{ $t("pageSignIn.loading") }}
          </v-card-text>
          <v-card-text v-else>
            {{ responseMessage }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="dialog = false">{{ $t("pageSignIn.ok") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="separator mb-6">
        <span style="color:#003a6a;">{{ $t("pageSignIn.or") }}</span>
      </div>

      <Button @click="signUp" style="margin-bottom:50px;">{{ $t("pageSignIn.signUp") }}</Button>
    </v-sheet>
  </v-container>
</template>

<script>
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";
import LocaleSelect from "@/components/input or select/LocaleSelect.vue";
import { userService } from "@/services/api.js";

export default {
  name: "SignIn",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Input, Button, LocaleSelect
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      loading: false,
      dialog: false,
      dialogTitle: "",
      responseMessage: "",
      locale: this.$i18n.locale
    };
  },
  computed: {
    formValid() {
      return this.user.email && this.user.password;
    }
  },
  methods: {
    changeLanguage(newLocale) {
      this.$i18n.locale = newLocale;
    },
    async signIn() {
      if (!this.formValid) {
        this.dialogTitle = this.$t("pageSignIn.errorTitle");
        this.responseMessage = this.$t("pageSignIn.errorFieldsRequired");
        this.dialog = true;
        return;
      }

      this.loading = true;
      try {
        await userService.signIn(this.user);
        setTimeout(() => {
          this.$router.push("/home");
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          this.dialogTitle = this.$t("pageSignIn.errorTitle");
          this.responseMessage =
            error.response?.data?.message || this.$t("pageSignIn.errorAuth");
          this.dialog = true;
        }, 1000);
      } finally {
        this.loading = false;
      }
    },
    signUp() {
      this.$router.push("/signUp");
    },
    forgotPassword() {
      this.$router.push("/reset-password");
    }
  }
};
</script>

<style scoped>
*{
  color : black;
}

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

.language-select {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 83px;
  font-size: 13px;
  z-index: 20;
  color : #003a63;
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

.mb-6 {
  margin-bottom: 20px;
}

button:disabled {
  background-color: grey !important;
  color: white !important;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
