import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: { UserTypeId: "2" }
    },
    mutations: {
        changeUserInfo: (s, i) => { //同步修改用户信息
            s.userInfo = i;
        },
    },
    actions: {
        changeUserInfo: (c, i) => { //异步修改用户信息
            c.commit('changeUserInfo', i)
        }
    },
    modules: {}
})