<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="GuideLine Education Centre">
            <img
              src="~/assets/img/logo.png"
              width="100%"
              alt="GuideLine Education Centre"
            />
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>Home</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>Course</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>Instructor</a>
            </router-link>
            <!-- <router-link to="/article" tag="li" active-class="current">
              <a></a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </router-link> -->
          </ul>
       
<!-- / nav -->
<ul class="h-r-login">
    <li v-if="!loginInfo.id" id="no-login">
        <a href="/login" title="Sign In">
            <em class="icon18 login-icon">&nbsp;</em>
            <span class="vam ml5">Login</span>
        </a>
        <a href="/register" title="Sign Up">
            <span class="vam ml5">Sign Up</span>
        </a>
    </li>

    <li v-if="loginInfo.id" id="is-login-one" class="mr10">
        <!-- <a id="headerMsgCountId" href="#" title="消息"> -->
        <!-- <a id="headerMsgCountId" href="/collection" title="Collection">
            <em class="icon18 news-icon">&nbsp;</em>
        </a> -->
             <a href="/collection" title>
            <img
                 src="~/assets/img/ribbon.png"
                 width="30"
                 height="30"
                 class="vam picImg"
                 alt
                 />
        </a>
        <q class="red-point" style="display: none">&nbsp;</q>
    </li>
    
    <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
 

        <a href="/ucenter" title>
            <img
                 :src="loginInfo.avatar"
                 width="30"
                 height="30"
                 class="vam picImg"
                 alt
                 />
            <span id="userName" class="vam disIb">&nbsp;&nbsp;{{
                loginInfo.nickname
                }}</span>
        </a>
        <a
           href="javascript:void(0);"
           title="Logout"
           @click="logout()"
           class="ml5"
           > | Log Out</a
            >
    </li>
    <!-- /未登录显示第1 li；登录后显示第2，3 li -->
</ul>


          <!-- <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入你想学的课程"
                  name="queryCourse.courseName"
                  value
                />
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside> -->
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
      
	<nuxt />
      
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">External Links</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.ckc.com/" title="GuideLine" target="_blank"
                >GuideLine</a
              >
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="AboutUs" target="_blank">About Us</a>|
                <a href="#" title="ContactUs" target="_blank">Contact Us</a>|
                <a href="#" title="HelpCentre" target="_blank">Help Centre</a>|
                <a href="#" title="ResourceDownload" target="_blank">Resource Download</a>|
                <span>Hotline：01333345670(Nilai) 01444456789(Selangor)</span>
                <span>Email：GuideLine99@gmail.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2022 GuideLine Education</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <!-- <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section> -->
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"


import cookie from "js-cookie";
export default {
  data(){
    return{
      token:'',
      loginInfo:{
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: ""
      }
    }
  },
  created(){
    this.showInfo()
  },
  methods:{
    //create method, take user info from cookie
  showInfo() {
      //从cookie中获取信息
      var userStr = cookie.get("guli_ucenter");
      //转字符串转换成json对象(js对象)
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
      }else{
        // window.location.href = "/login";
        this.$router.push({path:'/login'})
      }
    },

    logout(){
      cookie.set('guli_token','',{domain: 'localhost'})
      cookie.set('guli_ucenter','',{domain: 'localhost'})

      //back to home page
      window.location.href = "/";
    }
  }
};
</script>
