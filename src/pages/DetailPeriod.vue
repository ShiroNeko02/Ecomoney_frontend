<template>
  <v-app class="bg-light">
    <Header title="Detail by period" />

    <v-main>
      <v-container>
        <!-- Change Form -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" color="grey" @click="searchDevice">By device</RectangleButton></div>
            </v-col>
            <v-col cols="6">
              <div class="cont-2"><RectangleButton class="mt-4" >By period</RectangleButton></div>
            </v-col>
          </v-row>
        </v-container>

        <!-- Select device -->

      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>

import Footer from "@/components/commun/Footer.vue";
import Header from "@/components/commun/Header.vue";
import RectangleButton from "@/components/button/RectangleButton.vue";
import Input from "@/components/input or select/Input.vue";
import Button from "@/components/button/Button.vue";

export default {
  name:"DetailPeriod",
  components: {
    RectangleButton,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Input,
    // eslint-disable-next-line vue/no-reserved-component-names,vue/no-unused-components
    Button
  },
  data() {
    return {

    }
  },
  methods: {
    searchDevice() {
      this.$router.push("/detailDevice");
    }
  }
};
</script>


<style scoped>

</style>
