<template>
  <v-footer
    :padless="true"
  >
    <v-card
      flat
      tile
      width="100%"
      class="text-center footer-card"
      color="secondary"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <v-layout column  justify-center wrap align-center>
          <a class="text-style" href="http://www.miitbeian.gov.cn/">
          备案号:粤ICP备16095696号-2
          </a>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      items: [
        'default',
        'absolute',
        'fixed',
      ],
    }
  }
}
</script>
<style scoped>
.text-style {
  color: var(--v-primary) !important;
}
</style>