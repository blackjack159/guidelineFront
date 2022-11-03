<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
         <el-input v-model="searchObj.username" placeholder="Username"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">Search</el-button>
      <el-button type="default" @click="resetData()">Clear</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="addUser()" v-if="hasPerm('user.add')">Add</el-button>
      <el-button type="danger" size="mini" @click="removeRows()" v-if="hasPerm('user.remove')">Delete Batch</el-button>

    </div>

    <!-- 讲师列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange" v-if="hasPerm('user.list')">

      <el-table-column
        type="selection"
        width="55" />

      <el-table-column
        label="No"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="User Name" width="150" />

      <el-table-column prop="nickName" label="Nickname" />

      <el-table-column prop="gmtCreate" label="Create Time" width="180"/>

      <el-table-column label="Operation" width="230" align="center">
        <template slot-scope="scope">
          <router-link :to="'/acl/user/role/'+scope.row.id">
            <el-button type="info" size="mini" icon="el-icon-info" v-if="hasPerm('user.assign')"></el-button>
          </router-link>
          <router-link :to="'/acl/user/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" v-if="hasPerm('user.update')"></el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)" v-if="hasPerm('user.remove')"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
           
  </div>
</template>

<script>
import user from '@/api/acl/user'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 讲师列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单对象
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    this.fetchData()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    console.log('list mounted......')
  },

  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    addUser(){
      this.$router.push({ path: '/acl/user/add' })
    },

    // 加载讲师列表数据
    fetchData(page = 1) {
      // console.log('翻页。。。' + page)
      // 异步获取远程数据（ajax）
      this.page = page

      user.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.items
          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    // 重置查询表单
    resetData() {
      // console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },

    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm('This operation will permenantly delete this record.', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return user.removeById(id)
      }).then((response) => {
        this.fetchData(this.page)
        if (response.success) {
          this.$message({
            type: 'success',
            message: 'Delete Success!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled Delete'
        })
      })
    },

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      console.log('handleSelectionChange......')
      console.log(selection)
      this.multipleSelection = selection
    },

    // 批量删除
    removeRows() {
      console.log('removeRows......')

      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: 'Please select records to be deleted!'
        })
        return
      }

      this.$confirm('This operation will permenantly delete this record.', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Delete',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        // console.log(idList)
        })
        // 调用api
        return user.removeRows(idList)
      }).then((response) => {
        this.fetchData(this.page)
        if (response.success) {
          this.$message({
            type: 'success',
            message: 'Delete Success!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled delete'
        })
      })
    },

    // 执行搜索
    // queryString：文本框中输入的值
    // cb：一个函数
    querySearch(queryString, cb) {
      console.log(queryString)
      console.log(cb)

      // teacher.selectNameByKey(queryString).then(response => {
      //   // 调用 callback 返回建议列表的数据
      //   cb(response.data.items)
      // })
    }
  }
}
</script>


