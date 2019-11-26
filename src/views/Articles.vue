<template>
  <v-row dense>
    <v-col v-if="breadcrumbs_show" cols="12">
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    </v-col>
    <v-col v-if="filters.topic || filters.tag" cols="12" class="pb-3">
      <v-btn v-if="filters.topic" outlined color="tertiary" @click="$router.push({name: 'index'})">
        <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
          {{filters.topic}}
        <v-icon right>mdi-close</v-icon>
      </v-btn>
      <v-btn v-if="filters.tag" outlined color="tertiary" @click="$router.push({name: 'index'})">
        <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
          {{filters.tag}}
        <v-icon right>mdi-close</v-icon>
      </v-btn>
    </v-col>
    <v-col v-for="(article, i) in articles" :key="i" cols="12">
      <v-card outlined hover>
        <div class="d-flex flex-column flex-sm-row">
          <v-avatar class="ma-3" :size="imageHeight" height="175px" tile>
            <v-img :src="article.cover"></v-img>
          </v-avatar>

          <v-row dense>
            <v-col :cols="12">
              <v-card-title class="headline">
                <v-icon color="error">mdi-arrow-up-bold-circle-outline</v-icon>{{article.title}}
              </v-card-title>

              <v-card-subtitle v-text="article.description"></v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{ article.created_at }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-2" color="secondary" outlined @click="onCateClick(article.category_id)">
                  <v-icon left>mdi-menu</v-icon>
                  分类：{{ article.category.name }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="tertiary" outlined v-if="article.topic" @click="onTopicClick(article.topic.name)">
                  <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
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
        disabled: false,
        href: '/',
        link: true,
        text: "首页",
      }
    ],
    articles: [],
    current_page: 1,
    page_count: 1,
    per_page_count: 20,
    breadcrumbs_show: false,
    topic_show: false,
    tag_show: false,
    filters: {
      topic: null,
      tag: null,
    }
  }),
  mounted() {
    if (this.$route.params.cate) {
      let breadcrumb_name = null;
      this.$store.state.menus.filter((menu) => {
        if (menu.id === Number(this.$route.params.cate)) {
          breadcrumb_name = menu.name;
        }
      })
      this.breadcrumbs.push({
        disabled: true,
        href: '/cate/' + this.$route.params.cate,
        link: true,
        text: breadcrumb_name
      })
    }
    this.current_page = this.$route.params.page ? Number(this.$route.params.page) : 1;
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
      this.breadcrumbs_show = !!this.$route.params.cate;
      this.filters.topic = this.$route.query.topic;
      this.filters.tag= this.$route.query.tag;
      let params = {
        menu_id : this.$route.params.cate,
        topic_name: this.$route.query.topic,
        tag_name: this.$route.query.tag,
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
      let rt = {};
      rt['name'] = this.$route.name === '/' ? 'index' : this.$route.name;
      rt['params'] = {};
      rt['params']['page'] = page;
      this.$router.push(rt);
    },
    onCateClick(category_id) {
      if (Number(this.$route.params.cate) === category_id) {
          return
      }
      let rt = {};
      rt['name'] = 'cate';
      rt['params'] = {};
      rt['params']['cate'] = category_id;
      rt['params']['page'] = 1;
      this.$router.push(rt);
    },
    onTopicClick(topic_name) {
      let rt = {
        name: 'index',
        query: {
          topic: topic_name
        }
      };
      this.$router.push(rt);
    }
  }
};
</script>