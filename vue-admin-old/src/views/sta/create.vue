<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="Date">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="Select Date for Statistic"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" @click="create()"
        >Generate</el-button
      >
    </el-form>
  </div>
</template>
<script>
import sta from '@/api/sta'
export default {
    data(){
        return{
            day:'',
            btnDisabled: false
        }
    },
    created(){

    },
    methods:{
        create(){
            sta.createStaData(this.day)
                .then(response =>{
                    //prompt message
                    this.$message({
                    type: 'success',
                    message: 'Generate Statistic Data Success!'
                    });
                    //redirect user to chart display page
                    this.$router.push({path:'/sta/show'})
                })
        }
    }
}
</script>