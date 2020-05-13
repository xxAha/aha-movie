 <template>
   <el-table :data="tableData" style="width: 100%">
     <el-table-column prop="date" label="日期">
     </el-table-column>
     <el-table-column prop="title" label="标题" >
     </el-table-column>
     <el-table-column prop="img" label="图标">
       <template slot-scope="scope">
         <el-image style="width: 40px; height: 40px" :src="scope.row.img"></el-image>
       </template>
     </el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
 </template>

 <script>
   export default {
     data() {
       return {
         tableData: [{
             date: '2016-05-02',
             title: '美剧',
             img: 'https://unsplash.it/1600/900?random'
           },
           {
             date: '2016-05-04',
             title: '韩剧',
             img: 'https://unsplash.it/1600/900?random'
           }
         ]
       }
     },
     methods: {
       handleEdit() {},
       handleDelete() {}
     },
   }

 </script>
