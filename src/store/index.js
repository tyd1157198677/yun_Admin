import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: { UserTypeId: sessionStorage.getItem("userinfo") || {}||[] }
    },
    getters:{
        getuserinfo: (state) => state.userinfo.UserTypeId,
    },
    mutations: {
        changeUserInfo: (s, i) => { //同步修改用户信息
            sessionStorage.setItem('userinfo', i);//将传递的数据先保存到sessionStorage中
            s.userinfo.UserTypeId = i;// 之后才是修改state中的状态
        },
    },
    actions: {
        changeUserInfo: ({commit}, i) => { //异步修改用户信息
            commit('changeUserInfo', i)
        }
    },
    modules: {}
})