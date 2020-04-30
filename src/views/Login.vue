<template>
  <div class="login">
    <h3>创骐云课堂</h3>
    <div class="form_login">
      <div class="img">
        <img :src="left_img" alt />
      </div>
      <div class="right">
        <div class="phone_login_form" v-if="show==1">
          <div class="phone_login">
            <span>手机号登录</span>
            <img src="../assets/img/img_dl.png" @click="changeTab(2)" />
          </div>
          <div class="form">
            <div class="phone">
              <a-select defaultValue="+86" style="width:70px;border:0px" @change="changeValue">
                <a-select-option :value="item.id" v-for="item in c_phone" :key="item.id">{{item.code}}</a-select-option>
              </a-select>
              <span>|</span>
              <a-input
                style="width: 50%;border:0px;margin-left:20px"
                v-model="form.phone"
                placeholder="请输入手机号"
              />
            </div>
            <div class="err_msg">{{phone_err}}</div>
            <div class="reg_ma">
              <a-input
                style="width: 50%;border:0px;"
                v-model="form.reg_ma"
                placeholder="请输入验证码"
              />
              <a-button type="link" style="font-size:14px;margin-left:55px" :disabled="disabled" @click="getRegMa">{{send_regma}}</a-button>
            </div>
            <div class="err">{{err_msg}}</div>
            <div class="btn">
              <a-button
                type="primary"
                :disabled="form.reg_ma.trim().length!=4"
                class="btn_login"
                @click="login"
              >登录</a-button>
            </div>
          </div>
        </div>
        <div class="ma_login_form" v-if="show==2">
          <div class="phone_login">
            <span>二维码登录</span>
            <img src="../assets/img/icon_sj.png" @click="changeTab(1)" />
          </div>
          <div class="erweima">
            <img src="../assets/img/icon_sj.png" alt />
          </div>
          <div class="word">
            <span>使用云课堂APP扫码登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { mapMutations } from "vuex";
import fun_md5 from "../assets/js/md5";
export default {
  data() {
    return {
      left_img: require("../assets/img/img_dl.png"),
      form: {
        c_id: "1", //国家地区
        phone: "", //手机号
        reg_ma: "" //验证码
      },
      c_phone:[//各个地区手机数据
        {
          id:1,
          code:"+86",
          value:'中国'
        },
        {
          id:2,
          code:"+52",
          value:'中国香港'
        }
      ],
      phone_err: "", //手机号错误提示
      show: 1,//1显示手机号登录，2显示二维码登录
      err_msg: "1",//验证码错误提示
      disabled: false,//获取验证码按钮是否被禁
      send_regma: "获取验证码"
    };
  },
  methods: {
    ...mapMutations(["changeUserInfo"]),
    //判断是手机号还是验证吗登录
    changeTab(val) {
      this.show = val;
    },
    //选择国家手机代号
    changeValue(v){
      this.form.c_id=v
    },
    //登录
    login() {
      console.log(JSON.parse(JSON.stringify(this.form)));
      sessionStorage.setItem("userId", "12");
      this.changeUserInfo("1");
      // this.$store.dispatch('changeUserInfo','1' )
      this.$router.push({ path: "/home" });
      // console.log(this.$store.getters.getuserinfo);
    },
    //获取验证吗
    getRegMa() {
      //倒计时
      let that = this;
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.form.phone.trim() == "") {
        return (that.phone_err = "手机号不能为空！");
      } else if (!myreg.test(that.form.phone)) {
        return (that.phone_err = "请输入正确的手机号格式！");
      } else {
        that.phone_err = "";
        let time = 60;
        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            that.disabled = false;
            that.send_regma = "获取验证码";
          } else {
            that.send_regma = time + "s后重发";
            that.disabled = true;
            time--;
          }
        }, 1000);
      }
    }
  },
  created() {}
};
function urlEncode(string) {
  var skey = "qkhingcua";
  var num1 = Math.floor(Math.random() * (skey.length - 1));
  var num2 = Math.floor(Math.random() * (skey.length - 1));
  string =
    fun_md5.hex_md5(skey[num1]) +
    window.btoa(string) +
    fun_md5.hex_md5(skey[num2]);
  string = window.btoa(string) + num1 + num2;
  return string;
}
</script>
<style lang="less" scoped>
/deep/.ant-select-selection {
  border: 0px;
}
/deep/.ant-input:focus {
    border: none;
    border-bottom: 0px solid white !important;
    box-shadow: none;
}
.login {
  background: url("../assets/img/img_bg.png") no-repeat center center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  h3 {
    position: absolute;
    top: 5%;
    left: 19%;
    font-size: 22px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .form_login {
    margin: auto;
    width: 1000px;
    height: 540px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px 0px 0px 8px;
    display: flex;
    .img {
      flex: 2;
      img {
        display: block;
        margin: 90px 63px 65px 63px;
        width: 474px;
        height: 385px;
      }
    }
    .right {
      flex: 2;
      .phone_login_form {
        .phone_login {
          margin-top: 18px;
          margin-right: 18px;
          height: 60px;
          // text-align: center;
          line-height: 60px;
          span {
            padding-left: 100px;
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            font-weight: 500;
          }
          img {
            height: 60px;
            width: 60px;
            float: right;
          }
        }
        .form {
          width: 100%;
          height: 100%;
          padding: 0 40px;
          .phone {
            margin-top: 20px;
            width: 320px;
            height: 56px;
            line-height: 56px;
            border-bottom: 1px solid #979797;
            span{
              margin-left: 10px;
            }
          }
          .err_msg {
            height: 25px;
            margin-top: 5px;
            color: #ff6363;
            font-size: 12px;
          }
          .reg_ma{
            width: 320px;
            height: 56px;
            line-height: 56px;
            border-bottom: 1px solid #979797;
            
          }

          .err {
            text-align: center;
            color: #ff6363;
            font-size: 12px;
            margin-top: 10px;
            margin-bottom: 30px;
          }
          .btn {
            width: 100%;
            .btn_login {
              width: 320px;
              height: 48px;
            }
          }
        }
      }
      .ma_login_form {
        .phone_login {
          margin-top: 18px;
          margin-right: 18px;
          height: 44px;
          line-height: 44px;
          span {
            display: inline-block;
            padding-top: 20px;
            padding-left: 150px;
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            font-weight: 500;
          }
          img {
            height: 44px;
            width: 44px;
            float: right;
          }
        }
        .erweima {
          margin-top: 70px;
          text-align: center;
          img {
            width: 200px;
            height: 200px;
          }
        }
        .word {
          text-align: center;
          margin-top: 30px;
          span {
            font-size: 12px;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
  }
}
</style>