<template>
  <div class="login">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="form"
    >
      <a-form-model-item label="用户名" prop="userName" ref="userName">
        <a-input
          v-model="form.userName"
          @blur="
          () => {
            $refs.userName.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password" ref="password">
        <a-input
          v-model="form.password"
          @blur="
          () => {
            $refs.password.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit" class="btn">
        登录
      </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
      other: "",
      form: {
        userName: "",
        password:""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 11,
            message: "长度在6-11个字符！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      // console.log(this.$store.state.userinfo);
      console.log(this.$store);//3
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem("userId","12")
          this.$router.push({path:"/home"})
          // this.$store.dispatch('changeUserInfo',this.loginData.obj.phone )
          this.$store.dispatch('changeUserInfo','2' )
          console.log( this.$store.getters.getuserinfo)
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
      
    }
  }
};
</script>
<style lang="less" scoped>
  .login{
    background: rgb(146, 146, 209);
    width: 100%;
    height: 100%;
    .form{
      padding-top:20%;
      padding-left: 30%;
      .btn{
        width: 30%;
      }
    }
  }
</style>