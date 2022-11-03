<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040b1b">
          <a target="_blank" :href="banner.linkUrl">
            <img
              :src="banner.imageUrl"
              :alt="banner.title"
            />
          </a>
        </div>

      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <div class="tableTitle"><span class="midText"></span></div> 
              <div> &nbsp; </div>
              <span class="c-333">Hot Courses</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in eduList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <!-- style="width:360px; height:185px" -->
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      />
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1"
                          >Start</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="course.title"
                        class="course-title fsize18 c- 333"
                        >{{course.title}}</a
                      >
                    </h3>
                    <section class="mt10 hLh20 of" v-if="Number(course.price) === 0">
                      <span class="fr jgTag bg-green" >
                        <i class="c-fff fsize12 f-fA">FREE</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.viewCount}} Views</i>

                      </span>
                    </section>

                    <section class="mt10 hLh20 of" v-else>
                      <span class="fr jgTag bg-green" >
                        <i class="c-fff fsize12 f-fA">${{course.price}}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.viewCount}} Views</i>
                        |
                        <i class="c-999 f-fA">{{course.buyCount}} Buy</i>
                      </span>
                    </section>
                    
                  </div>
                </li>
 
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">All Courses</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <div class="tableTitle"><span class="midText"></span></div>
              <div> &nbsp; </div>
              <span class="c-333">Branded Instructor</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a href="/teacher/1" :title="teacher.name">
                        <img
                          :alt="teacher.name"
                          :src="teacher.avatar"
                        />
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a href="/teacher/1" :title="teacher.name" class="fsize18 c-666"
                        >{{teacher.name}}</a
                      >
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999"
                        >{{teacher.career}}</span
                      >
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">
                        {{teacher.intro}}
                      </p>
                    </div>
                  </section>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">All Instructors</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /名师 结束 -->
    </div>
  </div>
</template>
<script>
import banner from '@/api/banner'
import index from '@/api/index'

export default {
  data() {
    return {
      swiperOption: {
        //配置Pagination
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置Navigation
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      bannerList:[],
      eduList:[],
      teacherList:[]
    }
  },
  created(){
    // this.checkCookie()
    this.getBannerList()
    this.getHotCourseTeacher()
  },
  methods:{
    //check cookie
    // checkCookie(){
    //   // if(!this.$cookies.get("guli_ucenter")){
    //   //   this.$router.push({path:'/login'})
    //   // }
    // },
    //get hot course and teacher
    getHotCourseTeacher(){
      index.getIndexData()
        .then(response=>{
          this.eduList = response.data.data.eduList
          this.teacherList = response.data.data.teacherList
        })
    },
    //get banner data
    getBannerList(){
      banner.getBannerList()
        .then(response =>{
          this.bannerList = response.data.data.list //since the utils/request.js is not returning response.data
        })
    }
  }
}
</script>

<style>

  .tableTitle {
    
    position: relative;
    margin: 0 auto;
    width: 1600px;
    height: 2px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
 .midText {
    
    position: absolute;
    left: 50%;
    background-color: #ffffff;
    padding: 0 15px;
    transform: translateX(-50%) translateY(-50%);
  }
</style>

