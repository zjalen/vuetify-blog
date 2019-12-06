<template>
  <v-app style="overflow-x: hidden">
    <component :is="home"></component>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Home from "./components/layouts/Home";

export default {
  name: "App",
  data() {
    return {
      home: null
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  mounted() {
    if (process.env.VUE_APP_MOCK === "1") {
      this.$store.dispatch("actionGetJsonData", "articles").then(() => {
        this.$store.dispatch("actionGetJsonData", "categories").then(() => {
          this.$store.dispatch("actionGetJsonData", "pages").then(() => {
            this.$store.dispatch("actionGetJsonData", "topics").then(() => {
              this.$store.commit("setLoading", false);
              this.home = Home;
            });
          });
        });
      });
    } else {
      this.$store.commit("setLoading", false);
      this.home = Home;
    }
  }
};
</script>
<style>
</style>
