<template>
    <div class="app-container">
        Add Banner
        <el-form label-width="120px">
            <el-form-item label="Banner Title">
                <el-input v-model="banner.title" />
            </el-form-item>
            <el-form-item label="Banner Sort">
                <el-input-number
                        v-model="banner.sort"
                        controls-position="right"
                        min="0"
                        />
            </el-form-item>

            <el-form-item label="Banner Link">
                <el-input v-model="banner.linkUrl" />
            </el-form-item>

            <!-- 讲师头像 -->
            <el-form-item label="Banner Image">
                <!-- 头衔缩略图 -->
                <pan-thumb :image="banner.imageUrl" />
                <!-- 文件上传按钮 -->
                <el-button
                        type="primary"
                        icon="el-icon-upload"
                        @click="imagecropperShow = true"
                        >Change Image
                </el-button>
                <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
            :url：后台上传的url地址
            @close：关闭上传组件
            @crop-upload-success：上传成功后的回调 -->
            <!-- v-show 如果true其他的就生效，v-show被 上面的@click="imagecropperShow"时间控制 -->
                <image-cropper
                            v-show="imagecropperShow" 
                            :width="300"
                            :height="300"
                            :key="imagecropperKey"
                            :url="BASE_API + '/eduoss/fileoss'"
                            field="file"
                            @close="close"
                            @crop-upload-success="cropSuccess"
                            />
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
import bannerApi from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default{
      //声明引入的组件
    components:{ImageCropper,PanThumb},
    data() {
        return {

            banner:{
                title:'',
                sort:1,
                linkUrl:'',
                imageUrl:''
            },
            //上传弹框组件是否显示
            imagecropperShow:false,
            imagecropperKey:0, //上传组件
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
        close(){//close the 上传弹框方法
            this.imagecropperShow=false
            this.imagecropperKey = this.imagecropperKey+1
        },
        cropSuccess(data){
            this.imagecropperShow=false
            this.banner.imageUrl = data.url 
            //data.url 相当于 response.data.url ，因为这是组件的功能所以不需要response,比较特别，属于ajax请求从后台获得数据

            this.imagecropperKey = this.imagecropperKey+1
        },
        init() {
            //判断路径中是否有id值
            if(this.$route.params && this.$route.params.id){
                //从路径中获取id值
                const id = this.$route.params.id
                //调用根据id查询的方法
                this.getInfo(id)
            }else{
                this.banner = {}
            }
        },
        //get the Info of teacher via id
        getInfo(id){
            bannerApi.getBannerInfo(id)
              .then(response =>{
                  this.banner = response.data.banner
                //   response.data.teacher can be viewed in console (a json data)
              })
        },
        saveOrUpdate() {
            //判断修改或添加，根据teacher是否有id,因为getInfo 提供的json teacher 有id
            if(!this.banner.id){
                //add teacher
                this.saveBanner()
            }else{
                //update teacher
                this.updateBanner()
            }

        },
        updateBanner(){
            bannerApi.updateBanner(this.banner)
              .then(response =>{ //修改成功
                //prompt message
                this.$message({
                    type: 'success',
                    message: 'update successfully!'
                });
                //back to list page, router redirect
                this.$router.push({path:'/banner/table'})
              })
        },
        //add teacher only
        saveBanner() {
            bannerApi.addBanner(this.banner)
              .then(response =>{ //添加成功
                //prompt message
                this.$message({
                    type: 'success',
                    message: 'add successfully!'
                });
                //back to list page, router redirect
                this.$router.push({path:'/banner/table'})
              })
        }
    }
}
</script>
