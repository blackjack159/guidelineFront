<template>
      <div class="app-container">
    <el-form label-width="120px">
      <!-- <el-form-item label="信息描述"> -->
      <el-form-item label="Description">
        <el-tag type="info">Excel Template</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="'/static/01.xlsx'">Click to Download</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="Upload Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API + '/eduservice/edu-subject/addSubject'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary"
            >Select File</el-button
          >
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >Upload to Server</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API, // 接口API地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false
        }
    },
    created() {

    },
    methods:{
        //点击按钮上传文件到接口
        submitUpload() {
        this.importBtnDisabled = true;
        this.loading = true;
        //js: document.getElementById("upload").submit()
        this.$refs.upload.submit();
        },
        //上传成功后
        fileUploadSuccess(resp) {
        // if (resp.success === true) {
            this.loading = false;
            this.$message({
            type: "success",
            message: 'Add subject success',
            });
            //router redirect
            this.$router.push({path:'/edu/subject/list'})
        // }
        },
        //上传失败后
        fileUploadError() {
        this.loading = false;
        this.$message({
            type: "error",
            message: "Add subject failed",
        });
        }
    }
}
</script>