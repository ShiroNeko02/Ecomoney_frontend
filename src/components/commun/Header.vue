<template>
  <v-app-bar color="white" elevation="2">
    <!-- Logo -->
    <v-img src="@/assets/logo.png" max-height="40" max-width="40" contain class="ml-4"></v-img>

    <!-- Title -->
    <v-spacer></v-spacer>
    <v-app-bar-title class="text-center">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <!-- Info button with tooltip -->
    <v-tooltip bottom>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          @click="showAboutDialog = true"
          class="mr-3"
        >
          <v-icon class="text-primary" size="33">mdi-information-outline</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('about.tooltip') }}</span>
    </v-tooltip>

    <!-- About Us Dialog -->
    <v-dialog v-model="showAboutDialog" max-width="600">
      <v-card color="white">
        <v-card-title class="text-h5 text-black">
          {{ $t('about.title') }}
        </v-card-title>

        <v-card-text class="pa-4 mt-4 text-black">
          <v-row>
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                src="@/assets/logo.png"
                max-height="100"
                contain
                class="mx-auto mb-4"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="8">
              <h3 class="text-h6 mb-3 text-black">{{ $t('about.missionTitle') }}</h3>
              <p class="text-body-1 text-black">
                {{ $t('about.missionText') }}
              </p>

              <h3 class="text-h6 mb-3 mt-4 text-black">{{ $t('about.versionTitle') }}</h3>
              <p class="text-body-1 text-black">
                {{ $t('about.version') }}
              </p>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div class="text-body-2 text-black">
            <h3 class="text-subtitle-1 mb-2 text-black">{{ $t('about.contactTitle') }}</h3>
            <p class="text-black">
              <v-icon size="small" class="mr-2" color="black">mdi-email-outline</v-icon> ecomoney2425@gmail.com
            </p>
          </div>
        </v-card-text>

        <v-card-actions class="pb-4 px-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            @click="showAboutDialog = false"
            class="custom-blue-btn"
          >
            {{ $t('about.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showAboutDialog: false
    };
  }
};
</script>

<style scoped>
.v-app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-app-bar-title {
  font-weight: bold;
  color: #2596be;
  flex-grow: 1;
}

.v-spacer {
  flex-grow: 0 !important;
  flex-shrink: 0;
  flex-basis: 2px;
}

.v-toolbar__content > .v-toolbar-title {
  margin-inline-start: 0px;
}

.bg-white {
  background-color: white !important;
}

.text-black {
  color: rgba(0, 0, 0, 0.87) !important;
}

/* Force white background in dialog */
.v-dialog .v-card {
  background-color: white !important;
}

/* Custom blue button style */
.custom-blue-btn {
  color: #003a6a !important;
  border-color: #003a6a !important;
}

.custom-blue-btn:hover {
  background-color: rgba(0, 58, 106, 0.05) !important;
}
</style>
