<template>
  <div class="app-container">
    <h2 style="text-align: center">Publish New Course</h2>
    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="Fill Course Info" />
      <el-step title="Create Course Outline" />
      <el-step title="Final Publish" />
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublish.cover" />
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray">
          <span>Total {{ coursePublish.lessonNum }} Hours</span>
        </p>
        <p>
          <span
            >Classification：{{ coursePublish.subjectLevelOne }} —
            {{ coursePublish.subjectLevelTwo }}</span
          >
        </p>
        <p>Instructor：{{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>

    <div>
        <el-button @click="previous">Back to Previous Step</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish" v-if="hasPerm('course.publish')"
          >Publish Course</el-button
        >
    </div>
  </div>
</template>


<script>
import course from '@/api/edu/course'
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId:'',
      coursePublish:{}
    }
  },
  created(){
    //获取router课程id值
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      //调用接口方法根据课程id查询
      this.getCoursePublishId()
    }
  },
  methods: {
    //根据course id 查询
    getCoursePublishId(){
      course.getPublishCourseInfo(this.courseId)
        .then(response =>{
          this.coursePublish = response.data.publishCourse
        })
    },
    //跳转到上一步
    previous() {    
      this.$router.push({ path: '/edu/course/chapter/'+this.courseId });
    },
    publish(){
      course.publishCourse(this.courseId)
        .then(response =>{
          //提示
          this.$message({
            type:'success',
            message:'Publish the course success!'
          });
          this.$router.push({ path: '/edu/course/list' })
        })
        //跳转到course list page

    }

  },
};
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}
.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
