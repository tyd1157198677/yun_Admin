<template>
  <div class="AddEmployees">
    <div class="form">
      <p class="title">基本信息</p>
      <a-form-model
        :model="ruleForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="ruleForm"
      >
        <!-- <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
        <!-- prop属性值为表单验证规则rules里的绑定 -->
        <!-- 账号 -->
        <a-form-model-item label="账号" prop="account" :colon="false" ref="name">
          <!-- <label for="psw">账号</label> -->
          <a-input v-model.trim="ruleForm.account" type="text" />
        </a-form-model-item>
        <!-- 姓名 -->
        <a-form-model-item label="姓名" prop="name" ref="name" :colon="false">
          <a-input v-model.trim="ruleForm.name" type="text" />
        </a-form-model-item>

        <!-- 上传头像 -->
        <a-form-model-item has-feedback label="头像" :colon="false">
          <div class="upload">
            <a-upload
              class="upload_btn"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <a-button type="primary" class="btn">上传</a-button>
              <span class="upload_title">建议尺寸120*120px，JPG、PNG、JPEG格式，图片小于3M不上传时会有默认头像，员工可自己修改</span>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
          
        </a-form-model-item>
        <!-- 简介 -->
        <a-form-model-item has-feedback label="简介" :colon="false">
          <a-textarea
            placeholder="请输入员工简介..."
            v-model.trim="ruleForm.jianjie"
            style="resize: none"
            :rows="6"
          />
        </a-form-model-item>

        <!-- 权限设置 -->
        <p class="title">权限设置</p>
        <a-form-model-item label="角色" :colon="false" prop="region">
          <a-select v-model="ruleForm.region" placeholder="请输入角色" style @change="choseRole">
            <a-select-option value="1">Jack</a-select-option>
            <a-select-option value="2">Lucy</a-select-option>
            <a-select-option value="3">Disabled</a-select-option>
            <a-select-option value="4">yiminghe</a-select-option>
            <a-icon slot="suffixIcon" type="caret-down" />
          </a-select>
        </a-form-model-item>
        <!-- 附加权限 -->
        <p style="color:#303133;fint-size:14px">附加权限</p>
        <a-tree
          checkable
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
import { FormModel, Upload } from "ant-design-vue";
import { validator } from "@/antUI/module.js";
import Submit from "@/components/Submit";
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
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  components: {
    Submit,
    AUpload: Upload
  },
  data() {
    //验证器on
    //账号校验器
    let validateAccount = validator({
      reg: /[1-9]/,
      isNull: "账号不能为空",
      formatErr: "账号格式错误"
    });
    //姓名校验器
    let validateName = validator({
      reg: /[\u4e00-\u9fa5_a-zA-Z]/,
      isNull: "姓名不能为空",
      formatErr: "名字必须为中文"
    });
    //验证器off
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: require("@/assets/img/head_upload@2x.png")
        }
      ],
      treeData,
      imageUrl: require("@/assets/img/head_upload@2x.png"),
      ruleForm: {
        account: "", //账号
        name: "", //姓名
        region: "1", //角色
        UploadUrl: "https://www.mocky.io/v2/5cc8019d300000980a055e76", //上传的地址
        url: require("@/assets/img/head_upload@2x.png"),
        jianjie: "", //简介
        ruleSet: ["0-0-0-1"] //权限设置
      },
      //表单验证规则
      rules: {
        account: [
          { validator: validateAccount, required: true, trigger: "blur" },
          { max: 11, message: "账号长度为11位数", trigger: "blur" }
        ],
        name: [
          {
            validator: validateName,
            required: true,
            whitespace: true,
            trigger: "blur"
          },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      //表单布局
      labelCol: { span: 2 },
      wrapperCol: { span: 15 },
      //   地区选择
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing"
            }
          ]
        }
      ],
      options1: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake"
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
      ]
    };
  },
  methods: {
    //上传图片
    // uploadPic() {},
    //  handleChange(info) {
    //   if (info.file.status === 'uploading') {
    //     this.loading = true;
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     getBase64(info.file.originFileObj, imageUrl => {
    //       this.imageUrl = imageUrl;
    //       this.loading = false;
    //     });
    //   }
    // },
    // beforeUpload(file) {
    //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //   if (!isJpgOrPng) {
    //     this.$message.error('You can only upload JPG file!');
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     this.$message.error('Image must smaller than 2MB!');
    //   }
    //   return isJpgOrPng && isLt2M;
    // },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = [file];
    },
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
    },

    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    //当前选中的key值和选中节点的信息
    onCheck(checkedKeys, info) {
      console.log("onCheck", checkedKeys, info);
      this.ruleForm.ruleSet = checkedKeys;
    },
    //保存
    sive() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return console.log("error submit!!");
        }
      });
      console.log(this.ruleForm);
    },
    //取消
    quxiao() {
      // this.ruleForm=""
    },
    //选择角色
    choseRole(value) {
      console.log(`selected ${value}`);
    }
  }
};
</script>
<style lang="less" socped>
.AddEmployees {
  width: 100%;
  height: 100%;
  padding: 1.2% 1.2% 10px 15px;
  background-color: #fff;
  .form {
    width: 50%;
    .title {
      padding-left: 10px;
      font-size: 14px;
      font-weight: 500;
      height:16px ;
      color: rgba(48, 49, 51, 1);
      border-left: 3px solid #2b75edff;
      line-height: 16px;
    }
    
    .beizhu {
      margin-bottom: 84px;
    }
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
  .avatar-uploader > .ant-upload {
  width: 120px;
  height: 120px;
  img{
    width: 120px;
  height: 120px;
  }

}

}
</style>