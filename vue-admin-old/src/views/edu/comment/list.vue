<template>
    <div class="app-container">
        Comment List

        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
    <el-form
      :inline="true" 
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="Content">
        <el-input
          v-model="commentQuery.content"
          placeholder="Content"
        ></el-input>
      </el-form-item>

      
     <el-form-item label="Create Time">
        <el-date-picker
          placeholder="Please select Start Time"
          v-model="commentQuery.begin"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          type="datetime"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="Please select End Time"
          v-model="commentQuery.end"
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
        element-loading-text="Data is loading..."
        v-loading="listLoading"
        >
        <el-table-column prop="date" label="No" width="70" align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="nickname" label="NickName" />
        <el-table-column prop="content" label="Comment Content" />
        <el-table-column prop="gmtCreate" label="Create Time" />


        <el-table-column label="Operation" width="200" align="center">
            <template slot-scope="scope">
            <router-link :to="'/comment/edit/' + scope.row.id">
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
import comment from '@/api/edu/comment'

export default {
    data(){//定义变量和初始值
        return {
            list:null, //查询之后接口返回的数据集合
            page:1,//current page
            limit:5, //no of entries per page
            total:0, //total entries
            commentQuery:{
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
            this.page = page
            comment.getCommentListPage(this.page,this.limit,this.commentQuery)
                .then(response =>{
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                }) //request成功

        },
        resetData(){
            //form 清空, because of V-model
            this.commentQuery={}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('This will permanently delete the comment. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => { //click confirm 
                comment.deleteCommentId(id) //implement delete method
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