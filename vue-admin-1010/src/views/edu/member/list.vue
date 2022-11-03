<template>
    <div class="app-container">
        Member List

        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
    <el-form
      :inline="true" 
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="Nickname">
        <el-input
          v-model="userQuery.nickname"
          placeholder="Enter Nickname"
        ></el-input>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="userQuery.isDisabled" placeholder="Status">
          <el-option label="Banned" :value=true></el-option>
          <el-option label="Not Banned" :value=false></el-option>
        </el-select>
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
        v-loading="listLoading" v-if="hasPerm('member.list')"
        >
        <el-table-column prop="date" label="No" width="70" align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="id" label="Id" width="80"> </el-table-column>
        <el-table-column prop="nickname" label="NickName" />
        <el-table-column label="Status" width="80">
            <template slot-scope="scope">
            {{ scope.row.isDisabled === true ? "Banned" : "Not Banned" }}
            </template>
        </el-table-column>

        <el-table-column label="Operation" width="200" align="center">
            <template slot-scope="scope">

            <el-button
                type="danger"
                size="mini"
                icon="el-icon-edit"
                @click="banUser(scope.row.id,scope.row.isDisabled)"
                >{{scope.row.isDisabled === false ? "Ban" : "Unban"}}</el-button
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
import member from '@/api/edu/member'

export default {
    data(){//定义变量和初始值
        return {
            list:null, //查询之后接口返回的数据集合
            page:1,//current page
            limit:5, //no of entries per page
            total:0, //total entries
            userQuery:{
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
            member.getUserListPage(this.page,this.limit,this.userQuery)
                .then(response =>{
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list) 
                    console.log(this.total)
                }) //request成功

        },
        banUser(id,disable){
            this.$confirm('This will ban the member from login. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => { //click confirm 
                member.banUser(id,disable) //implement delete method
                .then(response =>{
                    //prompt message
                    this.$message({
                    type: 'success',
                    message: 'Operation completed'
                    });

                    //return to list page
                    this.getList()
                })
            })
        },
        resetData(){
            //form 清空, because of V-model
            this.userQuery={}
            this.getList()
        }

    }
}
</script>