<template>
  <div class="main" >
    <div style="white-space: pre;" >
      <img src="~/assets/img/logo3.png"  alt="logo" />
    </div>
    <div class="title">
      <a class="active" href="/login">Sign In</a>
      <span>·</span>
      <a href="/register">Sign Up</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="mobile"
          :rules="[
            {
              required: true,
              message: 'Please Enter Phone Number',
              trigger: 'blur',
            },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="Phone No" v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: 'Please Enter Password', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="password"
              v-model="user.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <p class="sign-up-msg">
          <br />
          <a href="/forgotten"
            >Forgotten Password ?</a
          >

        </p>

        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="Login"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <!-- <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"
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
import cookie from "js-cookie";
import loginApi from "@/api/login";
export default {
  layout: "sign",
  data() {
    return {
      user: {
        //封装用于登录的用户对象
        mobile: "",
        password: "",
      },
      //用于获取接口传来的token中的对象
      loginInfo: {},
    };
  },
  methods: {
    submitLogin() {
      loginApi.submitLogin(this.user).then((response) => {
        if (response.data.success) {
          //把token存在cookie中、也可以放在localStorage中
          //参数1：cookie名称，参数2：具体的值，参数3：作用范围
          cookie.set("guli_token", response.data.data.token, {
            domain: "localhost",
          });
          //登录成功根据token获取用户信息
          loginApi.getLoginUserInfo().then((response) => {
            this.loginInfo = JSON.stringify(response.data.data.userInfo);
            //将用户信息记录cookie
            cookie.set("guli_ucenter", this.loginInfo, { domain: "localhost" });
            //跳转页面
            window.location.href = "/";
            //this.$router.push({path:'/'})
            // const username = this.$cookies.get("username");
          });
        }
      });
    },
    checkPhone(rule, value, callback) {
      //debugger
      if (!/^(01)[0-46-9]*[0-9]{7,8}$/.test(value)) {
        return callback(new Error("Phone Format is Incorrect"));
      }
      return callback();
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}


</style>

