<template>
    <v-app-bar
      height="120px"
      elevation="0"
    >
        <vue-particles 
            id="particles-js"
            color="#83d2f8"
            :particleOpacity="0.5"
            :particlesNumber="88"
            shapeType="circle"
            :particleSize="1"
            linesColor="#33b1f8"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.3"
            :linesDistance="150"
            :moveSpeed="1"
            :hoverEffect="true"
            hoverMode="null"
            :clickEffect="false"
            clickMode="push"
        >
        </vue-particles>
        <v-container class="px-0 px-md-3" style="max-width: 1185px;">
            <v-layout justify-center wrap >
                <v-flex column wrap >
                    <div class="blog-title">{{ title }}</div>
                    <div class="slogan d-none d-sm-block" v-html="slogan"></div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </v-layout>
        </v-container>

        <template v-slot:extension>
            <v-container class="px-0 px-md-3" style="max-width: 1185px;">
                <v-tabs
                    v-model="tab"
                    align-with-title
                    :background-color="$vuetify.theme.currentTheme.secondary.lighten1"
                    @change="onTabChange"
                    show-arrows
                >
                    <v-tabs-slider color="primary"></v-tabs-slider>

                    <v-tab v-for="(menu,index) in $store.state.menus" :key="index">
                    {{ menu.name }}
                    </v-tab>
                </v-tabs>
            </v-container>
        </template>
    </v-app-bar>
</template>
<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)
import { getMenus } from '../../api'

export default {
    components: {
        
    },
    data() {
        return {
            title: 'JALEN博客',
            slogan: "他沉默，什么都不说，随手写下一行 <code>Hello,World!</code>",
        }
    },
    mounted() {
        getMenus().then(response => {
            let menus = response.data;
            this.$store.commit('setMenus', menus);
        })
    },
    computed: {
        tab: {
            get () {
                let current_menu = this.$route.params.cate ? Number(this.$route.params.cate) : 0;
                return current_menu;
            },
            set () {

            }
        }
    },
    methods: {
        onTabChange(index) {
            // console.log(index);
            if (!this.$route.params.cate && index === 0) {
                return
            }
            if (Number(this.$route.params.cate) === index) {
                return
            }
            let menus = this.$store.state.menus;
            let menu = null;
            menus.filter((item) => {
                if (item.id === index) {
                    menu = item;
                }
            });
            if (menu.url === 'about' || menu.url === 'link') {
                this.$router.push({path: menu.url});
                return
            }
            if (this.$route.params.cate !== menu.id) {
                let rt = {};
                if (menu.id === 0) {
                    rt['name'] = 'index';
                    rt['params'] = {};
                    rt['params']['cate'] = menu.id;
                    rt['params']['page'] = 1;
                } else {
                    rt['name'] = 'cate';
                    rt['params'] = {};
                    rt['params']['cate'] = menu.id;
                    rt['params']['page'] = 1;
                }
                this.$router.push(rt);
            }
        }
    }
}
</script>
<style scoped lang=sass>
.blog-title {
  font-size: 30px;
  color: var(--v-primary-base);
}
.slogan {
    color: var(--v-primary-lighten3);
}
#particles-js {
    position: absolute;
    background-color: var(--v-secondary-base);
    left: 0;
    right: 0;
    top: -80px;
    bottom: 0;
    z-index: -1;
    height: 248px;
}
.v-toolbar__extension {
    padding: 0 !important;
}
</style>