<template>
  <div class="blackList">
    <div class="body">
      <a-table :columns="columns" :dataSource="data" :pagination="false" rowKey="key" v-if="data">
        <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
        <template slot="operation" slot-scope="text, record, index">
          <span>
            <a-button @click.native="showDetail()" size="small" type="link">详情</a-button>
            <a-button @click.native="recharge()" size="small" type="link">充值</a-button>
            <a-button @click.native="openPrivilege()" size="small" type="link">开特权</a-button>
            <a-button @click.native="remove()" size="small" type="link">删除</a-button>
          </span>
        </template>
      </a-table>
    </div>
    <div class="footer">
      <FooterPagination />
    </div>
  </div>
</template>

<script>
import FooterPagination from "@/components/FooterPagination.vue";
const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    width: "10%",
    scopedSlots: { customRender: "userName" }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    width: "10%",
    scopedSlots: { customRender: "phone" }
  },
  {
    title: "身份",
    dataIndex: "identity",
    width: "10%",
    scopedSlots: { customRender: "identity" }
  },
  {
    title: "注册时间",
    dataIndex: "joinDate",
    width: "15%",
    scopedSlots: { customRender: "joinDate" }
  },
  {
    title: "注册方式",
    dataIndex: "logonMode",
    width: "10%",
    scopedSlots: { customRender: "logonMode" }
  },
  {
    title: "归属",
    dataIndex: "attribution",
    width: "10%",
    scopedSlots: { customRender: "attribution" }
  },
  {
    title: "备注",
    dataIndex: "note",
    width: "10%",
    scopedSlots: { customRender: "note" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
const data = [
  {
    key: "1",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "2",
    userName: "李四22233",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "3",
    userName: "李四3333",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "4",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "5",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "6",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "7",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "8",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "9",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "10",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  }
];
export default {
  components: {
    FooterPagination
  },
  data() {
    return {
      data,
      columns,
    };
  }
};
</script>

<style lang="scss" scoped>
.blackList {
  width: 100%;
  .body {
    margin-top: 1.5%;
    width: 100%;
  }
  .footer {
    position: relative;
    width: 100%;
  }
}
</style>