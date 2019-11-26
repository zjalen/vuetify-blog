<template>
  <v-app>
    <top-header class="header"></top-header>
    <v-content class="content">
      <main-content></main-content>
    </v-content>
    <bottom-footer class="footer"></bottom-footer>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import TopHeader from "./components/layouts/TopHeader";
import MainContent from "./components/layouts/MainContent";
import BottomFooter from "./components/layouts/BottomFooter";
export default {
  name: "App",

  components: {
    TopHeader,
    MainContent,
    BottomFooter
  },

  data: () => ({
    visible: false,
    title: "JALEN博客",
    slogan: "他沉默，什么都不说，随手写下一行 <code>Hello,World!</code>",
    userInfo: null,
    fixed: false,
    scrollTop: "",
    tab: null,
    items: ["web", "shopping", "videos", "images", "news"],
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }),
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    loading (val) {
      val && setTimeout(() => {
        this.$store.commit('setLoading', false);
      }, 5000)
    },
  },
  methods: {
  }
};
</script>
<style>
.header {
  height: 168px;
  background-color: rgba(0,0,0,0) !important;
}
.footer {
  height: 123px;
}
.content {
  min-height: calc(100vh - 168px - 123px);
}
</style>
