<template>
  <v-row dense>
    <v-col cols="12">
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    </v-col>
    <v-col v-for="(article, i) in articles" :key="i" cols="12">
      <v-card outlined hover>
        <div class="d-flex flex-column flex-sm-row">
          <v-avatar class="ma-3" :size="imageHeight" height="175px" tile>
            <v-img :src="article.cover"></v-img>
          </v-avatar>

          <v-row dense>
            <v-col :cols="12">
              <v-card-title class="headline" v-text="article.title">
                <span class="is_top" v-if="article.is_top">「置顶」</span>
              </v-card-title>

              <v-card-subtitle v-text="article.description"></v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{ article.created_at }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-2" color="secondary" outlined>
                  <v-icon left>mdi-pencil</v-icon>
                  分类：{{ article.category.name }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="secondary accent-4" outlined v-if="article.topic">
                  <v-icon left>mdi-pencil</v-icon>
                  主题：{{article.topic.name}}
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-pagination
        v-model="current_page"
        :length="page_count"
        total-visible="10"
        @input="onPageChange"
      ></v-pagination>
    </v-col>
  </v-row>
</template>
<script>
import { getArticles } from "../api";
export default {
  data: () => ({
    items: [],
    breadcrumbs: [
      {
        disabled: true,
        href: '',
        link: false,
        text: "首页",
      }
    ],
    articles: [],
    current_page: 1,
    page_count: 1,
    per_page_count: 10,
  }),
  mounted() {
    this.current_page = this.$route.params.page ? this.$route.params.page : 1;
    this.init();
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "auto";
      }
      return "175";
    }
  },
  methods: {
    init() {
      let params = {
        limit: this.per_page_count,
        skip: (this.current_page - 1) * this.per_page_count
      };
      getArticles(params).then(response => {
        console.log(response);
        this.articles = response.data.articles;
        this.page_count = Math.ceil(response.data.count / this.per_page_count);
      });
    },
    onPageChange(page) {
      console.log(page)
    }
  }
};
</script>