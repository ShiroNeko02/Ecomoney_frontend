<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-sheet class="login-card pa-6" elevation="10">
      <v-container class="d-flex flex-column align-center" style="height: 100%; margin-top:30px;">
        <v-row justify="center">
          <v-avatar size="90">
            <v-img src="@/assets/logo.png" alt="EcoMoney Logo" />
          </v-avatar>
        </v-row>

        <h2 class="text-center font-weight-bold mt-8 title-color">EcoMoney</h2>
      </v-container>

      <v-form @submit.prevent="signIn" style="width: 100%;">
        <!-- Email -->
        <Input v-model="user.email" label="Email" placeholder="Email" required/>

        <!-- Password -->
        <Input v-model="user.password" label="Password" placeholder="Password" type="password" class="mb-6" required />

        <!-- Button Sign In -->
        <Button @click="signIn" class="mt-8" :disabled="loading || !formValid">
          <v-progress-circular v-if="loading" indeterminate color="white" size="20"/>
          <span v-else style="color:white;">Sign In</span>
        </Button>
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

      <div class="separator mb-6">
        <span style="color:#003a6a;">Or</span>
      </div>

      <Button @click="signUp" style="margin-bottom:50px;">Sign Up</Button>
    </v-sheet>
  </v-container>
</template>

  <script>
  import Input from "@/components/input or select/Input.vue";
  import Button from "@/components/button/Button.vue";
  import { userService } from "@/services/api.js";

  export default {
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names
      Input,
      // eslint-disable-next-line vue/no-reserved-component-names
      Button,
    },
    data() {
      return {
        user:{
          email: "",
          password: ""
        }
      };
    },
    computed: {
      formValid() {
        return this.user.email && this.user.password ;
      }
    },
    methods: {
      async signIn() {
        if (!this.formValid) {
          this.dialogTitle = "Error";
          this.responseMessage = "All fields are required";
          this.dialog = true;
          return;
        }

        this.loading = true;
        try {
          await userService.signIn(this.user);
          setTimeout(() => {
            this.$router.push("/home");
          }, 2000);
        } catch (error) {
          console.error("Error:", error);
          this.dialogTitle = "Error";
          this.responseMessage = error.response?.data?.message || "Email or password incorrect";
          this.dialog = true;
        } finally {
          this.loading = false;
        }
      },
      signUp() {
        this.$router.push("/signUp");
      },
    },
    name: "SignIn",
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

  v-form{
    margin-top: 20px;
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

  .custom-input[data-v-a0faad51]{
    padding: 0 !important;
  }

  .mb-6 {
    margin-bottom: 20px;
  }

  .mt-6 {
    margin-top: 20px;
  }

  span {
    color: #003a6a;
  }

  </style>
