<template>
  <div class="userList">
    <div class="tabs">
      <a-tabs defaultActiveKey="1" size="large" @change="callback">
        <a-tab-pane tab="用户列表" key="1">
          <div class="header">
            <a-button class="header_top" size="large" type="primary" @click="addUser">添加用户</a-button>
            <div class="header_bottom">
              <div class="search_left">
                <a-select class="select_identity" size="large" placeholder="身份">
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-select-option value="disabled">Disabled</a-select-option>
                  <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>

                <a-select class="select_logonmode" size="large" placeholder="注册方式">
                  >
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-select-option value="disabled">Disabled</a-select-option>
                  <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>

                <a-select class="select_attribution" size="large" placeholder="归属">
                  >
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-select-option value="disabled">Disabled</a-select-option>
                  <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
              </div>

              <div class="search_right">
                <a-input class="search_input" size="large" v-model="queryInfo" placeholder="用户名/手机号/备注">
                  <a-icon slot="prefix" type="search" style="fontSize:15px;color:#909399FF" />
                </a-input>
                <a-button class="search_btn" type="primary">搜索</a-button>
                <!-- <a-button class="search_btn" type="primary" @click="getUserList">搜索</a-button> -->
              </div>
            </div>
          </div>
          <!-- 表单展示区 -->
          <div class="body">
            <a-table :columns="columns" :dataSource="data" :pagination="false" rowKey="key">
              <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
              <template slot="operation" slot-scope="text, record, index">
                <span>
                  <a-button @click.native="showDetail(record)" size="small" type="link">详情</a-button>
                  <a-button @click.native="recharge(record)" size="small" type="link">充值</a-button>
                  <a-button @click.native="openPrivilege(record)" size="small" type="link">开特权</a-button>
                  <a-button @click.native="remove(index)" size="small" type="link">删除</a-button>
                </span>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="黑名单列表" key="2">
          <div class="body">
            <a-table
              :columns="columns1"
              :dataSource="data1"
              :pagination="false"
              rowKey="key"
              v-if="data"
            >
              <template slot="operation" slot-scope="text, record, index">
                <span>
                  <a-button @click.native="showDetail1(record)" size="small" type="link">详情</a-button>
                  <a-button @click.native="recharge1(record)" size="small" type="link">充值</a-button>
                  <a-button @click.native="openPrivilege1(record)" size="small" type="link">开特权</a-button>
                  <a-button @click.native="remove1(index)" size="small" type="link">删除</a-button>
                </span>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- 充值 -->
    <a-modal
      title="用户充值"
      
      v-model="visible"
      :centered="true"
      :destroyOnClose="true"
      :mask="true"
      width="430px"
      :bodyStyle="{'padding-bottom':'15px'}"
    >
      <template slot="footer">
        <a-button type="primary" @click="handleOk">确定</a-button>
      </template>
      <a-form-model v-bind="rechargeLayout" :model="rechargeForm">
        <a-form-model-item label="充值金额" :colon="false">
          <a-input v-model="rechargeForm.rechargeAmount" type="text" placeholder="请输入充值金额" />
        </a-form-model-item>
        <a-form-model-item label="充值终端" :colon="false">
          <a-radio-group v-model="rechargeForm.terminal">
            <a-radio value="Android">Android</a-radio>
            <a-radio value="iOS">iOS</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="充值类型" :colon="false">
          <a-radio-group v-model="rechargeForm.rechargeType" :colon="false" @change="changeType">
            <a-radio value="1">账户余额</a-radio>
            <a-radio value="2">赠送余额</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="有效期至" :colon="false" v-if="validity">
          <a-date-picker
            v-model="rechargeForm.date"
            show-time
            type="date"
            placeholder="请选择日期"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="收款类型" :colon="false">
          <a-radio-group v-model="rechargeForm.paymentType">
            <a-radio value="publicDebt">公帐收款</a-radio>
            <a-radio value="privateDebt">私帐收款</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 开特权 -->
    <a-modal
      width="550px"
      title="开通特权"
      v-model="isOpen"
      @ok="selectOk"
      :centered="true"
      :destroyOnClose="true"
      :mask="true"
      okText="保存"
      cancelText="取消"
    >
      <a-form-model v-bind="privilegeLayout" :model="privilegeForm">
        <a-form-model-item label="特权类型">
          <a-radio-group v-model="privilegeForm.privilegeType">
            <a-radio value="yearPri" style="margin-left:10px">年度特权</a-radio>
            <a-radio value="InternalPri">内部特权</a-radio>
            <a-radio value="customPri">自定义特权</a-radio>
            <a-radio value="trialPri">试用特权</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="所在地区" :colon="false">
          <a-cascader
            :options="regionData"
            style="width: 60%;margin-left:10px"
            placeholder="请选择地区"
            @change="getPlace"
          >
          <a-icon type="caret-down" slot="suffixIcon" />
          </a-cascader>
        </a-form-model-item>

        <a-form-model-item
          v-if="privilegeForm.privilegeType==='trialPri'"
          label="试用时间"
          :colon="false"
        >
          <a-select placeholder="请选择试用时间" v-model="privilegeForm.trialTime" style="width: 60%;margin-left:10px">
            <a-select-option value="7">7天</a-select-option>
            <a-select-option value="15">15天</a-select-option>
            <a-select-option value="30">30天</a-select-option>
            <a-select-option value="90">90天</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          v-if="privilegeForm.privilegeType==='customPri'"
          label="开通价格"
          :colon="false"
        >
          <a-input
            v-model="privilegeForm.rechargeAmount"
            style="width: 60%;margin-left:10px"
            type="text"
            placeholder="请输入价格"
          />
        </a-form-model-item>

        <a-form-model-item
          v-if="privilegeForm.privilegeType==='InternalPri'||privilegeForm.privilegeType==='customPri'"
          label="有效期至"
          :colon="false"
        >
          <a-date-picker
            v-model="privilegeForm.date"
            show-time
            type="date"
            placeholder="请选择日期"
            style="width: 60%;margin-left:10px"
          >
          <a-icon type="caret-down" slot="suffixIcon" />
          </a-date-picker>
        </a-form-model-item>

        <a-form-model-item :colon="false">
          <label style="color:black">同时开通企业账号</label>
          <a-switch style="marginLeft:30px" v-model="privilegeForm.delivery" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 底部分页 -->
    <div class="footer">
         <FooterPagination :pageCount="pageCount" :currentPage="currentPage" @selectPage="selectPage"></FooterPagination>
    </div>
  </div>
