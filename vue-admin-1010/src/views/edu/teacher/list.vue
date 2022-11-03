<template>
    <div class="app-container">
        Teacher List

        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
    <el-form
      :inline="true" 
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="Name">
        <el-input
          v-model="teacherQuery.name"
          placeholder="Enter Name"
        ></el-input>
      </el-form-item>
      <el-form-item label="Level">
        <el-select v-model="teacherQuery.level" placeholder="Professional">
          <el-option label="Instructor" :value="1"></el-option>
          <el-option label="Professor" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Create Time">
        <el-date-picker
          placeholder="Select Begin Time"
          v-model="teacherQuery.begin"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          type="datetime"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="Select End Time"
          v-model="teacherQuery.end"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          type="datetime"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >Search</el-button
        >
        <el-button type="default" @click="resetData()">Clear</el-button>
      </el-form-item>

    </el-form>


        <!-- Table -->
        <el-table
        :data="list"
        style="width: 100%"
        border
        fit
        highlight-current-row
        element-loading-text="Data is loading"
        v-loading="listLoading"
        >
        <el-table-column prop="date" label="No" width="70" align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="name" label="Name" width="80"> </el-table-column>

        <el-table-column label="Level" width="85">
            <template slot-scope="scope">
            {{ scope.row.level === 1 ? "Instructor" : "Professor" }}
            </template>
        </el-table-column>

        <el-table-column prop="intro" label="Intro" />
        <el-table-column prop="gmtCreate" label="Create Time" width="160" />
        <el-table-column prop="sort" label="Sort" width="60" />
        <el-table-column label="Operation" width="200" align="center">
            <template slot-scope="scope">
            <router-link :to="'/edu/teacher/edit/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit"
                >Edit</el-button
                >
            </router-link>
            <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeDataById(scope.row.id)"
                >Delete</el-button
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
import teacher from '@/api/edu/teacher'

export default {
    //写核心代码的位子
    // data:{
    // },
    data(){//定义变量和初始值
        return {
            list:null, //查询之后接口返回的数据集合
            page:1,//current page
            limit:2, //no of entries per page
            total:0, //total entries
            teacherQuery:{} //query object, use v-model above to initialize and declare variable
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
            this.page = page
            teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
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
            this.teacherQuery={}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('This will permanently delete the teacher. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => { //click confirm 
                teacher.deleteTeacherId(id) //implement delete method
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
