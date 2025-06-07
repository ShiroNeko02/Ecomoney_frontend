<template>
  <v-app class="bg-light">
    <Header :title="$t('pageChangeBudget.title')" />

    <v-main>
      <v-container>
        <v-card class="mt-8 pa-4 form-card elevation-4">
          <h2 class="text-center mb-6 title-color">{{ $t('pageChangeBudget.subtitle') }}</h2>

          <v-form ref="form" v-model="isFormValid">
            <div class="cont-1">
              <Input
                v-model="goalAmount"
                :label="$t('pageChangeBudget.inputLabel')"
                type="number"
                min="0"
                step="0.01"
                class="custom-field"
                :rules="[
                  v => !!v || $t('pageChangeBudget.errors.required'),
                  v => v >= 0 || $t('pageChangeBudget.errors.positive'),
                  v => !isNaN(v) || $t('pageChangeBudget.errors.number'),
                  v => Number.isFinite(parseFloat(v)) || $t('pageChangeBudget.errors.number')
                ]"
              />
            </div>

            <div class="text-center mt-6">
              <p class="text-subtitle-1">{{ $t('pageChangeBudget.currentLabel') }}</p>
              <v-skeleton-loader v-if="loading" type="text" class="mx-auto" width="100px" />
              <p v-else class="text-h5 font-weight-bold">{{ formatAmount(currentGoal) }}€</p>
              <v-btn icon small @click="loadCurrentGoal" :loading="loading" class="ml-2">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>

            <div class="d-flex justify-center width-100 mt-6">
              <Button
                @click="updateGoal"
                :disabled="!isFormValid || loading || !hasChanges"
                :color="!hasChanges ? 'grey' : 'primary'"
              >
                <v-progress-circular v-if="loading" indeterminate color="white" size="20" />
                <span v-else style="color:white;">
                  {{ !hasChanges ? $t('pageChangeBudget.noChanges') : $t('pageChangeBudget.update') }}
                </span>
              </Button>
            </div>
          </v-form>
        </v-card>
      </v-container>

      <div class="mt-4 mr-4 ml-4 suggestions">
        <p class="text-subtitle-2">{{ $t('pageChangeBudget.suggestionsTitle') }}</p>
        <v-chip-group>
          <v-chip
            v-for="suggestion in budgetSuggestions"
            :key="suggestion.value"
            @click="goalAmount = suggestion.value"
            color="primary"
            outlined
          >
            {{ $t(suggestion.label) }}
          </v-chip>
        </v-chip-group>
      </div>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline text-center" style="color: #003a63;">{{ dialogTitle }}</v-card-title>
          <v-card-text v-if="loading">
            <v-progress-circular indeterminate color="blue" />
            {{ $t('pageChangeBudget.loading') }}
          </v-card-text>
          <v-card-text v-else>
            {{ responseMessage }}
          </v-card-text>
          <v-card-actions class="justify-center">
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

export default {
  name: "pageChangeBudget",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Header, Footer, Input, Button },
  data() {
    return {
      goalAmount: 0.0,
      currentGoal: 0.0,
      isFormValid: false,
      loading: false,
      dialog: false,
      dialogTitle: "",
      responseMessage: "",
      success: false,
      budgetSuggestions: [
        { value: 150, label: "pageChangeBudget.suggestions.frugal" },
        { value: 200, label: "pageChangeBudget.suggestions.standard" },
        { value: 250, label: "pageChangeBudget.suggestions.comfort" }
      ]
    };
  },
  mounted() {
    this.loadCurrentGoal();
  },
  computed: {
    hasChanges() {
      return parseFloat(this.goalAmount) !== parseFloat(this.currentGoal);
    }
  },
  methods: {
    async loadCurrentGoal() {
      this.loading = true;
      try {
        const userData = await userService.getCurrentGoal();
        if (userData?.consumption_goal_euros !== undefined) {
          this.currentGoal = userData.consumption_goal_euros;
          this.goalAmount = this.currentGoal;
        } else {
          this.currentGoal = 0.0;
          this.goalAmount = "";
        }
      } catch (error) {
        console.error("Error loading current goal:", error);
        this.showNotification(this.$t("pageChangeBudget.errorTitle"), this.$t("pageChangeBudget.loadError"));
        this.currentGoal = 0.0;
      } finally {
        this.loading = false;
      }
    },
    formatAmount(amount) {
      return parseFloat(amount).toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    async updateGoal() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      try {
        const parsedGoal = parseFloat(this.goalAmount);
        if (isNaN(parsedGoal)) throw new Error("Invalid amount");

        await userService.updateConsumptionGoal(parsedGoal);
        this.success = true;
        await this.loadCurrentGoal();
        this.showNotification(this.$t("pageChangeBudget.successTitle"), this.$t("pageChangeBudget.successMessage"));
      } catch (error) {
        this.showNotification(
          this.$t("pageChangeBudget.errorTitle"),
          error.message === "Invalid amount" ? this.$t("pageChangeBudget.errors.invalid") : this.$t("pageChangeBudget.updateError")
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
        setTimeout(() => {
          this.$router.push("/user");
        }, 500);
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
  border: 1px solid #000 !important;
  border-radius: 10px;
  padding: 20px;
}

.title-color {
  color: #003a6a;
}

.custom-field {
  max-width: 300px;
  margin: 0 auto;
}

.width-100 {
  width: 100%;
}
</style>
