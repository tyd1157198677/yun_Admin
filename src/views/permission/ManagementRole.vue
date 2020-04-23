<template>
  <div class="Role">
    <div class="header">
      <!-- 温馨提示 -->
      <div class="tips">
        <img class="tips_img" src="@/assets/img/icon_general_hint_16@2x (1).png" alt />
        <span class="tips_font">温馨提示：编辑角色，拥有该角色包含权限的账号会同步更改，请谨慎编辑！</span>
      </div>
      <a-button class="btn" type="primary" size="large" @click="addRole">添加角色</a-button>
    </div>
    <div class="body">
      <a-table :columns="columns" :dataSource="data" :pagination="false" v-if="data">
        <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
        <template slot="operation" slot-scope="text, record, index">
          <span>
            <a-button @click.native="showRole(record)" size="small" type="link">查看</a-button>
            <a-button @click.native="removeTableRow(index)" size="small" style="color:red" type="link">删除</a-button>
          </span>
        </template>
      </a-table>
      <!-- 没数据时的页面 -->
      <div v-else>
        <!-- <errPage/> -->
        <a-empty description="暂无数据" />
      </div>
    </div>
    <!-- 底部分页 -->
    <div class="footer">
         <FooterPagination :pageCount="pageCount" :currentPage="currentPage" @selectPage="selectPage"></FooterPagination>
    </div>
  </div>
</template>

<script>
import {Modal} from 'ant-design-vue';
import { confirm } from "@/antUI/module.js";
import WarmPrompt from "@/components/WarmPrompt.vue";
import FooterPagination from "@/components/FooterPagination.vue";
import errPage from "@/components/errPage.vue";
const columns = [
  {
    title: "角色",
    dataIndex: "role",
    width: "20%",
    scopedSlots: { customRender: "role" }
  },
  {
    title: "描述",
    dataIndex: "detail",
    width: "60%",
    scopedSlots: { customRender: "detail" }
  },
  {
    align:"right",
    title: "操作",
    dataIndex: "operation",
    width: "20%",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: "1",
    role: "管理者",
    detail:
      "不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "2",
    role: "管理者",
    detail:
      "个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "3",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "4",
    role: "管理者",
    detail:
      "也不好管理还要换"
  },
  {
    key: "5",
    role: "管理者",
    detail:
      "也不好管理还要换"
  },
  {
    key: "6",
    role: "管理者",
    detail:
      "不好看的也不好管理还要换"
  },
  {
    key: "7",
    role: "管理者",
    detail:
      "不好看的也不好管理还要换"
  },
  {
    key: "8",
    role: "管理者",
    detail:
      "就会不好看的也不好管理还要换"
  },
  {
    key: "9",
    role: "管理者",
    detail:
      "不好看的也不好管理还要换"
  },
  {
    key: "10",
    role: "管理者",
    detail:
      "的也不好管理还要换"
  }
];
export default {
  components: {
    FooterPagination,
    errPage
  },
  data() {
    return {
      data,
      columns,
      editingKey: "",
      pageCount: 60,
      currentPage: 1 //当前选择的页数,默认为第一页
    };
  },
  methods: {
    addRole() {
      this.$router.push({ name: "AddRole" });
    },
    //删除角色
    removeTableRow(index) {
      confirm({
        icon: "close-circle",
        iconType:"color:red",
        title: "确定要删除该角色吗？",
        content: "删除后，该角色对应的人员，将失去一切权限，仅保留登录",
        onOk: () => {
          this.data.splice(index,1)
          // console.log(this.data1);
        }
      });
    },
    //查看角色
    showRole(info) {
      console.log(info);
    },
    //选择分页
    selectPage(pageNum) {
      this.currentPage = pageNum; //获取到点击的页数
      console.log(pageNum);
      //进行分页数请求
      // axios.get(`/api/getTable?id=${pageNum}`).then(result => {
      //     let {data} = result
      //     this.data = data;
      //   });
    }

  }
};
</script>

<style lang="scss" scoped>
.Role {
  width: 100%;
  padding: 1.2% 1.2% 20px 1.2%;
  background-color: #fff;
  .header {
    width: 100%;
    .tips {
      width: 100%;
      height: 40px;
      background: rgba(255, 251, 230, 1);
      border: 1px solid rgba(255, 229, 143, 1);
      display: flex;
      align-items: center;
      .tips_img {
        margin:0 10px;
        width: 16px;
        height: 16px;
      }
      .tips_font {
        font-size: 14px;
      }
    }
    .btn {
      margin: 2.6% 0%;
      width: 8%;
    }
  }
  .body {
    width: 100%;
  }
  .footer {
    text-align: right;
    margin-top: 24px;
  }
}
</style>