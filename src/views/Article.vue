<template>
    <v-row dense>
        <v-col cols="12">
            <v-skeleton-loader
                class="mx-auto"
                :loading="loading"
                type="article">
                <v-card>
                    <div class="text-center font-regular headline pa-4">
                        {{article.title}}
                    </div>
                    <div class="text-right font-weight-light body-1 pt-3 pr-3">
                        <v-icon left>mdi-clock-outline</v-icon>{{article.created_at}}
                    </div>
                    <v-col v-if="article.topic || article.category" cols="12" class="d-flex flex-sm-row flex-column-reverse">
                        <v-btn small v-if="article.topic" class="mb-2" outlined color="tertiary" @click="onTopicClick(article.topic.name)">
                            <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
                            主题：{{article.topic.name}}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small v-if="article.category" class="mb-2" outlined color="secondary" @click="$router.push({name: 'cate', params: {id: article.category.id}})">
                            <v-icon left>mdi-file-document-box-multiple-outline</v-icon>
                            分类：{{article.category.name}}
                        </v-btn>
                    </v-col>
                    <v-divider class="ma-3"></v-divider>

                    <div class="pa-3 md" v-html="article.content_html">
                    </div>
                    <!-- <my-mark-down class="pa-3" :text="article.content_md"> </my-mark-down> -->
                    <!-- <mavon-editor 
                        class="pa-3" 
                        v-model="article.content_md" 
                        :ishljs="true" 
                        codeStyle="androidstudio" 
                        :subfield="false" 
                        defaultOpen="preview" 
                        :toolbarsFlag="false" 
                        :boxShadow="false" >
                    </mavon-editor> -->

                    <v-divider class="ma-3"></v-divider>
                    <div class="pa-3">
                        原创文章，可以转载，但请注明出处，谢谢合作。Jalen的博客 (<a href="/">https://www.jalen.top</a>)
                    </div>
                    <div class="pa-3">
                        标签：
                        <v-btn 
                        v-for="tag in article.tags" 
                        :key="tag.tag_id" 
                        class="mr-1 my-3"
                        small 
                        color="info" 
                        outlined 
                        @click="onTagClick(tag.name)">
                            <v-icon left>mdi-tag-outline</v-icon>{{tag.name}}
                        </v-btn>
                    </div>
                    <v-divider class="ma-3"></v-divider>

                    <v-col cols="12" class="d-flex flex-sm-row flex-column-reverse">
                        <v-btn style="overflow: hidden" small color="secondary" rounded v-if="article.last" class="mb-2" outlined @click="toArticle(article.last)">
                            <v-icon left>mdi-chevron-left</v-icon>
                            上一篇：{{prev_title}}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn style="overflow: hidden" color="secondary" small rounded v-if="article.next" class="mb-2" outlined @click="toArticle(article.next)">
                            下一篇：{{next_title}}
                            <v-icon right>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-col>
                </v-card>
            </v-skeleton-loader>
        </v-col>
        <my-image-viewer :showImg="showImgView" @hideImg="hideImg" :imgSrc="imgSrc"></my-image-viewer>
    </v-row>
</template>

<script>
// import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/androidstudio.css'  //导入代码高亮样式
// import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

import { getArticle } from '../api'

// import MyMarkDown from '../components/MyMarkDown';
// import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';
import MyImageViewer from '../components/MyImageViewer'

export default {
    components: {
        // mavonEditor
        // MyMarkDown
        MyImageViewer
    },
    data() {
        return {
            article: {},
            imgSrc: null,
            showImgView: false,
            loading: true
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.init(id);
    },
    computed: {
        prev_title() {
            let title = this.article.last ? this.article.last.title : null;
            return title.length > 16 ? title.substr(0,16)+'...' : title;
        },
        next_title() {
            let title = this.article.next ? this.article.next.title : null;
            return title.length > 16 ? title.substr(0,16)+'...' : title;
        }
    },
    methods: {
        init(id) {
            getArticle(id).then(response => {
                setTimeout(() => {
                    this.loading = false;
                    this.article = response;
                    this.$nextTick(function() {
                        let blocks = document.querySelectorAll("pre code");
                        blocks.forEach((block) => {
                            block.innerHTML = block.innerHTML.slice(0,-1)
                        });
                        this.addImgClickEvent();
                    });
                }, 500);
            })
        },
        onTagClick(tag_name) {
            this.$router.push({
                name: 'index',
                params: {
                    page: 1,
                },
                query: {
                    tag: tag_name
                }
            })
        },
        onTopicClick(topic_name) {
            let rt = {
                name: 'index',
                params: {
                    page: 1,
                },
                query: {
                topic: topic_name
                }
            };
            this.$router.push(rt);
        },
        toArticle(article) {
            let rt = {
                name: 'article',
                params: {
                    cate: article.category.id,
                    id: article.id
                }
            };
            this.$router.push(rt);
        },
        hideImg() {
            this.showImgView = false;
        },
        addImgClickEvent(){
            let objs = document.getElementsByTagName("img");
            objs.forEach(obj => {
                obj.onclick = ()=>{
                    this.showImgView = true;
                    this.imgSrc = obj.src;
                }
            })
        }
    }
}
</script>
<style lang=sass scoped>
.v-note-wrapper {
    z-index: 1 !important;
}
</style>