<template>
  <div>
    <top-header class="header"></top-header>
    <v-content class="content">
      <main-content></main-content>
    </v-content>
    <bottom-footer class="footer"></bottom-footer>
    <go-to></go-to>
  </div>
</template>

<script>
import '../../scss/custom.scss';
import GoTo from './GoTo';
import TopHeader from "./TopHeader";
import MainContent from "./MainContent";
import BottomFooter from "./BottomFooter";

export default {
  name: "Home",

  components: {
    TopHeader,
    MainContent,
    BottomFooter,
    GoTo
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
