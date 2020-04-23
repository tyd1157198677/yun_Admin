<template>
  <div class="AddEmployees">
    <div class="form">
      <p class="title">基本信息</p>
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <!-- prop属性值为表单验证规则rules里的绑定 -->
        <!-- 账号 -->
        <a-form-model-item has-feedback label="账号" prop="account" :colon="false" ref="name">
          <!-- <label for="psw">账号</label> -->
          <a-input v-model="ruleForm.account" type="text" autocomplete="off" :maxLength="11" />
        </a-form-model-item>

        <!-- 姓名 -->
        <a-form-model-item has-feedback label="姓名" prop="name" :colon="false">
          <a-input v-model="ruleForm.name" type="text" autocomplete="off" :maxLength="4" />
        </a-form-model-item>

        <!-- 上传头像 -->
        <a-form-model-item has-feedback label="头像" :colon="false">
          <div class="upload">
            <img class="upload_left" src="@/assets/img/head_upload@2x.png" />
            <div class="upload_right">
              <a-upload
                class="upload_btn"
                name="file"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @click="uploadPic"
              >
                <a-button type="primary">上传</a-button>
              </a-upload>
              <!-- <a-button class="upload_btn" @click="uploadPic" type="primary">上传</a-button> -->

              <span class="upload_title">建议尺寸120*120px，JPG、PNG、JPEG格式，图片小于3M不上传时会有默认头像，员工可自己修改</span>
            </div>
          </div>
        </a-form-model-item>

        <!-- 简介 -->
        <a-form-model-item has-feedback label="简介" :colon="false">
          <a-textarea placeholder="请输入员工简介" style="resize: none" :rows="6" />
        </a-form-model-item>

        <!-- 权限设置 -->
        <p class="title">权限设置</p>
        <a-form-model-item has-feedback label="角色" prop="role" :colon="false">
          <a-select v-model="ruleForm.role" placeholder="请选择角色">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 附加权限 -->
        <p>附加权限</p>
        <a-tree
          checkable
          :treeData="treeData"
          :defaultExpandedKeys="['0-0-0', '0-0-1']"
          :defaultSelectedKeys="['0-0-0', '0-0-1']"
          :defaultCheckedKeys="['0-0-0', '0-0-1']"
        >
          <span slot="title0000" class="asd" style="color: #1890ff">添加角色</span>
          <span slot="title0001" style="color: #1890ff">编辑角色</span>
        </a-tree>

        <!-- 提交栏 -->
      </a-form-model>
    </div>
    <Submit></Submit>
    <!-- <div class="submit">
      <div class="submit_btn">
        <a-button class="btn" type="primary" size="large" @click="submitForm('ruleForm')">提交</a-button>
        <a-button class="btn" style="margin-left:20%" size="large" @click="resetForm('ruleForm')">取消</a-button>
      </div>
    </div>-->
  </div>
</template>
<script>
import { FormModel, Upload } from "ant-design-vue";
import { validator } from "@/antUI/module.js";
import Submit from "@/components/Submit";
export default {
  components: {
    Submit,
    AUpload: Upload
  },
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
    //验证器on
    //账号校验器
    let validateAccount = validator({
      reg: /^1[3456789]\d{9}$/,
      isNull: "账号不能为空",
      formatErr: "账号格式错误"
    });
    //姓名校验器
    let validateName = validator({
      reg: /[\u4e00-\u9fa5]/,
      isNull: "姓名不能为空",
      formatErr: "名字必须为中文"
    });
    //验证器off
    return {
      treeData, //树形图
      ruleForm: {
        account: "", //账号
        name: "", //姓名
        role: undefined //角色
      },
      //表单验证规则
      rules: {
        account: [
          { validator: validateAccount, required: true, trigger: "blur" },
          { max: 11, message: "账号长度为11位数", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择一个角色", trigger: "blur" }],
        name: [
          { validator: validateName,required: true,whitespace: true,trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ]
      },
      //表单布局
      layout: {
        labelCol: { span: 3, offset: 1 },
        wrapperCol: { span: 18, offset: 2 }
      }
    };
  },
  methods: {
    //上传图片
    uploadPic() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
<style lang="scss" socped>
.AddEmployees {
  width: 100%;
  height: 100%;
  padding: 1.2% 1.2% 0% 1.2%;
  background-color: #fff;
  .form {
    width: 36%;
    min-width: 600px;
    height: 90%;
    .title {
      width: 25%;
      font-size: 1.2rem;
      text-align: center;
      border-left: 5px solid #2b75edff;
    }
    .upload {
      display: flex;
      justify-content: space-between;
      .upload_left {
        min-width: 160px;
        width: 35%;
      }
      .upload_right {
        width: 58%;
        display: flex;
        flex-direction: column;
        .upload_btn {
          width: 30%;
        }
        .upload_title {
          padding-top: 5%;
          font-size: 1rem;
          box-sizing: border-box;
          color: #909399ff;
        }
      }
    }
  }
}
// .submit {
//   width: 100%;
//   height: 9%;
//   border-top: 1px solid #EFEFEFFF;
//   display: flex;

//   .submit_btn {
//     width: 15%;
//     height: 100%;
//     padding-top: 1.2%;
//     margin: 0% auto;
//     display: flex;
//     .btn {
//       flex-grow: 1;
//     }
//   }
// }
</style>