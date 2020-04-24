<template>
  <a-layout class="home">
    <!-- <a-layout-sider class="aside" :width="navWidth" :trigger="null" collapsible v-model="collapsed"> -->
    <a-layout-sider class="aside" width="208px" :trigger="null" collapsible v-model="collapsed">
      <div class="logo">创骐云课堂</div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="selectBtn">
        <!-- 权限管理 -->
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="mail" />
            <span>权限管理</span>
          </span>
          <a-menu-item key="1-1">角色管理</a-menu-item>
          <a-menu-item key="1-2">员工管理</a-menu-item>
          <!-- 备用三级菜单 -->
          <!-- <a-sub-menu key="sub3" title="备用三级菜单">
            <a-menu-item key="1-1-1">选项1</a-menu-item>
            <a-menu-item key="1-1-2">选项2</a-menu-item>
          </a-sub-menu>-->
        </a-sub-menu>

        <!-- 客户管理 -->
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="mail" />
            <span>客户管理</span>
          </span>
          <a-menu-item key="2-1">用户管理</a-menu-item>
          <a-menu-item key="2-2">代理商管理</a-menu-item>
          <a-menu-item key="2-3">讲师管理</a-menu-item>
          <a-menu-item key="2-4">总裁管理</a-menu-item>
          <a-menu-item key="2-5">推广员管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <!-- 头部信息 -->
    <a-layout class="header">
      <a-layout-header class="path_bar" height="56px">
        <!-- 面包屑 -->
        <div class="header_content">
          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item
              v-for="(item, index) in breadList"
              :key="item.name"
              style="color:rgba(48,49,51,1);"
            >
              <router-link
                v-if="item.name != name && index != 1"
                :to="{ path: item.path === '' ? '/' : item.path }"
              >{{ item.meta.title }}</router-link>
              <span v-else>{{ item.meta.title }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <!-- 用户登录状态 右上角-->
        <div class="header_right">
          <a-icon type="mail" :style="{ fontSize: '16px', color: '#333' }" />
          <a-avatar
            style="backgroundColor:#F5F7FA;margin: 0 5px"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <a-dropdown  :trigger="['click']">
            <a-icon type="caret-down" @click="e => e.preventDefault()" />
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">1st menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">2nd menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">3rd menu item</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <!-- </div> -->
      </a-layout-header>

      <!-- 展示信息页面 -->
      <a-layout-content id="main">
        <!-- 这是主页面 -->
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  components: {},
  data() {
    
    return {
      
      routers: "", //面包屑路径
      collapsed: false,
      
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    //路由选择
    selectRouter(currentKey) {
      let routerObj = {
        "1-1": { name: "ManagementRole" }, //角色管理
        "1-2": { name: "ManagementStaff" }, //员工管理
        "2-1": { name: "userList" }, //用户管理
        "2-2": { name: "AgentMangement" },//代理商管理
        "2-3": { name: "TeacherMangement" },//讲师管理
        "2-4": { name: "PresidentMangement" },//总裁管理
        "2-5": { name: "PromoterMangement" },//推广员管理
      };
      routerObj[currentKey] ? this.jumpRouter(routerObj[currentKey]) : false;
    },
    //路由跳转
    jumpRouter(path) {
      this.$router.push(path);
    },
    //获取选项的key值
    selectBtn(e) {
      let currentKey = e.key;
      this.selectRouter(currentKey);
    },
    //面包屑跳转
    getBreadcrumb() {
      this.breadList = [];
      this.name = this.$route.name; //当前路由的名字，开始为home
      // console.log(this.$route.name);
      this.$route.matched.forEach(item => {
        this.breadList.push(item); //将层级路由的路径放入数组breadList中
      });
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ant-layout-content{
  flex:none
}
.home {
  width: 100%;
  height: 100%;
  .aside {
    height: 100%;
    width: 208px !important;
    .logo {
      text-align: center;
      margin: 16px;
      height: 30px;
      font-size: 22px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
    }
  }
  .header {
    .ant-layout-header {
      height: 56px;
      line-height: 56px;
    }
    .path_bar {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      line-height: 56px;
      .header_content {
        line-height: 56px;
        padding-top: 20px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(48, 49, 51, 1);
      }
      .header_right {
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  #main {
    // margin: 1.8% 1.8% 0% 1.8%;
    margin: 18px 24px;
    // min-width: 1380px;
    background-color: #f5f7faff;
  }
}
</style>
