<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类图标" prop="logo">
        <input type="text" :value="form.logo" hidden/>
        <Crop @cropDone="handlCropDone" />
      </el-form-item>
      <el-form-item label="分类标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">创建</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  import { createTypeAPI } from '@/api/type'
  export default {
    data() {
      return {
        form: {
          title: '',
          logo: ''
        },
        rules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          logo: [{
            required: true,
            message: '请上传图标',
            trigger: 'change'
          }]

        }

      }
    },
    components: {
      Crop
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate(v => {
          if(!v) return
          const formData = this.form.logo
          formData.set('title', this.form.title)
          createTypeAPI(formData)
        })
      },
      handlCropDone(formData) {
        console.log(formData)
        this.form.logo = formData
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
