<template>
  <div class="app-container">
    <h2 style="text-align: center">Publish New Course</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="Fill Course Info" />
      <el-step title="Create Course Outline" />
      <el-step title="Final Publish" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="Course Title">
        <el-input
          v-model="courseInfo.title"
          placeholder="AI : from starter"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
     <el-form-item label="Course Classification">
        <el-select
                v-model="courseInfo.subjectParentId"
                placeholder="First Level"
                @change="subjectLevelOneChanged"
                >
                <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"
                />
        </el-select>

        <el-select
                v-model="courseInfo.subjectId"
                placeholder="Second Level"
                >
                <el-option
                    v-for="subject in subjectTwoList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"
                />
        </el-select>
     </el-form-item>

      <!--课程讲师-->
      <el-form-item label="Course Instructor">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
            <el-option
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id"
                    ></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="Total Hours">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="Fill Total Course Hour"
        />
      </el-form-item>

        <!-- 课程简介-->
        <el-form-item label="Course Description">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>

      <!-- 课程封面 TODO -->
        <el-form-item label="Cover">
            <el-upload
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :action="BASE_API + '/eduoss/fileoss'"
                    class="avatar-uploader"
                    >
                <img :src="courseInfo.cover" />
            </el-upload>
        </el-form-item>


      <el-form-item label="Price">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >Save and Proceed to Next Step</el-button
        >
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce';//import the componenet

export default {
    //declare the component
  components:{ Tinymce },
  data() {
    return {
      saveBtnDisabled:false,
      courseInfo:{
          title: '',
          subjectId: '', //二级分类
          subjectParentId: '',//一级分类
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: '/static/click.jpg',
          price: 0
        },
        teacherList:[], //store all teachers 
        subjectOneList:[],
        subjectTwoList:[],
        BASE_API: process.env.BASE_API
    }
  },
  created(){
      //get router id (数据回显辨认)
      if(this.$route.params && this.$route.params.id){
          this.courseId = this.$route.params.id
          this.getInfo()
      }else{
        // this.subjectOneList={}
        // this.subjectTwoList={}
        //intialize all teacher
        this.getListTeacher()
        //intialize first level
        this.getOneSubject()
      }
  },
  watch:{ //监听让数据不会在添加页面回显，因为created()只执行一次
    $route(to, from){//once route link changed, this method will be executed
        if(this.$route.params && this.$route.params.id){
          this.courseId = this.$route.params.id
          this.getInfo()
        }else{
          this.courseInfo={}
          //intialize all teacher
          this.getListTeacher()
          //intialize first level
          this.getOneSubject()
        }
        
    }
  },
  methods:{
      //数据回显，根据课程id查询
      getInfo(){
          course.getCourseInfoId(this.courseId)
            .then(response =>{
                this.courseInfo = response.data.courseInfoVo

                //1.查询所有的分类（一级和二级）
                subject.getSubjectList
                    .then(response =>{
                        //2.获得所有一级
                        this.subjectOneList = response.data.list
                        //3.把一级分类数组遍历,跟下面的onchange event一样的code， subjectLevelOneChanged() 一样
                        for (var i=0 ;i< this.subjectOneList.length; i++) {
                           var oneSubject = this.subjectOneList[i]
                           if(this.courseInfo.subjectParentId == oneSubject.id){
                               this.subjectTwoList = oneSubject.children
                           }
                        }
                    })

                    this.getListTeacher()
            })
      },
      handleAvatarSuccess(resp,file) {
        this.courseInfo.cover = resp.data.url
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error("The avatar can only be JPG format!");
        }
        if (!isLt2M) {
            this.$message.error("Upload size could be more than 2MB!");
        }
        return isJPG && isLt2M;

      },
      //onchange event for first level subject to second lvl
      subjectLevelOneChanged(value){
          //value = first level id, VUE auto pass in the value
        for (let i = 0; i < this.subjectOneList.length; i++) { //loop the returned list 
            if (this.subjectOneList[i].id === value) {
                this.subjectTwoList = this.subjectOneList[i].children;
                this.courseInfo.subjectId = "";//clear the previous option
            }
         }

      },
      //get all first level subject
      getOneSubject(){
        subject.getSubjectList()
            .then(response =>{
                this.subjectOneList = response.data.list
            })  
      },
      getListTeacher(){
          course.getListTeacher()
            .then(response => {
                this.teacherList = response.data.items
            })
      },
      addCourse(){
        course.addCourseInfo(this.courseInfo)
            .then(response => {
                //prompt
                 this.$message({
                    type: 'success',
                    message: 'Add course success!'
                    });
                //proceed to next step
                this.$router.push({path:'/course/chapter/'+response.data.courseId}) //id for course_description table
            })
      },
      updateCourse(){
          course.updateCourseInfo(this.courseInfo)
            .then(response =>{
                 //prompt
                 this.$message({
                    type: 'success',
                    message: 'Update course success!'
                    });
                //proceed to next step
                this.$router.push({path:'/course/chapter/'+this.courseId}) //the update method won't return courseId
            })
      },
       saveOrUpdate(){
          if(!this.courseInfo.id){ //if the id is null
              this.addCourse()
          }else{
              this.updateCourse()
          }
      }
  }
};
</script>

<style scoped>
  .tinymce-container {
  line-height: 29px;
  }
</style>
