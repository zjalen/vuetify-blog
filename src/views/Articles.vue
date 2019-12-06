<template>
  <v-row dense>
    <v-col v-if="breadcrumbs_show" cols="12">
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    </v-col>
    <v-col v-if="filters.topic || filters.tag" cols="12" class="pb-3">
      <v-btn small class="mr-3" v-if="filters.topic" outlined color="tertiary" @click="$router.push({name: '/'})">
        <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
          {{filters.topic}}
        <v-icon right>mdi-close</v-icon>
      </v-btn>
      <v-btn small v-if="filters.tag" outlined color="info" @click="$router.push({name: '/'})">
        <v-icon left>mdi-tag-outline</v-icon>
          {{filters.tag}}
        <v-icon right>mdi-close</v-icon>
      </v-btn>
    </v-col>
    <v-col v-for="(article, i) in articles" :key="i" cols="12">
      <v-skeleton-loader
        ref="skeleton"
        height="200"
        :loading="loading"
        type="article, actions"
        class="mx-auto"
      >
        <v-card outlined hover @click="toArticle(article.category_id, article.id)">
          <div class="d-flex flex-column flex-sm-row">
            <v-avatar class="ma-3" :size="imageHeight" height="175px" tile>
              <v-img :src="article.cover"></v-img>
            </v-avatar>

            <v-row dense>
              <v-col :cols="12" class="pt-3">
                <div class="headline px-4">
                  <span class="error--text">[TOP] </span>{{article.title}}
                </div>

                <v-card-subtitle v-text="article.description"></v-card-subtitle>
                <v-card-text class="text--primary">
                  <div class="d-flex flex-row"><v-icon class="body-2" left>mdi-clock-outline</v-icon>{{ article.created_at }}</div>
                </v-card-text>

                <v-card-actions class="d-flex flex-sm-row flex-column-reverse align-start">
                  <v-btn small class="ma-2" color="secondary" outlined @click="onCateClick(article.category_id)">
                    <v-icon left>mdi-menu</v-icon>
                    分类：{{ article.category.name }}
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn small class="ma-2" color="tertiary" outlined v-if="article.topic" @click="onTopicClick(article.topic.name)">
                    <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
                    主题：{{article.topic.name}}
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-skeleton-loader>
    </v-col>

    <v-col cols="12">
      <v-card v-if="articles.length < 1" outlined>
        <v-card-title class="headline">
          没找到相关文章，请您查阅其他内容。
        </v-card-title>
      </v-card>
      <v-pagination
        v-model="current_page"
        :length="page_count"
        color="secondary"
        total-visible="10"
        v-if="articles.length > 1"
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
        href: '/#/',
        link: true,
        text: "首页",
      }
    ],
    loading: true,
    articles: [{
      category: {id: null, name: ""},
      category_id: null,
      cover: '',
      created_at: '',
      description: '',
      id: '',
      is_top: false,
      title: '',
      topic: {id: null, name: ""},
      topic_id: null,
    }],
    current_page: 1,
    page_count: 0,
    per_page_count: 10,
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
        href: '/#/cates/' + this.$route.params.cate,
        link: true,
        text: breadcrumb_name
      })
    }
    this.current_page = this.$route.query.page ? Number(this.$route.query.page) : 1;
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
        category_id : this.$route.params.cate === 0 ? null : this.$route.params.cate,
        topic_name: this.$route.query.topic,
        tag_name: this.$route.query.tag,
        limit: this.per_page_count,
        skip: (this.current_page - 1) * this.per_page_count
      };
      getArticles(params).then(response => {
        setTimeout(()=> {
          this.loading = false;
          this.articles = response.data.articles;
          if (this.articles.length > 0) {
            this.page_count = Math.ceil(response.data.count / this.per_page_count);
          }
        },500);
      });
    },
    onPageChange(page) {
      let rt = {};
      rt['name'] = this.$route.name === '/' ? 'index' : this.$route.name;
      rt['params'] = {};
      rt['query']['page'] = page;
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
      rt['query']['page'] = 1;
      this.$router.push(rt);
    },
    onTopicClick(topic_name) {
      let rt = {
        name: '/',
        query: {
          topic: topic_name
        }
      };
      this.$router.push(rt);
    },
    toArticle(cate_id, article_id) {
        this.$router.push({
          name: 'article',
          params: { cate: cate_id, id: article_id }
        })
    }
  }
};
</script>