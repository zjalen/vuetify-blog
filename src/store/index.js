import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 这里放全局参数
        mounting: false,
        loading: false,
    },

    mutations: {
        // 这里是同步 set 方法，通过 commit 方式触发 this.$store.commit('setToken', token)
        setMounting(state, status) {
            state.mounting = status
        },
        setLoading(state, status) {
            state.loading = status
        }
    },

    getters: {
        // 这里是get方法
        mounting: state => state.app.mounting,
        loading: state => state.app.loading,
    },

    actions: {
        // 这里是异步方法，可以在组件中使用 this.$store.dispatch('actionSetUserInfo', user_info) 分发调用 mutation 方法进行 set
        actionSetMounting({ commit }, status) {
            commit('setMounting', status)
        },
        actionSetLoading({ commit }, status) {
            commit('setLoading', status)
        },
    },

    modules: {
        // 分组模块，当 state 参数过多可以单独分组建立文件，从这里引入
    }
})