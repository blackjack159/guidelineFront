<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/> -->


    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="Name"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="Path"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="component"
        label="Component"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="permissionValue"
        label="Permission Val">
      </el-table-column>
      <el-table-column
        label="Operation">
        <template slot-scope="scope">
          <!-- v-if="node.level == 1 || node.level == 2" v-if="node.level == 3" v-if="node.level == 4"-->
          <el-button
            v-if="(scope.row.level == 1 || scope.row.level == 2) && hasPerm('permission.add')"
            type="text"
            size="mini"
            @click="() => {dialogFormVisible = true, menu.pid = scope.row.id}">Add Menu
          </el-button>
          <el-button
            v-if="scope.row.level == 3 &&  hasPerm('permission.add')"
            type="text"
            size="mini"
            @click="() => {dialogPermissionVisible = true, permission.pid = scope.row.id}">Add Feature
          </el-button>
          <el-button
            v-if="scope.row.level == 4 &&  hasPerm('permission.update')"
            type="text"
            size="mini"
            @click="() => updateFunction(scope.row)">Edit Feature
          </el-button>
          <el-button
            v-if="scope.row.level != 4 &&  hasPerm('permission.update')"
            type="text"
            size="mini"
            @click="() => getById(scope.row)">Edit
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(scope.row)" v-if="hasPerm('permission.remove')">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormValue">
      <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
        <el-form-item label="Menu Name" prop="name">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="Path" prop="path">
          <el-input v-model="menu.path"/>
        </el-form-item>
        <el-form-item label="Component" prop="component">
          <el-input v-model="menu.component"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData()">Cancel</el-button>
        <el-button type="primary" @click="append()">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- 添加功能的窗口 -->
    <el-dialog :visible.sync="dialogPermissionVisible" title="Add Feature">
      <el-form ref="permission" :model="permission" :rules="permissionValidateRules" label-width="120px">
        <el-form-item label="Feature Name" prop="name">
          <el-input v-model="permission.name"/>
        </el-form-item>
        <el-form-item label="Path">
          <el-input v-model="permission.path"/>
        </el-form-item>
        <el-form-item label="Component">
          <el-input v-model="permission.component"/>
        </el-form-item>
        <el-form-item label="Permission Value" prop="permissionValue">
          <el-input v-model="permission.permissionValue"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData()">Cancel</el-button>
        <el-button type="primary" @click="appendPermission()">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import menu from '@/api/acl/menu'

const menuForm = {
  name: '',
  pid: 0,
  path: '',
  component: '',
  type: '1'
}
const perForm = {
  permissionValue: '',
  type: '2',
  name: '',
  path: '',
  component: '',
  pid: 0
}

export default {

  data() {
    return {
      filterText: '',
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogFormValue: 'Add Menu',
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      menu: menuForm,
      permission: perForm,
      menuValidateRules: {
        name: [{required: true, trigger: 'blur', message: 'Menu Name must be entered'}],
        path: [{required: true, trigger: 'blur', message: 'Menu Path must be entered'}],
        component: [{required: true, trigger: 'blur', message: 'Component Name must be entered'}]
      },
      permissionValidateRules: {
        name: [{required: true, trigger: 'blur', message: 'Feature Name must be entered'}],
        permissionValue: [{required: true, trigger: 'blur', message: 'Permission Value must be entered'}]
      }
    }
  },
  // 监听上面文本框搜索
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },

  created() {
    this.fetchNodeList()
  },

  methods: {
    fetchNodeList() {
      menu.getNestedTreeList().then(response => {
        if (response.success === true) {
          this.menuList = response.data.children
          console.log(this.menuList)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    remove(data) {
      console.log(data)

      this.$confirm('This will permanently delete the banner. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return menu.removeById(data.id)
      }).then(() => {
        this.fetchNodeList()// 刷新列表
        this.$message({
          type: 'success',
          message: 'Delete Success!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: 'Cancelled Delete'
          })
        } else {
          this.$message({
            type: 'error',
            message: 'Delete Failed'
          })
        }
      })
    },
    appendPermission() {
      this.$refs.permission.validate(valid => {
        if (valid) {
          if (this.permission.id) {
            this.update(this.permission)
          } else {
            menu.saveLevelOne(this.permission).then(response => {
              this.dialogPermissionVisible = false
              this.$message({
                type: 'success',
                message: 'Add Feature Success!'
              })
              // 刷新页面
              this.fetchNodeList()
              this.menu = {...menuForm}
              this.permission = {...perForm}
            })
          }
        }
      })
    },
    appendLevelOne() {
      menu.saveLevelOne(this.menu)
        .then(response => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: 'Add first level menu success!'
          })
          // 刷新页面
          this.fetchNodeList()
          this.menu = {...menuForm}
          this.permission = {...perForm}
        })
        .catch(response => {
          // 你们写：判断点击取消清空一下
          this.dialogFormVisible = false
          this.$message({
            type: 'error',
            message: 'Add first level menu fail'
          })
          this.menu = {...menuForm}
          this.permission = {...perForm}
        })
    },

    append() {
      this.$refs.menu.validate(valid => {
        if (valid) {
          if (!this.menu.id) { // 添加
            if (this.menu.pid == 0) {
              this.appendLevelOne() // 一级分类的添加
            } else {
              this.appendLevelTwo() // 二级分类的添加
            }
          } else { // 修改
            this.update(this.menu)
          }
        }
      })
    },

    update(obj) {
      debugger
      menu.update(obj).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: 'Edit Success!'
        })
        // 刷新页面
        this.fetchNodeList()
        this.restData()
      })
    },
    appendLevelTwo() {
      menu.saveLevelOne(this.menu)
        .then(response => {
          // 1、把文本框关
          this.dialogFormVisible = false
          // 2、提示成功
          this.$message({
            type: 'success',
            message: "Add second level menu success!"
          })
          // 3、刷新页面
          this.fetchNodeList()
          // 4、把menu清空
          this.menu = {...menuForm}
          this.permission = {...perForm}
        })
        .catch(response => {
          // 1、把文本框关
          this.dialogFormVisible = false
          // 2、提示成功
          this.$message({
            type: 'error',
            message: "Add second level menu fail"
          })
          // 3、把menu清空
          this.menu = {...menuForm}
          this.permission = {...perForm}

        })
    },
    getById(data) {
      this.dialogFormVisible = true
      this.menu = data
    },
    updateFunction(data) {
      this.dialogPermissionVisible = true
      this.permission = data
    },
    restData() {
      this.dialogPermissionVisible = false
      this.dialogFormVisible = false
      this.menu = {...menuForm}
      this.permission = {...perForm}
    }
  }
}
</script>
