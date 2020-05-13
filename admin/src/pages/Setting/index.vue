<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="网站标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="网站描述">
        <el-input  :rows="10" type="textarea"  v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
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
          description: ''
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
}
</style>

