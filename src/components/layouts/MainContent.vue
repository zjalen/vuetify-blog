<template>
  <v-container style="max-width: 1185px;">
    <!-- Provides the application the proper gutter -->
    <router-view :key="$route.fullPath"></router-view>
  </v-container>
</template>
<style scoped>

</style>
