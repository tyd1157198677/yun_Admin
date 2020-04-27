<template>
  <div class="AddRole">
    <!-- 温馨提示 -->
    <div class="tips">
      <a-alert message="温馨提示：添加角色，拥有该角色包含权限的账号会同步更改，请谨慎编辑！" banner />
      </div>
    <div class="form">
      <p class="title">基本信息</p>
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <!-- prop属性值为表单验证规则rules里的绑定 -->
        <!-- 账号 -->
        <a-form-model-item has-feedback label="角色名称" prop="roleName" :colon="false" ref="name">
          <a-input
            v-model="ruleForm.roleName"
            placeholder="请输入角色名称"
            type="text"
            @change="getvalue"
            autocomplete="off"
            :maxLength="8"
            allowClear
          />
        </a-form-model-item>
        <!-- 简介 -->
        <a-form-model-item has-feedback label="角色描述" :colon="false">
          <a-textarea placeholder="请输入角色描述..." v-model="ruleForm.roleMiaoshu" style="resize: none" :rows="6" />
        </a-form-model-item>

        <!-- 权限设置 -->
        <!-- defaultExpandedKeys：默认展开指定的树节点 -->
        <!-- defaultSelectedKeys：默认选中的树节点 -->
        <!-- defaultCheckedKeys：默认选中复选框的树节点 -->
        <p class="title">权限设置</p>
        <a-tree
          checkable
          blockNode
          :treeData="treeData"
          :defaultExpandedKeys="['0-0','0-0-0']"
          :defaultCheckedKeys="ruleForm.ruleSet"
          @select="this.onSelect"
          @check="this.onCheck"
        >
          <span slot="title0000" style="color: #1890ff">添加角色</span>
          <span slot="title0001" style="color: #1890ff">编辑角色</span>
        </a-tree>

        <!-- 提交栏 -->
      </a-form-model>
    </div>
    <div class="sub">
      <a-button class="qu_xiao" @click="quxiao">取消</a-button>
      <a-button type="primary" @click="sive">保存</a-button>
    </div>
  </div>
</template>
<script>
import { validator } from "@/antUI/module.js";
export default {
  data() {
    //树形图数据
    const treeData = [
      {
        title: "权限管理",
        key: "0-0",
        children: [
          {
            title: "角色管理",
            key: "0-0-0",
            style: { width: "100px" },
            children: [
              { key: "0-0-0-0", slots: { title: "title0000" } },
              { key: "0-0-0-1", slots: { title: "title0001" } }
            ]
          }
          //可用于扩展
          // {
          //   title: 'parent 1-1',
          //   key: '0-0-1',
          //   children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }],
          // },
        ]
      }
    ];
    //角色名称校验
    let validateRole = validator({
      reg: /[\u4e00-\u9fa5]/,
      isNull: "角色名称输入不能为空",
      formatErr: "字符必须为中文"
    });
    //验证器off
    return {
      treeData, //树形图
      ruleForm: {
        roleName: "",//角色名字
        roleMiaoshu:"",//角色描述
        ruleSet:['0-0-0-1']//权限设置

      },
      //表单验证规则
      rules: {
        roleName: [
          { validator: validateRole, required: true, trigger: "blur" },
          { min: 2, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },

      //表单布局
      layout: {
        labelCol: { span: 4, offset: 1 },
        wrapperCol: { span: 17, offset: 2 }
      }
    };
  },
  methods: {
    getvalue() {
      // console.log(this.ruleForm.role)
    },
    //保存
    sive() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
         return console.log('error submit!!');
        }
      });
      
    },
    //取消
    quxiao() {

    },

    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
    },
    //当前选中的key值和选中节点的信息
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
      this.ruleForm.ruleSet=checkedKeys
    },
  }
};
</script>
<style>
.ant-tree li ul {
  display: flex;
}
.ant-tree li ul > li {
  padding: 8px 0 4px;
}
</style>
<style lang="scss" scoped>
.AddRole {
  width: 100%;
  height: 100%;
   padding: 1.2% 1.2% 5px 1.2%;
  background-color: #fff;
  .tips {
      width: 100%;
      height: 40px;
      background: rgba(255, 251, 230, 1);
      border: 1px solid rgba(255, 229, 143, 1);
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  .title {
    font-size: 14px;
    width: 100%;
    height: 20px;
    padding-left: 10px;
    border-left: 3px solid #2b75edff;
  }
  .form {
    width: 40%;
    height: 82%;
  }
  .sub {
    margin: 20px 0;
    border-top: 1px solid #efefef;
    margin-left: -30px;
    padding-top: 30px;
    width: 120%;
    text-align: center;
    .qu_xiao {
      margin-right: 50px;
    }
  }
}
</style>