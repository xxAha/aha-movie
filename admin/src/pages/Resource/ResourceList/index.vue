 <template>
   <div class="container">
     <el-table :data="tableData" style="width: 100%">
       <el-table-column prop="createdAtFormat" label="创建日期">
       </el-table-column>
       <el-table-column prop="title" label="标题">
       </el-table-column>
       <el-table-column prop="img" label="图标">
         <template slot-scope="scope">
           <img class="logo" :src="scope.row.logo" alt="logo">
         </template>
       </el-table-column>
       <el-table-column prop="link" label="链接">
         <template slot-scope="scope">
           <el-link :href="scope.row.link" target="_blank" type="success">{{scope.row.link}}</el-link>
         </template>
       </el-table-column>

       <el-table-column prop="types" label="分类">
         <template slot-scope="scope">
           <el-tag class="mr-10" v-for="item in scope.row.types" :key="item.id + item.title">{{item.title}}</el-tag>
         </template>
       </el-table-column>

       <el-table-column prop="types" label="标签">
         <template slot-scope="scope">
           <el-tag class="mr-10" v-for="item in scope.row.tags" :key="item.id + item.title">{{item.title}}</el-tag>
         </template>
       </el-table-column>


       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
           <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>

     <el-pagination @current-change="handlePageChange" class="text-right" :page-size="pageSize" background layout="prev, pager, next" :total="total">

     </el-pagination>
   </div>
 </template>

 <script>
   import { getAllResourceAPI, deleteResourceAPI } from '@/api/resource'
   export default {
     data() {
       return {
         tableData: [],
         total: 0,
         pageSize: 10,
         currentPage: 0
       }
     },
     methods: {
       async handlePageChange(index) {
         const result = await getAllResourceAPI(index - 1, this.pageSize)
         this.tableData = result.data.rows
       },

       handleEdit(id) {
         this.$router.push(`/update-resource/${id}`)
       },
       async handleDelete(resource) {
         this.$messageBox.confirm('删除该资源, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(async () => {
           const { id } = resource
           const result = await deleteResourceAPI(id)
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
         const result = await getAllResourceAPI(this.currentPage, this.pageSize)
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