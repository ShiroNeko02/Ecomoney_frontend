<template>
  <v-app class="bg-light">
    <Header :title="$t('pageChangePassword.title')" />

    <v-main>
      <v-container>
        <!-- Form -->
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <v-form ref="form" v-model="isFormValid">
            <div class="cont-1">
              <Input
                v-model="current_password"
                :label="$t('pageChangePassword.currentPassword')"
                class="custom-field"
                type="password"
                :rules="[v => !!v || $t('pageChangePassword.errors.currentRequired')]"
              />
            </div>
            <div class="cont-1">
              <Input
                v-model="new_password"
                :label="$t('pageChangePassword.newPassword')"
                class="custom-field"
                type="password"
                :rules="passwordRules"
                :hint="$t('pageChangePassword.hint')"
                persistent-hint
              />
            </div>
            <div class="cont-1">
              <Input
                v-model="confirm_new_password"
                :label="$t('pageChangePassword.confirmPassword')"
                class="custom-field"
                type="password"
                :rules="[
                  v => !!v || $t('pageChangePassword.errors.confirmRequired'),
                  v => v === new_password || $t('pageChangePassword.errors.noMatch')
                ]"
              />
            </div>

            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 10px;">
              <div style="width:90%; display: flex; justify-content: center;">
                <Button
                  @click="submit"
                  class="mt-6"
                  :disabled="!isFormValid || loading"
                >
                  {{ $t('pageChangePassword.submit') }}
                </Button>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-container>

      <!-- ALERT BOX -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline text-center">{{ dialogTitle }}</v-card-title>
          <v-card-text v-if="loading">
            <v-progress-circular indeterminate color="blue" />
            {{ $t('pageChangePassword.loading') }}
          </v-card-text>
          <v-card-text class="text-black" v-else>
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
  name: "pageChangePassword",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Button, Footer, Header, Input },
  data() {
    return {
      current_user: null,
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      dialog: false,
      dialogTitle: "",
      loading: false,
      responseMessage: "",
      isFormValid: false,
      passwordRules: [
        v => !!v || this.$t('pageChangePassword.errors.required'),
        v => v.length >= 6 || this.$t('pageChangePassword.errors.minLength'),
        v => /[A-Z]/.test(v) || this.$t('pageChangePassword.errors.uppercase'),
        v => /\d/.test(v) || this.$t('pageChangePassword.errors.number')
      ]
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
      if (!this.$refs.form.validate()) return;

      if (!this.current_password || !this.new_password || !this.confirm_new_password) {
        this.showNotification(this.$t("pageChangePassword.errorTitle"), this.$t("pageChangePassword.errors.allRequired"));
        return;
      }

      if (this.new_password !== this.confirm_new_password) {
        this.showNotification(this.$t("pageChangePassword.errorTitle"), this.$t("pageChangePassword.errors.noMatch"));
        return;
      }

      this.loading = true;
      try {
        const response = await userService.changePassword(this.current_password, this.new_password);
        this.showNotification(this.$t("pageChangePassword.successTitle"), response.message || this.$t("pageChangePassword.successMessage"));
        this.resetForm();
      } catch (error) {
        let errorMessage = this.$t("pageChangePassword.errors.generic");
        if (error.response?.status === 401) {
          errorMessage = this.$t("pageChangePassword.errors.incorrectCurrent");
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
        this.showNotification(this.$t("pageChangePassword.errorTitle"), errorMessage);
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
      this.current_password = "";
      this.new_password = "";
      this.confirm_new_password = "";
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped>
*{
  color : black;
}

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
