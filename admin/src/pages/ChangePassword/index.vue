<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPsd">
        <el-input type="password" v-model="form.confirmNewPsd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { changePasswordAPI } from '@/api/user'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.confirmNewPsd !== '') {
            this.$refs.form.validateField('confirmNewPsd')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          id: '',
          oldPassword: '',
          newPassword: '',
          confirmNewPsd: ''
        },
        rules: {
          newPassword: [
            { required: true, validator: validatePass, trigger: 'blur' },
            { type: 'string', min: 6, message: '密码最少6位', trigger: 'blur' }
          ],
          confirmNewPsd: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapState(['ownerInfo'])
    },
    methods: {
       onSubmit() {
        this.$refs.form.validate(async v => {
          if (!v) return

          this.form.id = this.ownerInfo.id
          const result = await changePasswordAPI(this.form)
          if (result.errno === 0) {
            this.$refs.form.resetFields()
            this.$message({
              type: 'success',
              message: '密码修改成功'
            })

          } else {
            this.$message({
              type: 'warning',
              message: '密码修改失败'
            })
          }
        })


      }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 500px;
    margin: auto;

    .el-form {
      width: 100%;
    }
  }
</style>