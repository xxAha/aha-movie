<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-header">
        <p>欢迎登录</p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item class="form-item" label-width="0" prop="userName">
          <el-input size="medium" placeholder="请输入内容" v-model="ruleForm.userName">
            <template slot="prepend">
              <el-button type="primary" icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0" class="form-item" prop="password">
          <el-input @keyup.enter.native="handleLogin('ruleForm')" type="password" size="medium" placeholder="请输入内容" v-model="ruleForm.password">
            <template slot="prepend">
              <el-button type="primary" icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button :loading="loading" @click="handleLogin('ruleForm')" class="submit" type="primary" size="small">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { loginAPI } from '@/api/user'
  export default {
    data() {
      return {
        loading: false,
        ruleForm: {
          userName: 'superAdmin',
          password: 'admin'
        },
        rules: {
          userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]

        }
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const token = sessionStorage.getItem('access_token')
        if (token) this.$router.replace('/admin/home')
      },
      //用户登录
      handleLogin(form) {
        this.$refs[form].validate(async v => {
          if (!v) return
          this.loading = true;
          const result = await loginAPI(this.ruleForm)
          this.loading = false
          if (result.errno !== 0) {
            this.$message({
              message: result.message,
              type: 'error'
            })
            return
          }
          this.setToken(result.data.token)
          this.$router.replace('/admin/home')
        })
      },
      //保存token
      setToken(token) {
        sessionStorage.setItem('token_type', 'Bearer')
        sessionStorage.setItem('access_token', token)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background-image: url('../../../static/img/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

    .login-wrapper {
      width: 300px;
      height: 280px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 4px;
      background-color: #fff;

      .login-header {
        border-bottom: 1px solid #e8eaec;
        padding: 14px 16px;
        line-height: 1;

        p {
          display: inline-block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #17233d;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .el-form {
        padding: 16px;

        /deep/ .el-input-group__prepend {
          padding: 0 10px;
        }
      }

      .submit {
        width: 100%;
      }
    }
  }
</style>