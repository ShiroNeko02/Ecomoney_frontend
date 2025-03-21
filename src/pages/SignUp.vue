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

      <v-form @submit.prevent="signUp" style="width: 100%;">
        <!-- Email -->
        <Input v-model="user.email" label="Email" placeholder="Email" required/>

        <!-- Password -->
        <Input v-model="user.password" label="Password" placeholder="Password (6 characters at least)" type="password" class="mb-6" required />

        <!-- First Name -->
        <Input v-model="user.data.first_name" label="First Name" placeholder="First Name" class="mb-6" required/>

        <!-- Last Name -->
        <Input v-model="user.data.last_name" label="Last Name" placeholder="Last Name" class="mb-6" required/>


        <!-- Button Sign Up -->
        <Button @click="signUp" class="mt-8" :disabled="loading || !formValid">
          <v-progress-circular v-if="loading" indeterminate color="white" size="20"/>
          <span v-else style="color:white;">Sign Up</span>
        </Button>
      </v-form>

      <!-- ALERT BOX -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="bg-light">
          <v-card-title class="headline" >{{dialogTitle}}</v-card-title>
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

      <div class="separator mb-6">
        <span style="color:#003a6a;">Or</span>
      </div>

      <Button @click="signIn">Sign In</Button>
      <div></div>
    </v-sheet>
  </v-container>
</template>

<script>
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";
import { userService } from "@/services/api.js";

export default {
  name: "SignUp",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Input, Button },
  data() {
    return {
      user: {
        email: "",
        password: "",
        data: {
          first_name: "",
          last_name: "",
        },
      },
      loading: false,
      dialog: false,
      dialogTitle: "",
      responseMessage: "",
    };
  },
  computed: {
    formValid() {
      return this.user.email && this.user.password && this.user.data.first_name && this.user.data.last_name;
    }
  },
  methods: {
    async signUp() {
      if (!this.formValid) {
        this.dialogTitle = "Error";
        this.responseMessage = "All fields are required";
        this.dialog = true;
        return;
      }

      this.loading = true;
      try {
        await userService.signUp(this.user);
        this.dialogTitle = "Success";
        this.responseMessage = "Account created successfully";
        this.dialog = true;
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        this.dialogTitle = "Error";
        this.responseMessage = error.response?.data?.message || "Inscription failed";
        this.dialog = true;
      } finally {
        this.loading = false;
      }
    },
    signIn() {
      this.$router.push("/signIn");
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
}

.title-color {
  color: #003a6a;
}

.form-container {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.custom-input[data-v-a0faad51]{
  padding: 0 !important;
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

.mt-6 {
  margin-top: 20px;
}

span {
  color: #003a6a;
}

</style>
