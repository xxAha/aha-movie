 <template>
   <div class="container text-left">
     <el-input @input="handleSearch" class="search" placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchValue">
     </el-input>
     <el-table :data="tableData" style="width: 100%">
       <el-table-column prop="createdAtFormat" label="日期">
       </el-table-column>
       <el-table-column prop="title" label="标题">
       </el-table-column>
       <el-table-column prop="img" label="图标">
         <template slot-scope="scope">
           <img class="logo" :src="scope.row.logo" alt="logo">
         </template>
       </el-table-column>
       <el-table-column class="list" prop="img" label="分类下的资源">
         <template slot-scope="scope">
           <el-link class="mr-10" v-for="(item, index) in scope.row.resources" :key="index" :href="item.link" target="_blank" type="success">{{item.title}}</el-link>
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
   import { getAllTypeAPI, deleteTypeAPI } from '@/api/type'
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
           const result = await this.getTypeData()
           this.tableData = result.data.rows
           this.total = result.data.count
           this.timer = null
         }, 200)
       },

       async handlePageChange(index) {
         this.currentPage = index - 1
         const result = await this.getTypeData()
         this.tableData = result.data.rows
       },
       async getTypeData() {
         this.loading = true
         const result = await getAllTypeAPI(this.currentPage, this.pageSize, this.searchValue)
         this.loading = false
         return result
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
           const result = await deleteTypeAPI(id)
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
         const result = await this.getTypeData()
         this.tableData = result.data.rows
         this.total = result.data.count
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