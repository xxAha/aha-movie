<template>
  <div class="wrapper">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="资源图标" prop="logo">
        <Crop ref="crop" @cropDone="handlCropDone" @sizeOver="handleSizeOver" />
      </el-form-item>

      <el-form-item label="资源标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="资源链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>

      <el-form-item label="index" prop="index">
        <el-input type="number" v-model="form.index"></el-input>
      </el-form-item>

      <el-form-item class="text-left" label="标签">
        <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>

        <el-input class="input-new-tag" v-if="inputVisible" v-model="form.tagValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  import {
    uploadAPI
  } from '@/api/utils'
  import {createResourceAPI} from '@/api/resource'
  export default {
    data() {
      return {
        loading: false,
        form: {
          title: '',
          link: '',
          logo: '',
          index: 0,
          tagValue: ''
        },
        rules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          link: [{
            required: true,
            message: '请输入资源链接',
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
        inputVisible: false,
        tags: []
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
          this.form.tags = this.tags
          const result = await createResourceAPI(this.form)
          this.loading = false
          if (result.errno === 0) {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.$refs.form.resetFields()
            this.$refs.crop.headerImage = ''
            this.tags = []
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
      },
      handleClose(tag) {
        this.$messageBox.confirm('删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tags.splice(this.tags.indexOf(tag), 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })

      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.form.tagValue
        if (inputValue) {
          this.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.form.tagValue = '';
      }
    },
  }

</script>

<style scope>
  .wrapper {
    width: 60%;
    margin: auto;
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>
