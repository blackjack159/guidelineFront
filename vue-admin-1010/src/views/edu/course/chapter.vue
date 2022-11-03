<template>
  <div class="app-container">
    <h2 style="text-align: center">Publish New Course</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="Fill Course Info" />
      <el-step title="Create Course Outline" />
      <el-step title="Final Publish" />
    </el-steps>

<el-button type="text" @click="openChapterDialog()">Add Chapter</el-button>

 <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="openVideo(chapter.id)">Add Lesson</el-button>
            <el-button style="" type="text" @click="openEditChapter(chapter.id)">Edit</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">Delete</el-button>
          </span>
        </p>

        <!-- <ul>
          <li v-for="video in chapter.children" :key="video.id">
            {{ video.title }}
          </li>
        </ul> -->
      <!-- </li>
      <li> -->
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="openEditVideo(video.id)">Edit</el-button>
                <el-button type="text" @click="removeVideo(video.id)">Delete</el-button>
              </span>
            </p>
          </li>
        </ul>
        
      </li>
    </ul>

        <div>
        <el-button @click="previous">Back To Previous Step</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >Proceed to Next Step</el-button
        >
        </div>


    <!-- Form -->
<!-- dialog box弹框 for Chapter -->
<el-dialog title="Add Chapter" :visible.sync="dialogChapterFormVisible">
  <el-form :model="form" label-width="120px">
    <el-form-item label="Chapter Title" >
      <el-input v-model="chapter.title" ></el-input>
    </el-form-item>
    <el-form-item label="Chapter Sort" >
      <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogChapterFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="saveOrUpdate">Confirm</el-button>
  </span>
</el-dialog>

<!--添加小节表单-->
    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="Add Lesson">
      <el-form :model="video" label-width="120px">
        <el-form-item label="Lesson Title">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="Lesson Sort">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-
            position="right"
          />
        </el-form-item>
        <el-form-item label="Free">
          <el-radio-group v-model="video.isFree" @change="Change_radio(video)">
            <el-radio :label=1 >Free</el-radio>
            <el-radio :label=0 >Default</el-radio>
          </el-radio-group>
        </el-form-item>

 <!-- 上传视频 -->
  <el-form-item label="Upload Video">
        <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAliyunVideo'"
            :limit="1"
            class="upload-demo">
        <el-button size="small" type="primary">Upload Video</el-button>
        <el-tooltip placement="right-end">
            <div slot="content">Maximum support 1G，<br>
                Support 3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM ,etc file format</div>
            <i class="el-icon-question"/>
        </el-tooltip>
        <el-label v-if="video.videoSourceId">[With Video]</el-label>
        </el-upload>
    </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">Cancel</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo(video.id)"
          >Confirm</el-button
        >
      </div>
    </el-dialog>
  </div>



</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId:'',
      chapterVideoList:[],
      chapter:{ //章节数据
        title: '',
        sort: 0
      },
      video: {
        title: '',
        sort: 0,
        isFree:-1,
        videoSourceId: '',
        videoOriginalName: ''
      },
      dialogChapterFormVisible:false, //弹框dialog box
      dialogVideoFormVisible:false, //video lesson dialog box
      fileList: [],//上传文件列表
      BASE_API: process.env.BASE_API // 接口API地址
    }
  },
  created() {
      //获取router的id值,查看是否有id
      if(this.$route.params && this.$route.params.id){
          this.courseId = this.$route.params.id
          this.getChapterVideo()
      }
  },
  methods: {
           //点击确定调用的方法
        handleVodRemove() {
            //调用接口的删除视频的方法
            video.deleteAliyunvod(this.video.videoSourceId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: 'Delete Video Success!'
                    });
                    //把文件列表清空
                    this.fileList = []
                    //把video视频id和视频名称值清空
                    //上传视频id赋值
                    this.video.videoSourceId = ''
                    //上传视频名称赋值
                    this.video.videoOriginalName = ''
                })
        },
        //点击×调用这个方法
        beforeVodRemove(file,fileList) {
            return this.$confirm(`Confirm to remove ${ file.name }？`);
        },
        
        //上传视频成功调用的方法
        handleVodUploadSuccess(response, file, fileList) {
            //上传视频id赋值
            this.video.videoSourceId = response.data.videoId
            //上传视频名称赋值
            this.video.videoOriginalName = file.name
        },
        handleUploadExceed() {
            this.$message.warning('Please remove uploaded video before uploading video')
        },
