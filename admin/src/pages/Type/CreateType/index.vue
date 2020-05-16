<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类图标" prop="logo">
        <input type="text" :value="form.logo" hidden />
        <Crop :class="form.logo?'hidden-errorInfo': ''" ref="crop" @cropDone="handlCropDone"
          @sizeOver="handleSizeOver" />
      </el-form-item>
      <el-form-item label="分类标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="index" prop="index">
        <el-input type="number" v-model="form.index"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit('form')">创建</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  import {createTypeAPI} from '@/api/type'
  import {uploadAPI} from '@/api/utils'
  export default {
    data() {
      return {
        loading: false,
        form: {
          title: '',
          logo: '',
          index: 0
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
          }],
          index: [{
            required: true,
            message: '请输入排序数字',
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
        this.$refs[form].validate(async v => {
          if (!v) return
          this.loading = true
          const result = await createTypeAPI(this.form)
          this.loading = false
          if (result.errno === 0) {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.$refs.form.resetFields()
            this.$refs.crop.headerImage = ''
            return
          }
          this.$message('创建失败')

        })
      },
      async handlCropDone(formData) {
        const result = await uploadAPI(formData)
        if (!result.errno) {
          this.form.logo = result.data.url
        }
      },
      handleSizeOver() {
        this.$message('图片过大，请压缩图片。')
      }
    },
  }

</script>

<style lang="scss" scoped>
  .wrapper {
    width: 60%;
    margin: auto;

    .hidden-errorInfo+.el-form-item__error {
      display: none;
    }
  }

</style>
