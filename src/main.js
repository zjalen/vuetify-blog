import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import { mockXHR } from './mock'
// 通过环境变量来判断是否需要加载启用 mockjs
if (process.env.VUE_APP_MOCK === "1") {
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
