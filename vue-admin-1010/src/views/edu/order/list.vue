<template>
    <div class="app-container">
        Order List

        <!--多条件查询form-->
        <!-- inline = show all content in one line -->
    <el-form
      :inline="true" 
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="Member Id">
        <el-input
          v-model="orderQuery.memberId"
          placeholder="Content"
        ></el-input>
      </el-form-item>

      <el-form-item label="Status">
        <el-select v-model="orderQuery.status" placeholder="Pay Stat">
          <el-option label="Paid" :value="1"></el-option>
          <el-option label="Not Paid" :value="0"></el-option>
        </el-select>
      </el-form-item>

      
     <el-form-item label="Create Time">
        <el-date-picker
          placeholder="Please select Start Time"
          v-model="orderQuery.begin"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          type="datetime"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="Please select End Time"
          v-model="orderQuery.end"
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
        v-loading="listLoading" v-if="hasPerm('order.list')"
        >
        <el-table-column prop="date" label="No" width="70" align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>
<!-- order_no, course_title, member_id, total_fee, status, gmtCreate, teacher_name -->
        <el-table-column prop="orderNo" label="Order Id" />
        <el-table-column prop="courseTitle" label="Course Title" />
        <el-table-column prop="teacherName" label="Teacher Name" />
        <el-table-column prop="memberId" label="Member Id" />
        <el-table-column prop="mobile" label="Phone No" />
        <el-table-column prop="totalFee" label="Fee" />
        <el-table-column prop="status" label="Pay Stat" />
        <el-table-column prop="gmtCreate" label="Create Time" />


        <el-table-column label="Operation" width="200" align="center">
            <template slot-scope="scope">
            <router-link :to="'/edu/order/edit/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" 
                >Edit</el-button
                >
            </router-link>
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
import order from '@/api/edu/order'

export default {
    data(){//定义变量和初始值
        return {
            list:null, //查询之后接口返回的数据集合
            page:1,//current page
            limit:5, //no of entries per page
            total:0, //total entries
            orderQuery:{
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
            order.getOrderListPage(this.page,this.limit,this.orderQuery)
                .then(response =>{
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                }) //request成功

        },
        resetData(){
            //form 清空, because of V-model
            this.orderQuery={}
            this.getList()
        }

    }
}
</script>