// ===============================VIDEO================================
    removeVideo(id){
        this.$confirm('This will permanently delete the video. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
        }).then(() => { //click confirm 
            video.deleteVideo(id) //implement delete method
            .then(response =>{
                //prompt message
                this.$message({
                type: 'success',
                message: 'Delete video completed'
                });

                //refresh page and data
                this.getChapterVideo()
            })
        })//点击取消
    },
    //添加小节弹框的方法
    openVideo(chapterId){
      //弹dialog box for video
      this.dialogVideoFormVisible = true
      //set the chapter id, for adding into database of video
      this.video.chapterId= chapterId
      this.video.title=''
      this.video.sort=0
      this.video.isFree=-1
      this.video.videoSourceId=''
    },
    //添加小节
    addVideo(){
      //set courseId for adding into database of video
      this.video.courseId = this.courseId
      video.addVideo(this.video)
        .then(response =>{
           //关闭弹框
          this.dialogVideoFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: 'Add video success!'
          });
          //刷新页面
          this.getChapterVideo()
        })
    },
    Change_radio(e){
      this.$forceUpdate()
    },
    //弹出编辑小节页面
      openEditVideo(id){
        //弹框
          this.dialogVideoFormVisible = true;
        //调用接口 
          video.getVideoById(id)
            .then(response => {
                this.video = response.data.video
                if(this.video.isFree == 1){
                  this.video.isFree = 1
                }else{
                  this.video.isFree = 0
                }
                console.log(video)
            })
      },
     //修改章节
      updateVideo(){
          video.updateVideo(this.video)
            .then(response => {
                 //第一步  关闭弹框
                this.dialogVideoFormVisible = false
                //第二步 提示信息
                  this.$message({
                        type: 'success',
                        message: 'Update Lesson Success'
                    }); 
                this.video.id=''
                //第三步 刷新数据
                this.getChapterVideo()
            })
      },
    saveOrUpdateVideo(){
      // this.addVideo()
      if(!this.video.id){
        this.addVideo()
      }else{
        this.updateVideo()
        // this.video.id = ''
      }
    },
// ===============================CHAPTER==============================
    //删除章节
    removeChapter(chapterId){
        this.$confirm('This will permanently delete the chapter. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
        }).then(() => { //click confirm 
            chapter.deleteChapter(chapterId) //implement delete method
            .then(response =>{
                //prompt message
                this.$message({
                type: 'success',
                message: 'Delete completed'
                });

                //refresh page and data
                this.getChapterVideo()
            })
        
        })
    },
    //修改章节弹框（数据回显）
    openEditChapter(chapterId){
      //弹dialog box
      this.dialogChapterFormVisible = true
      //invoke backend method
      chapter.getChapter(chapterId)
        .then(response => {
          this.chapter = response.data.chapter
        })
    },
    //弹出dialog box & clear content
    openChapterDialog(){
      //弹dialog box
      this.dialogChapterFormVisible = true
      //clear content
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    //修改章节
    updateChapter(){
        chapter.updateChapter(this.chapter)
          .then(response =>{
            //关闭弹框
            this.dialogChapterFormVisible = false
            //提示
            this.$message({
              type: 'success',
              message: 'Update chapter success!'
            });
            //刷新页面
            this.getChapterVideo()
          })
    },
    addChapter(){
      //设置courseid到 chapter object
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter)
        .then(response =>{
          //关闭弹框
          this.dialogChapterFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: 'Add chapter success!'
          });
          //刷新页面
          this.getChapterVideo()
        })
    },
    //添加章节
    saveOrUpdate(){
      if(!this.chapter.id){
        this.addChapter()
      }else{
        this.updateChapter()
      }
    },
    //根据课程id查询章节和小节
    getChapterVideo(){
        chapter.getAllChapterVideo(this.courseId)
            .then(response => {
                this.chapterVideoList = response.data.allChapterVideo
            })
    },
    //跳转到上一步
    previous() {
      this.$router.push({ path: '/edu/course/info/'+this.courseId});
    },
    next() {
      //跳转到第三步
      this.$router.push({ path: '/edu/course/publish/'+this.courseId});
    },
  }
};
</script>

<style scoped>

.chanpterList{
    position:relative;
    list-style:none;
    margin:0;
    padding:0;
}

.chanpterList li{
    position:relative;
}

.chanpterList p{
    float:left;
    font-size:20px;
    margin:10px 0;
    padding:10px;
    height:70px;
    line-height:50px;
    width:100%;
    border:1px solid #DDD;
}

.chanpterList .acts{
    float:right;
    font-size: 14px;
}

.videoList{
    padding-left:50px;
}

.videoList p{
    float:left;
    font-size:14px;
    margin:10px 0;
    padding:10px;
    height:50px;
    line-height: 30px;
    width:100%;
    border:1px dotted #DDD;
}
</style>
