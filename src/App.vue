<template>
  <v-app>
    <top-header class="header"></top-header>
    <v-content class="content">
      <!-- Provides the application the proper gutter -->
      <router-view></router-view>
    </v-content>
    <bottom-footer class="footer"></bottom-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import TopHeader from "./components/layouts/TopHeader";
import BottomFooter from "./components/layouts/BottomFooter";
export default {
  name: "App",

  components: {
    TopHeader,
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
  methods: {
    onTabChange(item) {
      console.log(item);
    }
  }
};
</script>
<style>
code {
  border: 1px solid #ddd;
  background: #f6f6f6;
  padding: 3px;
  border-radius: 3px;
  font-size: 14px;
  margin-left: 5px;
  margin-right: 4px;
  color: #c7254e;
  line-height: 16px;
}
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
