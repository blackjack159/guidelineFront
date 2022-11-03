<template>
    <div class="app-container">
        Banner List

        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
   

        <!-- Table -->
        <el-table
        :data="list"
        style="width: 76%"
        border
        fit
        highlight-current-row
        element-loading-text="Data is loading..."
        v-loading="listLoading" v-if="hasPerm('banner.list')"
        >
        <el-table-column prop="date" label="No" width="70" align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="title" label="Title" width="200"> </el-table-column>
        <el-table-column prop="linkUrl" label="Link Url" width="200"/>
        <el-table-column prop="gmtCreate" label="Create Time" width="200"/>
        <el-table-column prop="sort" label="Sort" width="60" />
        <el-table-column label="Operation" width="200" align="center">
            <template slot-scope="scope">
            <router-link :to="'/edu/banner/update/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" v-if="hasPerm('banner.update')"
                >Edit</el-button
                >
            </router-link>
            <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeDataById(scope.row.id)" v-if="hasPerm('banner.remove')"
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

        </el-pagination>

  </div>
</template>

<script>
import banner from '@/api/edu/banner'
export default {
    data(){//定义变量和初始值
        return {
            list:null, //查询之后接口返回的数据集合
            page:1,//current page
            limit:5, //no of entries per page
            total:0, //total entries
            bannerQuery:{} //query object, use v-model above to initialize and declare variable
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
            banner.getBannerListPage(this.page,this.limit)
                .then(response =>{
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                }) //request成功

        },
        resetData(){
            //form 清空, because of V-model
            this.bannerQuery={}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('This will permanently delete the banner. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => { //click confirm 
                banner.deleteBannerId(id) //implement delete method
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