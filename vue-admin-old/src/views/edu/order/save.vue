<template>
    <div class="app-container">
        Edit Order
        <el-form label-width="120px">
            <el-form-item label="Phone Number">
                <el-input v-model="order.mobile" />
            </el-form-item>

        <el-form-item label="Status">
            <el-select v-model="order.status" placeholder="Pay Stat">
            <el-option label="Paid" :value="1"></el-option>
            <el-option label="Not Paid" :value="0"></el-option>
            </el-select>
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
import orderApi from '@/api/edu/order'

export default{

    data() {
        return {

            order:{
                mobile:'',
                status:"0"
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
                this.$router.push({path:'/order/table'})
            }
        },
        //get the Info of teacher via id
        getInfo(id){
            orderApi.getOrderInfo(id)
              .then(response =>{
                  this.order = response.data.order
                //   response.data.teacher can be viewed in console (a json data)
              })
        },
        saveOrUpdate() {
                //update teacher
                this.updateOrder()
        },
        updateOrder(){
            orderApi.updateOrder(this.order)
              .then(response =>{ //修改成功
                //prompt message
                this.$message({
                    type: 'success',
                    message: 'update successfully!'
                });
                //back to list page, router redirect
                this.$router.push({path:'/order/table'})
              })
        }
    }
}
</script>
