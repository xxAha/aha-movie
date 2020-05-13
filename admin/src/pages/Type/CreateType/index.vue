<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类图标">
         <Crop @cropDone="handlCropDone"/>
      </el-form-item>
      <el-form-item label="分类标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
import Crop from '@/components/Crop'
export default {
  data() {
    return {
      form: {
        title: ''
      }
      
    }
  },
  components: {
    Crop
  },
  methods: {
    onSubmit() {},
    handlCropDone(formData) {
      console.log(formData.get('file'))
    }
  },
}
</script>

<style lang="scss" scoped>

  .wrapper {
    width: 60%;
    margin: auto;
  }
</style>
