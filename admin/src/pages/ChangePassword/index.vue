<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="原密码">
        <el-input type="password" v-model="form.oldPsd"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="form.newPsd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input type="password" v-model="form.confirmNewPsd"></el-input>
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
          oldPsd: '',
          newPsd: '',
          confirmNewPsd: ''
        }
      }
    },
    methods: {
      onSubmit() {}
    },
  }

</script>

<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: auto;
  }

</style>
