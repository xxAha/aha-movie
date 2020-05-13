<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="资源图标">
        <Crop @cropDone="handlCropDone"/>
      </el-form-item>

      <el-form-item label="资源标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="资源链接">
        <el-input v-model="form.link"></el-input>
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
          title: '',
          link: '',
          logo: ''
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

<style scope>
  .wrapper {
    width: 60%;
    margin: auto;
  }

</style>
