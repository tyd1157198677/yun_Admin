import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' 
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component:Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    },
    redirect: 'home/customer',
    children: [
      //权限管理on
      {
        path: 'permission', 
        name: 'permission',
        component: () => import('@/views/permission/RoleMangement.vue'),
        meta: {
          title: '权限管理'
        },
        redirect: 'permission/ManagementRole',
        children: [
          {
            path: 'ManagementRole', 
            name: 'ManagementRole',
            component: () => import('@/views/permission/ManagementRole.vue'),
            meta: {
              title: '角色管理',
              btnPermissions:["1","2"],
            },
          },
          {
            path: 'ManagementStaff', 
            name: 'ManagementStaff',
            component: () => import('@/views/permission/ManagementStaff.vue'),
            meta: {
              title: '员工管理',
              btnPermissions:[1],
            },
          },
          {
            path: 'addRole', //添加角色
            name: 'AddRole',
            component: () => import('@/views/permission/AddRole.vue'),
            meta: {
              title: '添加角色',
              btnPermissions:[1],
            },
          },
          {
            path: 'AddStaff', //添加角色
            name: 'AddStaff',
            component: () => import('@/views/permission/AddStaff.vue'),
            meta: {
              title: '添加员工',
              btnPermissions:["1","2"],
            },
          },
        ],
      },
      //权限管理off
//这是什么呢，其实我也不知道
      //客户管理on
      {
        path: 'customer', //用户管理
        name: 'customer',
        component: () => import('@/views/customer/ManagementCustomer.vue'),
        meta: {
          title: '用户管理'
        },
        redirect: 'customer/userList',
        children: [
          {
            path: 'userList', //用户列表
            name: 'userList',
            component: () => import('@/views/customer/UserList.vue'),
            meta: {
              title: '用户列表',
              btnPermissions:['1','2','3'],
            },
          },
          {
            path: 'userDetail', //用户详情
            name: 'userDetail',
            component: () => import('@/views/customer/UserDetail.vue'),
            meta: {
              title: '用户详情',
              btnPermissions:['1','2'],
            },
    
          },
          {
            path: 'AddEmployees', 
            name: 'AddEmployees',
            component: () => import('@/views/customer/AddEmployees.vue'),
            meta: {
              title: '添加员工',
              btnPermissions:['1','2'],
            },
          },
          {
            path: 'AddUser', 
            name: 'AddUser',
            component: () => import('@/views/customer/AddUser.vue'),
            meta: {
              title: '添加用户',
              btnPermissions:['1','2'],
            }
          },
          {
            path: 'AgentMangement', 
            name: 'AgentMangement',
            component: () => import('@/views/customer/AgentMangement.vue'),
            meta: {
              title: '代理商管理',
              btnPermissions:['1','2','3'],
            }
          },
          {
            path: 'TeacherMangement', 
            name: 'TeacherMangement',
            component: () => import('@/views/customer/TeacherMangement.vue'),
            meta: {
              title: '讲师管理',
              btnPermissions:['1','2'],
            }
          },
          {
            path: 'PresidentMangement', 
            name: 'PresidentMangement',
            component: () => import('@/views/customer/PresidentMangement.vue'),
            meta: {
              title: '总裁管理',
              btnPermissions:['1','2'],
            }
          },
          {
            path: 'PromoterMangement', 
            name: 'PromoterMangement',
            component: () => import('@/views/customer/PromoterMangement.vue'),
            meta: {
              title: '推广员管理',
              btnPermissions:['1'],
            }
          }
        ],
      },
      
      //客户管理off
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router