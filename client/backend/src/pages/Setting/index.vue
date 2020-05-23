<template>
  <div class="container">
    <el-form v-if="form" class="text-left" ref="form" :model="form" :rules="rules" label-width="100" label-position="top">
      <el-form-item label="网站标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="资源图标" prop="logo">
        <Crop :class="form.logo?'hidden-errorInfo': ''" ref="crop" @cropDone="handlCropDone" @sizeOver="handleSizeOver" />
      </el-form-item>

      <el-form-item label="网站关键词">
        <el-input v-model="form.keywords"></el-input>
        <el-alert type="info" description='多个关键词用"，"号隔开，例如：高清电影，在线看电影。' show-icon>
        </el-alert>

      </el-form-item>
      <el-form-item label="网站描述">
        <el-input resize="none" :rows="10" type="textarea" v-model="form.description"></el-input>
        <el-alert type="info" description='网站描述，字数建议不超过150字。' show-icon>
        </el-alert>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Crop from '@/components/Crop'
  import { uploadAPI } from '@/api/utils'
  import { getSettingAPI, updateSettingAPI } from '@/api/setting'
  export default {
    data() {
      return {
        // form: {
        //   title: '',
        //   logo: '',
        //   keywords: '',
        //   description: ''
        // },
        rules: {
          title: [{
            required: true,
            message: '请输入网站标题',
            trigger: 'blur'
          }],
          logo: [{
            required: true,
            message: '请上传网站logo',
            trigger: 'change'
          }]
        }
      }
    },
    components: {
      Crop
    },
    computed: {
      ...mapState({
        form(state) {
          const form = state.setting
          if(!form) return
          this.$nextTick(() => {
            this.$refs.crop.headerImage = form.logo
          })
          return form
        }
      })
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate(async v => {
          if (!v) return
          const result = await updateSettingAPI(this.form)
          if (result.errno === 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '保存失败'
            })
          }
        })
      },
      async handlCropDone(formData) {
        const result = await uploadAPI(formData)
        if (!result.errno) {
          this.form.logo = result.data.url
        }
      },

      handleSizeOver() {
        this.$message({
          type: 'warning',
          message: '图片过大，请压缩图片'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: auto;

    .hidden-errorInfo+.el-form-item__error {
      display: none;

    }

    .el-form {
      width: 100%;
    }
  }
</style>