<template>
  <div class="main">
    <div style="white-space: pre;" >
      <img src="~/assets/img/logo3.png"  alt="logo" />
    </div>
    <div class="title" >
      <a href="/login">Sign In</a>
      <span>·</span>
      <a class="active" href="/register">Sign Up</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item
          class="input-prepend restyle"
          prop="nickname"
          :rules="[
            {
              required: true,
              message: 'Please Enter Nickname',
              trigger: 'blur',
            },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="Your Nickname"
              v-model="params.nickname"
            />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend restyle no-radius"
          prop="mobile"
          :rules="[
            { required: true, message: 'Please Enter Phone Number', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="Phone No"
              v-model="params.mobile"
            />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend restyle no-radius"
          prop="code"
          :rules="[
            { required: true, message: 'Please enter MSOS code', trigger: 'blur' },
          ]"
        >
          <div
            style="width: 100%; display: block; float: left; position: relative"
          >
            <el-input type="text" placeholder="MSOS code" v-model="params.code" />
            <i class="iconfont icon-phone" />
          </div>
          <div
            class="btn"
            style="position: absolute; right: 0; top: 6px; width: 40%"
          >
            <a
              href="javascript:"
              type="button"
              @click="getCodeFun()"
              :value="codeTest"
              style="border: none; background-color: none"
              >{{ codeTest }}</a
            >
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: 'Please enter Password', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="Set Password"
              v-model="params.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="Register"
            @click="submitRegister()"
          />
        </div>
        <p class="sign-up-msg">
          Click “Sign Up” Indicate that You Are Agree With
          <br />
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce"
            >User Agreement</a
          >
          And
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">Privacy Policy</a>
          。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <!-- <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";

import registerApi from "@/api/register";

export default {
  layout: "sign",
  data() {
    return {
      params: {
        mobile: "",
        code: "", //验证码
        nickname: "",
        password: "",
      },
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: "Request Code",
    };
  },
  methods: {
    // //通过输入的手机号，发送验证码
    getCodeFun() {
      //sending = false
      //his.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
      if (!this.sending) return;
      //debugger
      // prop 换成你想监听的prop字段
      this.$refs.userForm.validateField("mobile", (errMsg) => {
        if (errMsg == "") {
          registerApi.getMobile(this.params.mobile).then((res) => {
            this.sending = false;
            this.timeDown();
          });
        }
      });
    },
    //倒计时
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second;
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "Request Code";
        }
      }, 1000);
    },
    // //注册提交的方法
    submitRegister() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          registerApi.registerMember(this.params).then((response) => {
            //提示注册成功
            this.$message({
              type: "success",
              message: "Register Success!",
            });
            this.$router.push({ path: "/login" });
          });
        }
      });
    },
    checkPhone(rule, value, callback) {
      //debugger
      if (!/^(01)[0-46-9]*[0-9]{7,8}$/.test(value)) {
        return callback(new Error("Incorrect Phone Format"));
      }
      return callback();
    },
  },
};
</script>
