import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
// let val= sessionStorage.getItem('addOredite')
Vue.use(VueRouter)

//组件很多的时候，你会发现你的页面在首次加载的时候，异常的慢
//所以组件实现按需加入使用require(['@/views/permission/RoleMangement'], res),
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: Login,
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
                component: (res) =>
                require(['@/views/permission/RoleMangement'], res),
                    // import ('@/views/permission/RoleMangement.vue'),
                meta: {
                    title: '权限管理'
                },
                redirect: 'permission/ManagementRole',
                children: [{
                        path: 'ManagementRole',
                        name: 'ManagementRole',
                        component: (res) =>
                        require(['@/views/permission/ManagementRole'], res),
                            // import ('@/views/permission/ManagementRole.vue'),
                        meta: {
                            title: '角色管理',
                            btnPermissions: [1, 2]
                        },
                    },
                    {
                        path: 'ManagementStaff',
                        name: 'ManagementStaff',
                        component: (res) =>
                        require(['@/views/permission/ManagementStaff'], res),
                            // import ('@/views/permission/ManagementStaff.vue'),
                        meta: {
                            title: '员工管理',
                            btnPermissions: ["1", "2"],
                        },
                    },
                    {
                        path: 'addRole', //添加角色
                        name: 'AddRole',
                        component: (res) =>
                        require(['@/views/permission/AddRole'], res),
                            // import ('@/views/permission/AddRole.vue'),
                        meta: {
                            title: '添加角色',
                            btnPermissions: [1],
                        },
                    },
                    {
                        path: 'AddStaff', //添加角色
                        name: 'AddStaff',
                        component: (res) =>
                        require(['@/views/permission/AddStaff'], res),
                            // import ('@/views/permission/AddStaff.vue'),
                        meta: {
                            title: '添加员工',
                            btnPermissions: ["1", "2"],
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
                component: (res) =>
                    require(['@/views/customer/ManagementCustomer'], res),
                    // import ('@/views/customer/ManagementCustomer.vue'),
                meta: {
                    title: '客户管理'
                },
                redirect: 'customer/userList',
                children: [{
                        path: 'userList', //用户列表
                        name: 'userList',
                        component: (res) =>
                        require(['@/views/customer/UserList'], res),
                            // import ('@/views/customer/UserList.vue'),
                        meta: {
                            title: '用户管理',
                            btnPermissions: ['1'],
                        },
                    },
                    {
                        path: 'userDetail', //用户详情
                        name: 'userDetail',
                        component: (res) =>
                        require(['@/views/customer/UserDetail'], res),
                            // import ('@/views/customer/UserDetail.vue'),
                        meta: {
                            title: '用户详情',
                            btnPermissions: ['1', '2'],
                        },
                    },
                    {
                        path: 'AddEmployees',
                        name: 'AddEmployees',
                        component: (res) =>
                        require(['@/views/customer/AddEmployees'], res),
                            // import ('@/views/customer/AddEmployees.vue'),
                        meta: {
                            title: '添加员工',
                            btnPermissions: ['1', '2'],
                        },
                    },
                    {
                        path: 'AddUser',
                        name: 'AddUser',
                        component: (res) =>
                        require(['@/views/customer/AddUser'], res),
                            // import ('@/views/customer/AddUser.vue'),
                        meta: {
                            title: '添加用户',
                            btnPermissions: ['1', '2'],
                            }
                    },
                    {
                        path: 'AgentMangement',
                        name: 'AgentMangement',
                        component: (res) =>
                        require(['@/views/customer/AgentMangement'], res),
                            // import ('@/views/customer/AgentMangement.vue'),
                        meta: {
                            title: '代理商管理',
                            btnPermissions: ['1', '2', '3'],
                        }
                    },
                    {
                        path: 'TeacherMangement',
                        name: 'TeacherMangement',
                        component: (res) =>
                        require(['@/views/customer/TeacherMangement'], res),
                            // import ('@/views/customer/TeacherMangement.vue'),
                        meta: {
                            title: '讲师管理',
                            btnPermissions: ['1', '2'],
                        }
                    },
                    {
                        path: 'PresidentMangement',
                        name: 'PresidentMangement',
                        component: (res) =>
                        require(['@/views/customer/PresidentMangement'], res),
                            // import ('@/views/customer/PresidentMangement.vue'),
                        meta: {
                            title: '总裁管理',
                            btnPermissions: ['1', '2'],
                        }
                    },
                    {
                        path: 'PromoterMangement',
                        name: 'PromoterMangement',
                        component: (res) =>
                        require(['@/views/customer/PromoterMangement'], res),
                            // import ('@/views/customer/PromoterMangement.vue'),
                        meta: {
                            title: '推广员管理',
                            btnPermissions: ['3'],
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