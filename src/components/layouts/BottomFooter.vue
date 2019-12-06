<template>
  <v-footer :padless="true">
    <v-card flat tile width="100%" class="text-center footer-card" color="secondary">
      <v-card-text>
        <v-btn
          v-for="(icon,index) in icons"
          :key="index"
          class="mx-4"
          icon
          target="_blank"
          :href="icon.href"
          @click="showDialog(icon)"
        >
          <v-icon size="24px">{{ icon.name }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <v-layout column justify-center wrap align-center>
          <a class="text-style" href="http://www.miitbeian.gov.cn/">备案号:粤ICP备16095696号-2</a>
        </v-layout>
      </v-card-text>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">感谢使用</v-card-title>

          <v-card-text>喜欢的话，不妨去 github 点个 star。</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="secondary"
              text
              target="_blank"
              href="https://github.com/zjalen/vuetify-blog"
            >走你</v-btn>

            <v-btn color="pink" text @click="dialog = false">不了</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      icons: [
        {
          name: "mdi-home",
          href: "/"
        },
        {
          name: "mdi-email",
          href: "mailto:zjalen@163.com"
        },
        {
          name: "mdi-star",
          href: ""
        },
        {
          name: "mdi-github-circle",
          href: "https://github.com/zjalen/vuetify-blog"
        }
      ]
    };
  },
  methods: {
    showDialog(icon) {
      if (!icon.href) {
        this.dialog = true;
      }
    }
  }
};
</script>
<style scoped>
.text-style {
  color: var(--v-primary) !important;
}
</style>