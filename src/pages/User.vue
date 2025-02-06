<template>
    <v-app class="bg-light">
      <Header title="Utilisateur" />

      <!-- Contenu pricipal -->
      <v-main>
        <v-container class="mt-12 d-flex justify-center align-center">
            <v-row align="center" justify="center">
            <v-col cols="auto" class="text-center">
                <div class="circle-icon"><v-icon size="50" color="white">mdi-account</v-icon></div>
                <span class="text-h6 d-block mt-2">Utilisateur</span>
            </v-col>
            </v-row>
        </v-container>

        <OptionButton title="Changer le mot de passe" />

        <OptionButton title="Changer mes informations" />

        <OptionButton title="Supprimer mon compte" />

        <OptionButton title="Se déconnecter" @click="goToLogin" />
      </v-main>

      <Footer />
    </v-app>
  </template>


  <script>
    import Header from "@/components/commun/Header.vue";
    import Footer from "@/components/commun/Footer.vue";
    import OptionButton from "@/components/button/OptionButton.vue";
    import '@mdi/font/css/materialdesignicons.css';

    // Creer le lien avec autres pages
    export default {
        name: 'User',
        component: {
          Header,
          Footer,
          OptionButton
        },
        methods: {
          goToLogin() {
              this.$router.push("/signIn");
            }
          },
    };
  </script>



  <style scoped>
  .fill-height {
    min-height: calc(100vh - 80px);
  }

  .bg-light {
    background-color: #fff !important;
    border-radius: 15px;
  }

  .circle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #003a63;
  margin: 0 auto;
    }

  span {
  font-size: 16px;
  font-weight: bold;
  color: #003a63;
  }
  </style>
