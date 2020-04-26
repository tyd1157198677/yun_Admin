<template>
  <div class="Staff">
    <div class="header">
      <!-- <a-button class="search_btn" size="large" type="primary">搜索</a-button> -->
      <a-button class="header_top" size="large" type="primary" @click="addEmployees">添加员工</a-button>
      <div class="header_bottom">
        <div class="search_left">
          <a-select class="select_role" size="large" placeholder="全部角色" @change="handleChange">
            <a-icon slot="suffixIcon" type="caret-down" />
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>

          <a-select class="select_state" size="large" placeholder="全部状态" @change="handleChange1">
            <a-icon slot="suffixIcon" type="caret-down" />
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>

        <div class="search_right">
          <a-input class="search_input" size="large" placeholder="用户名/手机号/备注">
            <a-icon slot="prefix" type="search" style="fontSize:15px;color:#909399FF" />
          </a-input>
          <a-button class="search_btn" size="large" type="primary">搜索</a-button>
        </div>
      </div>
    </div>
    <!-- 表格展示区域 -->
    <div class="body">
      <a-table :columns="columns" :dataSource="data1" :pagination="false" rowKey="key" v-if="data1">
        <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
        <template slot="operation" slot-scope="text, record, index">
          <span>
            <a-button @click.native="handleTableRow(record)" size="small" type="link" >启用</a-button>
            <a-button @click.native="editTableRow(record)" size="small" type="link">编辑</a-button>
            <a-button
              @click.native="removeTableRow(index)"
              v-has
              size="small"
              type="link"
              style="color:red"
            >删除</a-button>
          </span>
        </template>
      </a-table>
      <!-- 没有数据的页面 -->
      <div v-else>
        <!-- <errPage/>> -->
        <a-empty description="暂无数据" />
      </div>
    </div>
    <div class="footer">
         <FooterPagination :pageCount="pageCount" :currentPage="currentPage" @selectPage="selectPage"></FooterPagination>
    </div>
  </div>
</template>

<script>
import { confirm } from "@/antUI/module.js";
import FooterPagination from "@/components/FooterPagination.vue";
import errPage from "@/components/errPage.vue";
import axios from "axios";
import { Modal } from "ant-design-vue";
export default {
  components: {
    FooterPagination,
    errPage
  },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          width: "16%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "账号",
          dataIndex: "account",
          width: "16%",
          scopedSlots: { customRender: "account" }
        },
        {
          title: "角色",
          dataIndex: "role",
          width: "16%",
          scopedSlots: { customRender: "role" }
        },
        {
          title: "添加时间",
          dataIndex: "addtime",
          width: "20%",
          scopedSlots: { customRender: "addtime" }
        },
        {
          title: "状态",
          dataIndex: "state",
          width: "15%",
          scopedSlots: { customRender: "state" }
        },
        {
          align: "right",
          title: "操作",
          width: "20%",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data1: [
        {
          key: "1",
          name: "李四11",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "2",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "3",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "4",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "5",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "6",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "7",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "8",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "9",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        },
        {
          key: "10",
          name: "李四33",
          account: "13066314466",
          role: "普通会员",
          addtime: "2020-12-12  12：22：30",
          state: "已启用",
          operation: "操作"
        }
      ],
      editingKey: "",
      pageCount: 200,//总数
      currentPage: 1 //当前选择的页数,默认为第一页
    };
  },
  methods: {
    //选择分页跳转
    selectPage(pageNum) {
      this.currentPage = pageNum; //获取到点击的页数
      console.log(pageNum);
      //进行分页数请求
      // axios.get(`/api/getTable?id=${pageNum}`).then(result => {
      //     let {data} = result
      //     this.data = data;
      //   });
    },
    //添加员工跳转页面
    addEmployees() {
      this.$router.push({ path: "AddStaff" });
    },
    //启用/停用员工
    handleTableRow(info) {
      confirm({
        icon: "exclamation-circle",
        title: "确定要停用该员工吗?",
        content: "停用后，该员工将不可登入，也不能有任何的操作。",
        onOk: () => {
          console.log(info);
        }
      });
    },
    //编辑员工
    editTableRow(info) {
      console.log(info);
    },
    //删除员工弹窗
    removeTableRow(index) {
      confirm({
        icon: "close-circle",
        title: "确定要删除该员工吗?",
        content: "删除后，该员工将不能登入该后台，且操作不可逆",
        onOk: () => {
          this.data1.splice(index, 1);
        }
      });
    },
    //角色下拉框
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    //状态下拉框
    handleChange1(value) {
      console.log(`selected ${value}`);
    },
  }
};
</script>
<style>
.ant-modal-confirm-body > .anticon-info-circle {
  color: rgb(224, 224, 98) !important;
}
.ant-modal-confirm-body > .anticon-close-circle {
  color: red !important;
}
</style>
<style lang="scss" scoped>
.Staff {
  width: 100%;
  height: 100%;
  padding: 1.2% 1.2% 24px 1.2%;
  background-color: #fff;
  .header {
    width: 100%;
    height: 17%;
    .header_top {
      margin-bottom: 20px;
    }
    .header_bottom {
      width: 100%;
      height: 27%;
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;
      .search_left {
        width: 50%;
        .select_role {
          width: 160px;
          margin-right: 6%;
        }
        .select_state {
          width: 160px;
        }
      }
      .search_right {
        width: 50%;
        text-align: right;
        .search_input {
          width: 240px;
          height: 40px;
        }
        .search_btn {
          width: 65px;
          height: 40px;
          margin-left: 2%;
        }
      }
    }
  }
  .body {
    width: 100%;
    height: 67%;
  }
  
}
</style>