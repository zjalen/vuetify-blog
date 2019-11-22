<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(article, i) in articles"
          :key="i"
          cols="12"
        >
          <v-card
            color="primary"
            outlined
            hover
          >
            <div class="d-flex flex-column flex-sm-row">
              <v-avatar
                class="ma-3"
                :size="imageHeight"
                height="175px"
                tile
              >
                <v-img :src="article.cover"></v-img>
              </v-avatar>

              <v-row dense>
                <v-col :cols="12">
                    <v-card-title
                      class="headline"
                      v-text="article.title"
                    ><span class="is_top" v-if="article.is_top">「置顶」</span></v-card-title>

                    <v-card-subtitle v-text="article.description"></v-card-subtitle>
                    <v-card-text class="text--primary">
                      <div>{{ article.created_at }}</div>
                    </v-card-text>

                    <v-card-actions>
                      
                      <v-btn
                        class="ma-2"
                        color="secondary"
                        outlined
                      >
                        <v-icon left>mdi-pencil</v-icon> 分类：{{ article.category.name }}
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="ma-2"
                        color="secondary accent-4"
                        outlined
                        v-if="article.topic"
                      >
                        <v-icon left>mdi-pencil</v-icon> 主题：{{article.topic.name}}
                      </v-btn>
                      
                    </v-card-actions>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import { getArticles } from '../api'
export default {
  data: () => ({
    items: [],
    articles: [],
  }),
  mounted() {
    this.init();
  },
  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'auto'
      }
      return '175'
    },
  },
  methods: {
    init() {
      getArticles().then(response => {
        console.log(response);
        this.articles = response.data.articles;
      })
    }
  }
}
</script>