<template>
  <div>
    <top-header></top-header>
    <main-content></main-content>
    <bottom-footer></bottom-footer>
  </div>
</template>
<script>
import TopHeader from "./TopHeader";
import MainContent from "./MainContent";
import BottomFooter from "./BottomFooter";
export default {
  components: {
    TopHeader,
    MainContent,
    BottomFooter
  }
};
</script>