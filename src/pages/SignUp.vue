<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-sheet class="login-card pa-6" elevation="10">
      <v-container class="d-flex flex-column align-center" style="height: 100%">
        <v-row justify="center">
          <v-avatar size="90">
            <v-img src="@/assets/logo.png" alt="EcoMoney Logo" />
          </v-avatar>
        </v-row>

        <h2 class="text-center font-weight-bold mt-8 title-color">EcoMoney</h2>
      </v-container>
      <v-form>
        <!-- Email -->
        <Input v-model="user.email" label="Email" placeholder="Email" required/>

        <!-- Password -->
        <Input v-model="user.password" label="Password" placeholder="Password" type="password" class="mb-6" required />

        <!-- First Name -->
        <Input v-model="user.first_name" label="First Name" placeholder="First Name" class="mb-6" required/>

        <!-- Last Name -->
        <Input v-model="user.last_name" label="Last Name" placeholder="Last Name" class="mb-6" required/>

        <!-- Button Sign Up -->
        <Button @click="signUp" class="mt-8">Sign Up</Button>
      </v-form>

      <!-- Notification -->
      <v-dialog v-model="dialog" max-width="450px">
        <v-card class="bg-light dialog-card">
          <v-card-title>{{ dialogTitle }}</v-card-title>
          <v-card-text>{{ responseMessage }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-sheet>
  </v-container>
</template>

<script>
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";
import { userService } from "@/services/api.js";

export default {
  name: "SignUp",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Input,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      dialog: false,
      dialogTitle: "",
      responseMessage: "",
    };
  },
  methods: {
    async signUp() {
      event.preventDefault();

      const userData = {
        email: this.user.email,
        password: this.user.password,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      };

      try {
        await userService.signUp(userData);
        this.dialogTitle = "Success";
        this.responseMessage = "Account created successfully";
        this.dialog = true;

        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        this.dialogTitle = "Error";
        this.responseMessage = "Inscription failed";
        this.dialog = true;
      }
    },
  },
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
  min-height: 70vh;
  max-width: 400px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(10px);
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title-color {
  color: #003a6a;
}

v-form {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.mb-6 {
  margin-bottom: 20px;
}

.mt-8 {
  margin-top: 30px;
}
</style>
