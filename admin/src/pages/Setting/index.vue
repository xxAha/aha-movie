<template>
  <div class="container">
    <el-form class="text-left" ref="form" :model="form" :rules="rules" label-width="100">
      <el-form-item label="网站标题" prop="title">
        <el-input v-model="form.title"></el-input>

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
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          keywords: '',
          description: ''
        },
        rules: {
          title: [{
            required: true,
            message: '请输入网站标题',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: auto;

    .el-form {
      width: 100%;
    }
  }
</style>