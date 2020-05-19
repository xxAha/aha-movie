 <template>
   <div class="text-left">
     <el-input @input="handleSearch" class="search" placeholder="请输入搜索的用户名" prefix-icon="el-icon-search" v-model="searchValue">
     </el-input>

     <el-table v-loading="loading" :data="tableData" style="width: 100%">

       <el-table-column prop="createdAtFormat" label="日期">
       </el-table-column>

       <el-table-column prop="userName" label="用户名">
       </el-table-column>

       <el-table-column prop="nickName" label="昵称">
       </el-table-column>

       <el-table-column prop="avatar" label="头像">
         <template slot-scope="scope">
           <img class="logo" :src="scope.row.avatar" alt="avatar">
         </template>
       </el-table-column>

       <el-table-column prop="role" label="权限">
         <template slot-scope="scope">
           <span v-if="scope.row.role === 0">超级管理员</span>
           <span v-else-if="scope.row.role === 1">一般管理员</span>
          <span v-else>游客</span>
         </template>
       </el-table-column>

       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
           <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>

     <el-pagination @current-change="handlePageChange" class="text-right" :page-size="pageSize" background layout="prev, pager, next" :total="total">
     </el-pagination>

   </div>
 </template>

 <script>
   import { getAllUserAPI, deleteUserAPI } from '@/api/user'
   export default {
     data() {
       return {
         loading: false,
         tableData: [],
         total: 0,
         pageSize: 2,
         currentPage: 0,
         searchValue: '',
         timer: null
       }
     },
     methods: {
       handleSearch(value) {
         if (this.timer) return

         this.timer = setTimeout(async () => {
           this.currentPage = 0
           await this.getUserData()
           this.timer = null
         }, 200)
       },

       async handlePageChange(index) {
         this.currentPage = index - 1
         const result = await this.getUserData()
       },
       async getUserData() {
         this.loading = true
         const result = await getAllUserAPI(this.currentPage, this.pageSize, this.searchValue)
         this.tableData = result.data.rows
         this.total = result.data.count
         this.loading = false
       },
       handleEdit(id) {
         this.$router.push(`/update-type/${id}`)
       },
       async handleDelete(id) {
         this.$messageBox.confirm('删除该资源, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(async () => {
           const result = await deleteUserAPI(id)
           if (result.errno === 0) {
             this.$message({
               type: 'success',
               message: '删除成功'
             })
             this.init()
           } else {
             this.$message({
               type: 'warning',
               message: '删除失败'
             })
           }
         })

       },
       async init() {
         const result = await this.getUserData()
       }
     },
     mounted() {
       this.init()
     },
   }
 </script>

 <style lang="scss" scoped>
   .search {
     width: 400px;
     margin-bottom: 20px;
   }

   .logo {
     display: block;
     width: 60px;
     height: 60px;
   }

   .el-pagination {
     margin-top: 10px;
     padding-right: 20px;
   }

   .el-tag+.el-tag {
     margin-left: 0;
   }
 </style>