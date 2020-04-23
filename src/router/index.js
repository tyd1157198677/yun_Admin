import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home' //这里用重定向设置默认选中的路由,即点击'/'路径时把'/about' 替换为'/'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      //权限管理on
      {
        path: 'permission', 
        name: 'permission',
        component: () => import('@/views/permission/RoleMangement.vue'),
        meta: {
          title: '用户管理'
        },
        redirect: 'permission/ManagementRole',
        children: [
          {
            path: 'ManagementRole', 
            name: 'ManagementRole',
            component: () => import('@/views/permission/ManagementRole.vue'),
            meta: {
              title: '角色管理'
            },
          },
          {
            path: 'ManagementStaff', 
            name: 'ManagementStaff',
            component: () => import('@/views/permission/ManagementStaff.vue'),
            meta: {
              title: '员工管理'
            },
          },
          {
            path: 'addRole', //添加角色
            name: 'AddRole',
            component: () => import('@/views/permission/AddRole.vue'),
            meta: {
              title: '添加角色'
            },
          },
          {
            path: 'AddStaff', //添加角色
            name: 'AddStaff',
            component: () => import('@/views/permission/AddStaff.vue'),
            meta: {
              title: '添加员工'
            },
          },
        ],
      },
      
      
      //权限管理off


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
              title: '用户列表'
            },
          },
          {
            path: 'userDetail', //用户详情
            name: 'userDetail',
            component: () => import('@/views/customer/UserDetail.vue'),
            meta: {
              title: '用户详情'
            },
    
          },
          {
            path: 'AddEmployees', 
            name: 'AddEmployees',
            component: () => import('@/views/customer/AddEmployees.vue'),
            meta: {
              title: '添加员工'
            },
          },
          {
            path: 'AddUser', 
            name: 'AddUser',
            component: () => import('@/views/customer/AddUser.vue'),
            meta: {
              title: '添加用户'
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