</template>

<script>
import FooterPagination from "@/components/FooterPagination.vue"
import { confirm } from "@/antUI/module.js";
//三级联动数据源
const regionData = [];
export default {
  components: {
    FooterPagination,
  },
  data() {
    return {
      //用户列表
      columns: [
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
          width: "17%",
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
          width: "13%",
          scopedSlots: { customRender: "attribution" }
        },
        {
          title: "备注",
          dataIndex: "note",
          width: "10%",
          scopedSlots: { customRender: "note" }
        },
        {
          align: "right",
          title: "操作",
          width: "20%",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data: [
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
      ],
      //黑名单列表
      columns1: [
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
          align: "right",
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data1: [
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
      ],
      queryInfo:"",//搜索信息
      keys:"1",//用户还是黑名单
      //分页
      pageCount: 80,
      currentPage: 1,//当前选择的页数,默认为第一页
      //三级联动数据源
      regionData: [
        {
          id:"1",
          value: "zhejiang",
          label: "浙江",
          children: [
            {
              id:"1-1",
              value: "hangzhou",
              label: "杭州",
              children: [
                {
                  id:"1-1-1",
                  value: "xihu",
                  label: "西湖"
                }
              ]
            }
          ]
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men"
                }
              ]
            }
          ]
        }
      ],
      validity: false, //用户充值是否显示有效期
      visible: false, //充值开关
      isOpen: false, //开特权开关
      //充值窗口
      rechargeForm: {
        data: "", //有效期
        terminal: "Android", //充值终端
        rechargeType: "1", //充值类型
        paymentType: "publicDebt", //收款类型
        rechargeAmount: "" //充值金额
      },
      //特权窗口
      privilegeForm: {
        privilegeType: "yearPri", //特权类型
        
        data: "", //有效期
        trialTime: "", //试用时间
        yearPri: "", //开通价格
        delivery: true //是否开通企业账号
      },
      rechargeLayout: {
        //充值布局
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      privilegeLayout: {
        //特权布局
        labelCol: { span: 3 },
        wrapperCol: { span: 21 }
      }
    };
  },
  methods: {
    //   获取用户列表
    // async getUserList() {
    //   const { data: res } = await this.$http.get(`goods`, {
    //     params: this.queryInfo
    //   });
    //   console.log(res);
    //   this.info(res, "获取列表失败", "获取列表成功");
    //   this.data = res.data.goods;
    //   this.total = res.data.total;
    // },
    //tab切换
    async callback(key) {
      this.keys=key
      console.log(key);
      let { data: res } = await this.$http.post("get_countrycodes")
      console.log(res.data);
    },
    //添加用户
    addUser() {
      this.$router.push({
        path: "AddUser"
      });
    },
    //搜索
    searchRes(info) {
      return this.data.filter(item => {
        if (item.userName.includes(info)) {
          return item;
        }
      });
    },
    //用户列表查看客户详情
    showDetail(info) {
      this.$router.push({ name: "userDetail", query: { info , key:this.keys} });
    },
    //用户列表控制充值开关
    recharge(info) {
      this.visible = true;
      console.log(info);
    },
    //用户充值按钮当选择赠送余额时显示有效期框
    changeType() {
      this.validity = this.rechargeForm.rechargeType == 2 ? true : false;
    },
    //充值框点确定后执行
    handleOk() {
      this.visible = false;
      console.log(this.rechargeForm);
      
    },
    //用户列表开特权
    openPrivilege(info) {
      this.isOpen = true;
    },
    //开特权弹窗确定后执行
    selectOk() {
      this.isOpen = false;
      console.log(this.privilegeForm);
    },
    //获取地区
    getPlace(value,info){
      console.log(value);//["zhejiang","hangzhou","xihu"]
      console.log(info);//选中的所有信息
    },
    //用户列表删除该用户
    remove(index) {
      confirm({
        icon: "close-circle",
        title: "确定要删除该客户吗?",
        content: "删除后，该用户在平台的所有数据都将清空，且无法恢复",
        onOk: ()=>  {
          // console.log("OK");
          this.data.splice(index,1)
        }
      });
    },
    //黑名单查看客户详情
    showDetail1(info) {
      this.$router.push({ path: "userDetail" ,query: { info , key:this.keys} });
    },
    //黑名单控制充值开关
    recharge1(info) {
      this.visible = true;
    },

    //黑名单开特权
    openPrivilege1(info) {
      this.isOpen = true;
    },

    //黑名单删除该用户
    remove1() {
      confirm({
        icon: "close-circle",
        title: "确定要删除该客户吗?",
        content: "删除后，该用户在平台的所有数据都将清空，且无法恢复",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },

    //分页
    selectPage(pageNum) {
      this.currentPage = pageNum; //获取到点击的页数
      console.log(pageNum);
      //进行分页数请求
      // axios.get(`/api/getTable?id=${pageNum}`).then(result => {
      //     let {data} = result
      //     this.data = data;
      //   });
    }
  },
  created(){
    // this.getUserList()
  },
  watch: {
    pageSize(val) {
      console.log("pageSize", val);
    },
    current(val) {
      console.log("current", val);
    }
  }
};
</script>
<style>
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
.ant-modal-confirm-body > .anticon-close-circle {
  color: red !important;
}
</style>
<style lang="less" scoped>
.userList {
  width: 100%;
  .header {
    width: 100%;

    flex-direction: column;
    justify-content: space-around;
    .header_top {
      width: 97px;
      height: 40px;
      margin-top: 10px;
    }
    .header_bottom {
      width: 100%;
      margin: 1.5% 0%;
      display: flex;
      // justify-content: space-between;
      .search_left {
        // width: 50%;
        flex:5;
        .select_identity,.select_attribution {
          width: 160px;
          height: 40px;
        }
        .select_logonmode {
          width: 160px;
          height: 40px;
          margin: 0% 4%;
        }
      }
      .search_right {
        flex: 5;
        width: 50%;
        text-align: right;
        // float: right;
        .search_input {
          width: 240px;
          height: 40px;
          font-size: 14px;
          color: rgba(144, 147, 153, 1);
        }
        .search_btn {
          width: 57px;
          height: 38px;
          margin-left: 10px;
        }
      }
    }
  }
  .body {
    width: 100%;
  }
  /deep/.ant-tabs-tab-active {
    font-size: 14px;
    font-weight: 800;
    color: rgba(48, 49, 51, 1);
  }
  .footer {
    text-align: right;
    margin: 50px 0 20px 0;
  }
}
</style>