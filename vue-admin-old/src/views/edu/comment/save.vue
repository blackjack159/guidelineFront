<template>
    <div class="app-container">
        Edit Comment
        <el-form label-width="120px">
            <el-form-item label="Content">
                <el-input v-model="comment.content" />
            </el-form-item>


            <el-form-item label="Nickname">
                <el-input v-model="comment.nickname" />
            </el-form-item>

            <el-form-item label="Create time" >
                <el-col :span="11">
                <el-date-picker disabled type="date" placeholder="Pick a date" v-model="comment.gmtCreate" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
  

            <el-form-item>
                <el-button
                        :disabled="saveBtnDisabled"
                        type="primary"
                        @click="saveOrUpdate"
                        >Save</el-button
                >
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import commentApi from '@/api/edu/comment'

export default{

    data() {
        return {

            comment:{
                content:'',
                gmtCreate:1,
                nickname:''
            },
            //上传弹框组件是否显示
            BASE_API:process.env.BASE_API, //得到dev.env.js内设置好的地址
            saveBtnDisabled:false //after submit,按钮禁用
        }
    },
    created() {
        this.init()
    },
    watch:{ //监听让数据不会在添加页面回显，因为created()只执行一次
        $route(to, from){//once route link changed, this method will be executed
            this.init()
        }
    },
    methods:{
        init() {
            //判断路径中是否有id值
            if(this.$route.params && this.$route.params.id){
                //从路径中获取id值
                const id = this.$route.params.id
                //调用根据id查询的方法
                this.getInfo(id)
            }else{
                //back to list page, router redirect
                this.$router.push({path:'/comment/table'})
            }
        },
        //get the Info of teacher via id
        getInfo(id){
            commentApi.getCommentInfo(id)
              .then(response =>{
                  this.comment = response.data.comment
                //   response.data.teacher can be viewed in console (a json data)
              })
        },
        saveOrUpdate() {
                //update teacher
                this.updateComment()
        },
        updateComment(){
            commentApi.updateComment(this.comment)
              .then(response =>{ //修改成功
                //prompt message
                this.$message({
                    type: 'success',
                    message: 'update successfully!'
                });
                //back to list page, router redirect
                this.$router.push({path:'/comment/table'})
              })
        }
    }
}
</script>
