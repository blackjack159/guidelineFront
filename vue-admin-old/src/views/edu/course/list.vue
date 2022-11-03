<template>
    <div class="app-container">
        Course List

        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
    <el-form
      :inline="true" 
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="Course Title" class="demo-form-inline">
        <el-input
          v-model="courseQuery.title"
          placeholder="Enter Course Title"
        ></el-input>
      </el-form-item>

      <el-form-item label="Status">
        <el-select v-model="courseQuery.status" placeholder="Course Status">
          <el-option label="Published" value="Normal"></el-option>
          <el-option label="Not Publish" value="Draft"></el-option>

        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>

    </el-form>


        <!-- Table -->
        <el-table
        :data="list"
        style="width: 100%"
        border
        fit
        highlight-current-row
        element-loading-text="数据加载中"
        v-loading="listLoading"
        >
        <el-table-column prop="date" label="序号" width="70" align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="title" label="课程名称" width="80"> </el-table-column>

        <el-table-column label="Course Stat" width="80">
            <template slot-scope="scope">
            {{ scope.row.status === "Normal" ? "Published" : "Not Published" }}
            </template>
        </el-table-column>

        <el-table-column prop="lessonNum" label="Course Hour" />
        <el-table-column prop="gmtCreate" label="Create Time" width="160" />
        <el-table-column prop="viewCount" label="Browse Number" width="60" /> 
<!-- liu lan shu liang -->
        <el-table-column label="Operation" width="200" align="center">
            <template slot-scope="scope">
            <router-link :to="'/course/info/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit"
                >Edit Course Info</el-button>
            </router-link>

            <router-link :to="'/course/chapter/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit"
                >Edit Course Outline</el-button>
            </router-link>

            <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeDataById(scope.row.id)"
                >Delete Course</el-button
            >
            <!-- scope.row.xx 要根据 backend 的class attribute -->
            </template>
        </el-table-column>
        </el-table>

    <!-- pagination -->
    <!-- : 是 v-bind 单向绑定 -->
        <el-pagination
               :total="total"
               :page-size="limit"
               :current-page="page"
               style="padding: 30px 0; text-align: center"
               layout="total, prev, pager, next,jumper"
               @current-change="getList"
               >
               <!-- @current绑定javascript, current-change会传param给getList -->
        </el-pagination>

  </div>
</template>



<script>
//引入teacher.js文件，自己写的
import course from '@/api/edu/course'

export default {

    data(){//定义变量和初始值
        return {
            list:null, //查询之后接口返回的数据集合
            page:1,//current page
            limit:2, //no of entries per page
            total:0, //total entries
            courseQuery:{
              status:""
            } //query object, use v-model above to initialize and declare variable
        }
    },
    created(){ //before rendering page
        //invoke the method declared in "methods:" below
        this.getList()
    },
    methods:{ // creater and invoke method in teacher.js
        //讲师列表的方法, 因为teacher.js 有import一个包会自动解析axios 请求，所以无需在解析
        //page = 1是如果没有param传入就默认
        getList(page = 1){
            // // this.page = page
            // course.getListCourse()
            //     .then(response =>{
            //         //response接口返回的数据
            //         // console.log(response)
            //         this.list = response.data.list
            //     }) //request成功
            this.page = page
            course.getCourseListPage(this.page,this.limit,this.courseQuery)
                .then(response =>{
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list) 
                    console.log(this.total)
                }) //request成功

        },
        resetData(){
            //form 清空, because of V-model
            this.courseQuery={}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('This will permanently delete the course. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => { //click confirm 
                course.deleteCourseId(id) //implement delete method
                .then(response =>{
                    //prompt message
                    this.$message({
                    type: 'success',
                    message: 'Delete completed'
                    });

                    //return to list page
                    this.getList()
                })
            
            })
        }

    }   
}
</script>
