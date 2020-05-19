<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">

      <el-form-item v-if="!isUpdate" label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
        <el-alert type="info" description="用户名注册后无法修改" show-icon>
        </el-alert>
      </el-form-item>

      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName"></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-alert type="info" description="超级管理：权限最高可以管理用户和数据，一般管理员：可以管理数据，游客：只能查看数据列表" show-icon></el-alert>
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <input type="text" :value="form.avatar" hidden />
        <Crop :class="form.avatar? 'hidden-errorInfo': ''" ref="crop" @cropDone="handlCropDone" @sizeOver="handleSizeOver" />
      </el-form-item>

      <el-form-item v-if="!isUpdate" label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item v-if="!isUpdate" label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit('form')">{{isUpdate?'更新': '创建'}}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  import { mapState } from 'vuex'
  import { createUserAPI, updateUserInfoAPI, getUserInfoAPI } from '@/api/user'
  import { uploadAPI } from '@/api/utils'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.confirmPassword !== '') {
            this.$refs.form.validateField('confirmPassword')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        userId: '',
        form: {
          userName: '',
          role: '',
          password: '',
          confirmPassword: '',
          nickName: '',
          avatar: ''
        },
        roles: [{
            label: '超级管理员',
            value: 0
          },
          {
            label: '一般管理员',
            value: 1
          },
          {
            label: '游客',
            value: 2
          },
        ],
        rules: {
          userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          nickName: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          role: [{
            required: true,
            message: '请输入角色数字',
            trigger: 'change'
          }],
          avatar: [{
            required: true,
            message: '请上传头像',
            trigger: 'change'
          }],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        },
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
          let result
          if (!this.isUpdate) {
            result = await createUserAPI(this.form)
          } else {
            result = await updateUserInfoAPI(this.userId, this.form)
          }

          this.loading = false
          if (result.errno === 0) {
            !this.isUpdate && this.resetData()
            this.$message({
              type: 'success',
              message: this.isUpdate ? '更新成功' : '创建成功'
            })
            return
          }
          this.$message({
            type: 'warning',
            message: this.isUpdate ? '更新失败' : '创建失败'
          })

        })
      },
      async handlCropDone(formData) {
        const result = await uploadAPI(formData)
        if (!result.errno) {
          this.form.avatar = result.data.url
        }
      },
      handleSizeOver() {
        this.$message('图片过大，请压缩图片。')
      },

      //重置数据
      resetData() {
        this.$refs.form.resetFields()
        this.$refs.crop.headerImage = ''
      },
      //获取需要更新的资源数据
      async getCurrentData() {
        if (this.isUpdate) {
          this.userId = this.$route.params.id
          const result = await getUserInfoAPI(this.userId)

          if (result.errno === 0) {
            this.form = result.data
            this.$refs.crop.headerImage = this.form.avatar
          } else {
            this.$message({
              type: 'warning',
              message: '获取用户信息失败'
            })
          }

        }
      }
    },
    computed: {
      ...mapState(['ownerInfo']),
      isUpdate() {
        return this.$route.name === 'UpdateUser'
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        const name = vm.$route.name
        if (name === 'CreateUser') {
          vm.resetData()
        }
        if (name === 'UpdateUser') {
          vm.getCurrentData()
        }

      })
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 500px;
    margin: auto;
  }
    .el-select {
    width: 100%;
  }
</style>