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
            :particleSize="2"
            linesColor="#33b1f8"
            :linesWidth="2"
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
        <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md8 lg8>
                <v-layout justify-center wrap >
                <v-flex column wrap >
                    <div class="blog-title">{{ title }}</div>
                    <div class="slogan d-none d-lg-block" v-html="slogan"></div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>

        <template v-slot:extension>
            <v-layout justify-center row wrap >
                <v-flex xs12 sm12 md8 lg8>
                    <v-tabs
                        v-model="tab"
                        align-with-title
                        background-color="secondary"
                        @change="onTabChange"
                        show-arrows
                    >
                        <v-tabs-slider color="tertiary"></v-tabs-slider>

                        <v-tab v-for="(item,index) in menus" :key="index">
                        {{ item.name }}
                        </v-tab>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </template>
    </v-app-bar>
</template>
<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)
export default {
    components: {
        
    },
    data() {
        return {
            title: 'JALEN博客',
            slogan: "他沉默，什么都不说，随手写下一行 <code>Hello,World!</code>",
            menus: [
                {
                    id: 0,
                    name: '首页',
                    url: '',
                    children: [],
                }
            ],
            tab: null
        }
    },
    mounted() {
        console.log(this.$vuetify.theme.currentTheme);
    },
    methods: {
        onTabChange(index) {
            console.log(index)
        }
    }
}
</script>
<style scoped lang=sass>
.blog-title {
  font-size: 30px;
  color: var(--v-tertiary-lighten1);
}
.slogan {
    color: var(--v-tertiary-lighten1);
}
#particles-js {
    position: absolute;
    background-color: var(--v-secondary-darken3);
    left: 0;
    right: 0;
    top: -80px;
    bottom: 0;
    z-index: -1;
    height: 248px;
}
</style>