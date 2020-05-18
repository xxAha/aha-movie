<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类图标" prop="logo">
        <input type="text" :value="form.logo" hidden />
        <Crop :class="form.logo?'hidden-errorInfo': ''" ref="crop" @cropDone="handlCropDone" @sizeOver="handleSizeOver" />
      </el-form-item>
      <el-form-item label="分类标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="index" prop="index">
        <el-input type="number" v-model="form.index"></el-input>
      </el-form-item>

      <el-form-item class="text-left" label="选择资源">
        <el-select @remove-tag="handleRemove" v-model="form.resources" multiple placeholder="请选择分类">
          <el-option @click.native="handleOptionClick(item)" v-for="item in resources" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit('form')">创建</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  import { createTypeAPI, getTypeAPI } from '@/api/type'
  import { uploadAPI } from '@/api/utils'
  import { getAllResourceAPI } from '@/api/resource'
  export default {
    data() {
      return {
        loading: false,
        form: {
          title: '',
          logo: '',
          index: 0,
          resources: []
        },
        typeId: '',
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

        },
        resources: []

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
            result = await createTypeAPI(this.form)
          } else {
            //result = await updateResourceAPI(this.resourceId, this.form)
          }

          this.loading = false
          if (result.errno === 0) {
            !this.isUpdate && this.resetData()
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            return
          }
          this.$message('创建失败')

        })
      },
      async getAllResources() {
        const result = await getAllResourceAPI()
        this.resources = result.data.rows
      },
      async handlCropDone(formData) {
        const result = await uploadAPI(formData)
        if (!result.errno) {
          this.form.logo = result.data.url
        }
      },
      handleSizeOver() {
        this.$message('图片过大，请压缩图片。')
      },
      handleRemove() {},
      handleOptionClick() {},
      //重置数据
      resetData() {
        console.log(1)
        this.$refs.form.resetFields()
        this.$refs.crop.headerImage = ''
        this.form.resources = []

      },
      //获取需要更新的资源数据
      async getCurrentData() {
        if (this.isUpdate) {
          this.typeId = this.$route.params.id
          const result = await getTypeAPI(this.typeId)
          console.log(result)
          // const typeResult = await getTypeAPI(this.typeId)
          // console.log(typeResult)
          // const typeResult = await getTypeRelationAPI(this.resourceId)
          // const resResult = await getResourceAPI(this.resourceId)
          // if (typeResult.errno === 0 && resResult.errno === 0) {
          //   //这里必须先初始化tyeps 为一个 [] 再赋值给 form 不然点击 options 标签没反应
          //   resResult.data.types = []
          //   this.form = resResult.data
          //   this.form.types = typeResult.data.map(i => i.id)
          //   this.$refs.crop.headerImage = this.form.logo
          // } else {
          //   this.$message({
          //     type: 'warning',
          //     message: '获取资源信息失败'
          //   })
          // }

        }
      }
    },
    computed: {
      isUpdate() {
        return this.$route.name === 'UpdateType'
      }
    },
    mounted() {
      this.getAllResources()
      this.getCurrentData()
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        const path = vm.$route.path
        if (path === '/add-type') {
          vm.resetData()
        }
      })
    }
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