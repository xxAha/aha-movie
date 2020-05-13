<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="分类图标">
        <Crop @cropDone="handlCropDone" />
      </el-form-item>
      <el-form-item label="分类标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item class="text-left" label="分类下的资源">
        <el-tag @close="handleClose(item)" class="mr-10" v-for="(item, index) in list" :key="index" closable
          type="success">
          {{item.title}}
        </el-tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addResource">创建</el-button>
      </el-form-item>
    </el-form>



    <el-dialog width="600px" title="添加资源" :visible.sync="dialogVisible">

      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音"
        v-model="value" :data="data">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        form: {
          title: ''
        },
        dialogVisible: false,
        list: [{
            title: '疾风电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          },
          {
            title: '飞速电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          },
          {
            title: '疾风电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          },
          {
            title: '飞速电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          }, {
            title: '疾风电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          },
          {
            title: '飞速电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          }, {
            title: '疾风电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          },
          {
            title: '飞速电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          }, {
            title: '疾风电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          },
          {
            title: '飞速电影',
            logo: 'https://unsplash.it/1600/900?random',
            link: 'https://unsplash.it/1600/900?random'
          }
        ]
      };
    },
    components: {
      Crop
    },
    methods: {
      addResource() {
        this.dialogVisible = true
      },
      handleClose(tag) {
        this.$messageBox.confirm('此操作将永久删除该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list.splice(this.list.indexOf(tag), 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handlCropDone() {}
    },
  };

</script>
<style lang="scss" scoped>
  .wrapper {
    width: 60%;
    margin: auto;
    .el-transfer {
      /deep/ .el-transfer-panel {
        text-align: left;
      }
    }
  }

</style>
