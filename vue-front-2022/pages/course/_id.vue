<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">Home</a>
        \
        <a href="#" title class="c-999 fsize14">{{courseWebVo.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{courseWebVo.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img height="357px" :src="courseWebVo.cover" :alt="courseWebVo.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{courseWebVo.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">Price：</span>
              <b class="c-yellow" style="font-size:24px;">{{courseWebVo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">Instructor： {{courseWebVo.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              
              <span v-if="stat" class="ml10 vam">
                <em class="icon18 scIcon" ></em>
                <a class="c-fff vam" title="Collected" @click="undoCollection()" href="#" >Collected</a>
              </span>

              <span v-else class="ml10 vam">
                <em class="icon18 scIcon" ></em>
                <a class="c-fff vam" title="Collect" @click="addCollection()" href="#" >Collect</a>
              </span>

            </section>
            <section v-if="isbuy || Number(courseWebVo.price) === 0" class="c-attr-mt">
              <a href="#" title="WatchNow" class="comm-btn c-btn-3">Watch Now</a>
            </section>
            <section v-else class="c-attr-mt">
              <a @click="createOrders()" href="#" title="PurchaseNow" class="comm-btn c-btn-3">Purchase Now</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Buy Count</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Course Hour</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">View Count</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="CourseDetail">Course Detail</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>Course Introduce</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseWebVo.description">
                        {{courseWebVo.description}}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>Course Outline</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="chapter in chapterVideoList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <span  v-if=" video.isFree === 1 || isbuy"> 
                                  <!-- <a :href="'/player/'+video.videoSourceId"  target="_blank"> -->
                                  <!-- <button @click="updateViewCount(video.videoSourceId)">mmm</button> -->
                                  <a href="#" @click="updateViewCount(video.videoSourceId)">
                                    <span class="fr">
                                      <i class="free-icon vam mr10">Available</i>
                                    </span>
                                    <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                  </a>
                                </span>

                               <span  v-else> 
                                  <a :href="'/player/'+video.videoSourceId" @click.prevent="" target="_blank">

                                    <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                  </a>
                                </span>

                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box" >
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">Course Instructor</a>
              </section>
              <section class="stud-act-list" >
                <ul style="height: 75px;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="courseWebVo.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{courseWebVo.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseWebVo.intro}}</span>
                    </section>
                    
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->

    <!-- comment start -->
    <div class="mt50 commentHtml">
    <div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">Course Comment</span>
        </h6>
        <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
                <li class="unBr">
                    <aside class="noter-pic">
                        <img
                             width="50"
                             height="50"
                             class="picImg"
                             src="~/assets/img/avatar-boy.gif"
                             />
                    </aside>
                    <div class="of">
                        <section class="n-reply-wrap">
                            <fieldset>
                                <textarea
                                          name=""
                                          v-model="comment.content"
                                          placeholder="Enter your comment..."
                                          id="commentContent"
                                          ></textarea>
                            </fieldset>
                            <p class="of mt5 tar pl10 pr10">
                                <span class="fl"
                                      ><tt
                                           class="c-red commentContentmeg"
                                           style="display: none"
                                           ></tt
                                    ></span>
                                <input
                                       type="button"
                                       @click="addComment()"
                                       value="Send"
                                       class="lh-reply-btn"
                                       />
                            </p>
                        </section>
                    </div>
                </li>
            </ul>
        </section>
        <section class="">
            <section class="question-list lh-bj-list pr">
                <ul class="pr10">
                    <li v-for="comment in data.list" :key="comment.id">
                        <aside class="noter-pic">
                            <img
                                 width="50"
                                 height="50"
                                 class="picImg"
                                 :src="comment.avatar"
                                 />
                        </aside>
                        <div class="of">
                            <span class="fl">
                                <font class="fsize12 c-blue">{{ comment.nickname }}</font>
                                <font class="fsize12 c-999 ml5">Comment：</font></span
                                >
                        </div>
                        <div class="noter-txt mt5">
                            <p>{{ comment.content }}</p>
                        </div>
                        <div class="of mt5">
                            <span class="fr"
                                  ><font class="fsize12 c-999ml5">{{
                                comment.gmtCreate
                                }}</font></span
                                >
                        </div>
                    </li>
                </ul>
            </section>
        </section>
        <!-- 公共分页 开始 -->
        <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
               :class="{ undisable: !data.hasPrevious }"
               href="#"
               title="首页"
               @click.prevent="gotoPage(1)"
               >First</a
                >
            <a
               :class="{ undisable: !data.hasPrevious }"
               href="#"
               title="前一页"
               @click.prevent="gotoPage(data.current - 1)"
               >&lt;</a
                >
            <a
               v-for="page in data.pages"
               :key="page"
               :class="{
                       current: data.current == page,
                       undisable: data.current == page,
                       }"
               :title="'第' + page + '页'"
               href="#"
               @click.prevent="gotoPage(page)"
               >{{ page }}</a
                >
            <a
               :class="{ undisable: !data.hasNext }"
               href="#"
               title="后一页"
               @click.prevent="gotoPage(data.current + 1)"
               >&gt;</a
                >
            <a
               :class="{ undisable: !data.hasNext }"
               href="#"
               title="末页"
               @click.prevent="gotoPage(data.pages)"
               >Last</a
                >
            <div class="clear" />
        </div>
        <!-- comment公共分页 结束 -->
        
    </div>


  </div>  
  <!-- comment end -->

  </div>
</template>

<script>
import courseApi from '@/api/course'
import ordersApi from '@/api/orders'
import comment from '@/api/comment'
import collection from '@/api/collection'

export default {
   asyncData({ params, error }) {
    return {courseId: params.id}
    // return courseApi.getCourseInfo(params.id)
      // .then(response =>{
      //   return {
      //     courseWebVo : response.data.data.courseWebVo,
      //     chapterVideoList: response.data.data.chapterVideoList,
      //     courseId: params.id
      //   }
      // })
   },
   data(){
    return{
      courseWebVo:{},
      chapterVideoList: [],
      isbuy: false,


      data: {},
      page: 1,
      limit: 4,
      total: 10,
      comment: {
        content: "",
        courseId: "",
        teacherId: "",
      },

      stat: false,
      collection:{
        courseId: "",
      },

      videoId: '',
    }
   },
   created(){ //execute before page rendering
    this.initCourseInfo()

    this.initComment()

    this.initCollectionStat()
   },
   methods:{
    //get collection stat
    initCollectionStat(){
      collection.getCollectionStat(this.courseId)
        .then(response =>{
          this.stat = response.data.data.stat
        })
    },
    //add to user's collection
    addCollection(){
      this.collection.courseId = this.courseId;
      collection.addToCollection(this.collection).then((response) =>{
        if(response.data.success) {
          this.$message({
            message: "Add to Collection Success!",
            type: "success",
          });
        
          this.initCollectionStat()
        }
      })
    },
    //delete from user's collection
    undoCollection(){
      collection.undoCollection(this.courseId).then(response =>{
        if(response.data.success){
            this.$message({
            message: "Remove from Collection Success!",
            type: "success",
          });
        
          this.initCollectionStat()
        }
       })
    },
    //get course detail info
    initCourseInfo(){
      courseApi.getCourseInfo(this.courseId)
      .then(response =>{
          this.courseWebVo=response.data.data.courseWebVo,
          this.chapterVideoList=response.data.data.chapterVideoList,
          this.isbuy=response.data.data.isBuy
          console.log(response.data.data);
      })
    },
    createOrders(){
      ordersApi.createOrders(this.courseId)
        .then(response =>{
          //get the return order id
          if(!this.stat){
            this.addCollection()
          }
          //after generate order, direct to order display page
          this.$router.push({path:'/orders/'+response.data.data.orderId})
        })
    },
    initComment() {
      comment.getPageList(this.page, this.limit, this.courseId)
        .then((response) => {
          this.data = response.data.data;
          // console.log(response.data.data);
        });
    },
    addComment() {
      this.comment.courseId = this.courseId;
      this.comment.teacherId = this.courseWebVo.teacherId;
      comment.addComment(this.comment).then((response) => {
        if (response.data.success) {
          this.$message({
            message: "Comment Success!",
            type: "success",
          });
          this.comment.content = "";
          this.initComment();
        }
      });
    },
    gotoPage(page) {
      comment.getPageList(page, this.limit, this.courseId).then((response) => {
        this.data = response.data.data;
      });
    },
    updateViewCount(videoSourceId){
      this.videoId = videoSourceId;
      courseApi.updateViewCount(this.courseId).then((response) =>{
          // this.$router.push({path:'/player/'+this.videoId})
          let routerjump = this.$router.resolve({ path:'/player/'+this.videoId})
          window.open(routerjump.href, '_blank');
      })
    }
   }
};
</script>
