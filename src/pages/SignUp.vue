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

          <v-form ref="signupForm" v-model="valid" class="d-flex flex-column form-container">
            <!-- Champ Login -->
            <Input
              v-model="username"
              placeholder="Login"
              :rules="[rules.required]"
              class="mb-6"
            />

            <!-- Champ Mot de passe -->
            <Input
              v-model="password"
              placeholder="Mot de passe"
              type="password"
              :rules="[rules.required]"
              class="mb-6"
            />

            <!-- Champ Nom -->
            <Input
              v-model="nom"
              placeholder="Nom"
              :rules="[rules.required]"
              class="mb-6"
            />

            <!-- Champ Prénom -->
            <Input
              v-model="prenom"
              placeholder="Prénom"
              :rules="[rules.required]"
              class="mb-6"
            />

            <!-- Champ Email -->
            <Input
              v-model="email"
              placeholder="Email"
              :rules="[rules.required, rules.email]"
              class="mb-6"
            />

            <!-- Bouton S'inscrire -->
            <Button :disabled="!valid" @click="signUp" class="mt-8">S'inscrire</Button>
          </v-form>
        </v-container>
      </v-sheet>
    </v-container>
  </template>

  <script>
  import Input from "@/components/input or select/Input.vue";
  import Button from "@/components/button/Button.vue";

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
        username: "",
        password: "",
        lastName: "",
        firstName: "",
        email: "",
        valid: false,
        rules: {
          required: (value) => !!value || "Ce champ est requis",
          email: (value) => {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return pattern.test(value) || "Veuillez entrer un email valide";
          },
        },
      };
    },
    methods: {
      signUp() {
        if (this.valid) {
          alert(`Inscription réussie pour ${this.username}`);
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
    background: linear-gradient(to bottom, rgba(219, 232, 243, 0.5), rgba(162, 187, 201, 0.5));
    backdrop-filter: blur(10px);
    padding: 30px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    background: black;
    margin: 0 10px;
  }

  /* Augmentation de l'espacement */
  .mb-6 {
    margin-bottom: 24px; /* Espacement plus grand entre les champs */
  }

  .mt-6 {
    margin-top: 24px; /* Espacement plus grand pour les boutons */
  }

  .mt-8 {
    margin-top: 32px; /* Espacement encore plus grand pour séparer les éléments */
  }
  </style>
