<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-sheet class="login-card pa-6" elevation="10">
        <v-container class="d-flex flex-column align-center" style="height: 100%">
          <v-row justify="center">
            <v-avatar size="90">
              <v-img src="@/assets/logo.png" alt="EcoMoney Logo" />
            </v-avatar>
          </v-row>


          <h2 class="text-center font-weight-bold mt-6 title-color">EcoMoney</h2>

          <v-form ref="loginForm" v-model="valid" class="d-flex flex-column form-container">
            <Input
              v-model="username"
              placeholder="Login"
              :rules="[rules.required]"
              class="mb-6"
            />

            <Input
              v-model="password"
              placeholder="Mot de passe"
              type="password"
              :rules="[rules.required]"
              class="mb-6"
            />


            <Button @click="login" class="mt-6">Se connecter</Button>

          </v-form>

          <div class="separator mb-6">
            <span>Ou</span>
          </div>

          <Button  @click="goToInscription">S'inscrire</Button>
        </v-container>
      </v-sheet>
    </v-container>
  </template>

  <script>
  import Input from "@/components/input or select/Input.vue";
  import Button from "@/components/button/Button.vue";

  export default {
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names
      Input,
      // eslint-disable-next-line vue/no-reserved-component-names
      Button,
    },
    data() {
      return {
        username: "",
        password: "",
        valid: false,
        rules: {
          required: (value) => !!value || "Ce champ est requis",
        },
      };
    },
    methods: {
      login() {
        if (this.valid) {
          alert(`Connexion avec ${this.username}`);
        }
      },
      gotoInscription() {
        this.$router.push("/inscription");
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
