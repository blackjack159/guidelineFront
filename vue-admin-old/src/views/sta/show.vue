<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="Please Select">
          <el-option label="Login Daily Statistic" value="login_num" />
          <el-option label="Registration Daily Statistic" value="register_num" />
          <el-option label="Video View Daily Statistic" value="video_view_num" />
          <el-option label="Course Number Daily Statistic" value="course_num" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="Start Date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="End Date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()"
        >Show</el-button
      >
    </el-form>
    <div class="chart-container">
      <div id="chart" class="chart" style="height: 500px; width: 100%" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import staApi from '@/api/sta'

export default {
    data(){
        return{
            searchObj:{},
            btnDisabled:false,
            xData:[],
            yData:[]
        }
    },
    created(){

    },
    methods:{
        showChart(){
          staApi.getDataSta(this.searchObj)
            .then(response =>{
              this.xData = response.data.date_calculatedList
              this.yData = response.data.numDataList

              //invoke the method below to generate Chart
              this.setChart()
            })
        },
        setChart(){
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById("chart"));
            // console.log(this.chart)
            // 指定图表的配置项和数据
            var option = {
                title:{
                  text: 'Data Statistic'
                },
                tooltip:{
                  trigger: 'axis'
                },
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                type: "category",
                data: this.xData,
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                type: "value",
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [
                {
                    // 系列中的数据内容数组
                    data: this.yData,
                    // 折线图
                    type: "line",
                },
                ],
            };
            this.chart.setOption(option);

        }
    }
}
</script>
