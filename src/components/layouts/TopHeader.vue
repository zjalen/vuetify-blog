<template>
    <div
  >
  <v-navigation-drawer
      v-model="drawer"
      class="secondary darken-3"
      width="40%"
      absolute
      right
      temporary
    >
      <v-list dense>
          <v-list-item-group v-model="current_menu" color="secondary lighten-4">
            <v-list-item link
                v-for="(menu,index) in $store.state.menus" 
                :key="index"  
                elevation="0"
                @click="onTabClick(index)">
            <v-list-item-content>
                <v-list-item-title class="secondary--text text--lighten-4">{{ menu.name }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
        <v-container style="max-width: 1185px;">
            <v-layout justify-center align-center wrap >
                <v-flex column wrap >
                    <div class="blog-title">{{ title }}</div>
                    <div class="slogan d-none d-sm-block" v-html="slogan"></div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn small icon>
                    <v-icon>mdi-github-circle</v-icon>
                </v-btn>
                <v-btn
                    icon
                    small
                    class="ml-2 d-block d-md-none"
                    @click.stop="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </v-layout>
        </v-container>

        <template v-slot:extension>
            <v-container style="max-width: 1185px;" class="px-3 py-0 my-0">
                <v-toolbar-items class="d-sm-block d-none secondary darken-3" style="height: 48px;" >
                    <v-btn 
                        middle
                        v-for="(menu,index) in $store.state.menus" 
                        :key="index"
                        :text="menu.id !== current_menu"
                        :class="menu.id !== current_menu ? `secondary darken-3` : `secondary darken-1`"
                        elevation="0"
                        @click="onTabClick(index)">
                        {{ menu.name }}
                    </v-btn>
                </v-toolbar-items>
                <div class="slogan d-block d-sm-none" v-html="slogan"></div>
                <!-- <v-tabs
                    v-model="current_menu"
                    align-with-title
                    :background-color="$vuetify.theme.currentTheme.secondary.lighten1"
                    @change="onTabChange"
                    show-arrows
                >
                    <v-tabs-slider color="primary"></v-tabs-slider>

                    <v-tab v-for="(menu,index) in $store.state.menus" :key="index"  @on-item-click="onTabClick(index)">
                    {{ menu.name }}
                    </v-tab>
                </v-tabs> -->
            </v-container>
        </template>
    </v-app-bar>
    </div>
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
            slogan: "他沉默，随手写下一行 <code>Hello</code>, <code>World</code>!",
            current_menu: 0,
            drawer: false,
        }
    },
    mounted() {
        getMenus().then(response => {
            let menus = response.data;
            this.$store.commit('setMenus', menus);
            this.switchMenu()
        })
    },
    watch: {
        "$route":"switchMenu"
    },
    computed: {
        // tab: {
        //     get () {
        //         let current_menu = this.$route.params.cate ? Number(this.$route.params.cate) : 0;
        //         return current_menu;
        //     },
        //     set (value) {
        //         console.log(value);
        //         this.onMenuClick(value);
        //     }
        // }
    },
    methods: {
        switchMenu() {
            this.current_menu = this.$route.params.cate ? Number(this.$route.params.cate) : 0;
            let page = this.$route.params.page;
            if (page) {
                this.$store.getters.menus.forEach(menu => {
                    if (menu.type === 'page' && menu.url.indexOf(page) > -1) {
                        this.current_menu = menu.id;
                        return;
                    }
                })
            }
        },
        onTabClick(index) {
            this.onMenuClick(index);
        },
        onTabChange(index) {
            this.onMenuClick(index);
        },
        onMenuClick(index) {
            if (index === this.current_menu) {
                return
            }
            let menus = this.$store.state.menus;
            let menu = null;
            menus.filter((item) => {
                if (item.id === index) {
                    menu = item;
                }
            });
            if (menu.type === 'page') {
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
</style>