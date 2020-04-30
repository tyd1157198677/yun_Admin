import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import has from './directive/btnPermissions.js';//自定义指令
import 'normalize.css/normalize.css'
import 'ant-design-vue/dist/antd.css';
// import moment from 'moment/moment'
import echarts from 'echarts'

//ant组件按需引入
import {Checkbox,Button,Alert,Layout,message,Dropdown,Menu,Select,Input,Col,Row,Table,Icon,Tabs,Tag,Divider,Form,FormModel,Pagination,Breadcrumb,Tree,Empty,Modal,Radio,DatePicker,Switch,Cascader,Avatar} from 'ant-design-vue';
axios.defaults.baseURL = "https://www.kchuangqi.com/Api/"
// Vue.prototype.GLOBALURL1 = "https://www.kchuangqi.com/Api/";
Vue.prototype.$http = axios;
Vue.prototype.$message = message;
Vue.prototype.$echarts = echarts;

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Input)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Pagination)
Vue.use(Breadcrumb)
Vue.use(Tree)
Vue.use(Empty)
Vue.use(Modal)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Cascader)
Vue.use(Avatar)
Vue.use(Tabs)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(Alert) 
Vue.config.productionTip = false
// Vue.use(Antd)

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
//路由拦截器
router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
  next();
  }else if(sessionStorage.userId){
    next()
  }else{
    // next()
      next({ path: '/login',query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
     })
  }
})
//全局时间过滤
Vue.filter('dateFormat', function (dateStr, pattern = "") {
  // 根据给定的时间字符串，得到特定的时间
  var dt = new Date(dateStr)
  //   yyyy-mm-dd
  var y = dt.getFullYear()
  var m = dt.getMonth() + 1
  var d = dt.getDate()
  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else {
    var hh = dt.getHours()
    var mm = dt.getMinutes()
    var ss = dt.getSeconds()

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
})
new Vue({
  router,
  store,
  has,
  computed: mapState([
    'userinfo'
  ]),
  render: h => h(App)
}).$mount('#app')
