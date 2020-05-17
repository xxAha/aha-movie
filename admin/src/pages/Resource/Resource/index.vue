<template>
  <div class="wrapper">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">

      <el-form-item label="资源图标" prop="logo">
        <Crop :class="form.logo?'hidden-errorInfo': ''" ref="crop" @cropDone="handlCropDone" @sizeOver="handleSizeOver" />
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

      <el-form-item class="text-left" label="选择分类">

        <el-select @remove-tag="handleRemoveTypeTag" v-model="form.types" multiple placeholder="请选择">
          <el-option @click.native="handleOptionClick(item)" v-for="item in types" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>

      </el-form-item>


      <el-form-item class="text-left" label="标签">
        <!-- 创建资源时渲染 -->
        <div v-if="!isUpdate" class="tag-box">
          <el-tag :key="tag + index" v-for="(tag, index) in createTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>

        <!-- 更新资源时渲染 -->
        <div v-else class="tag-box">
          <el-tag :key="tag.id + tag.title" v-for="tag in form.tags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag.title}}
          </el-tag>
        </div>

        <el-input class="input-new-tag" v-if="inputVisible" v-model="tagValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{isUpdate?'更新': '创建'}}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Crop from '@/components/Crop'
  import { uploadAPI } from '@/api/utils'
  import { createResourceAPI, getResourceAPI, updateResourceAPI } from '@/api/resource'
  import { getTypesAPI } from '@/api/type'
  import { createTagAPI, deleteTagAPI } from '@/api/tag'
  import { getTypeRelationAPI, deleteTypeRelationAPI, createTypeRelation } from '@/api/type-relation'
  import { types } from 'util';
  export default {
    data() {
      return {
        resourceId: null,
        loading: false,
        form: {
          title: '',
          link: '',
          logo: '',
          index: 0,
          tags: [],
          types: []
        },
        createTags: [], //创建资源时的tags
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
        tagValue: '',
        types: [], //所有分类
      }
    },
    components: {
      Crop
    },
    methods: {
      //提交请求
      onSubmit(form) {
        this.$refs[form].validate(async v => {
          if (!v) return
          this.loading = true
          let result

          if (!this.isUpdate) {
            this.form.tags = this.createTags
            result = await createResourceAPI(this.form)
          } else {
            result = await updateResourceAPI(this.resourceId, this.form)
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
      //重置数据
      resetData() {
        this.$refs.form.resetFields()
        this.$refs.crop.headerImage = ''
        this.form.types = []
        this.form.tags = []
        //创建资源时用来保存标签数组的
        this.createTags = []
      },
      //获取所有分类
      async getTypes() {
        const result = await getTypesAPI()
        if (result.errno === 0) {
          this.types = result.data
        } else {
          this.$message({
            type: 'warning',
            message: '获取分类失败'
          })
        }
      },

      //选择分类(只对更新资源起作用)
      async handleOptionClick(typeObj) {
        if (this.isUpdate) {
          const { id: typeId } = typeObj
          const hasType = this.form.types.some(itemId => {
            return itemId === typeId
          })
          
          if (hasType) {
            const result = await createTypeRelation(typeId, this.resourceId)
            if (result.errno === 0) {
              this.$message({
                type: 'success',
                message: '分类关联已创建'
              })
            }
          } else {
            this.handleRemoveTypeTag(typeId)
          }
        }

      },

      //删除分类
      async handleRemoveTypeTag(typeId) {
        if (this.isUpdate) {
          const result = await deleteTypeRelationAPI(typeId, this.resourceId)
          if (result.errno === 0) {
            this.$message({
              type: 'success',
              message: '分类关联已删除'
            })
          }
        }

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
      },

      //tag标签点击关闭
      async handleClose(tag) {
        if (this.isUpdate) {
          const result = await deleteTagAPI(tag.id)
          if (result.errno === 0) {
            this.form.tags.splice(this.form.tags.indexOf(tag), 1)
            this.$message({
              type: 'success',
              message: '标签删除成功'
            })
          }
        } else {
          this.createTags.splice(this.createTags.indexOf(tag), 1)
          this.$message({
            type: 'success',
            message: '标签删除成功'
          })
        }

        // this.$messageBox.confirm('删除该标签, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(async () => {
        //   if (this.isUpdate) {
        //     const result = await deleteTagAPI(tag.id)
        //     if (result.errno === 0) {
        //       this.form.tags.splice(this.form.tags.indexOf(tag), 1)
        //     }
        //   } else {
        //     this.createTags.splice(this.createTags.indexOf(tag), 1)
        //   }

        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   })
        // })
      },

      //添加标签显示输入
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      //确认添加标签
      async handleInputConfirm() {
        let inputValue = this.tagValue
        if (inputValue) {
          if (this.isUpdate) {
            const result = await createTagAPI({
              resourceId: this.form.id,
              title: inputValue
            })
            if (result.errno === 0) {
              this.form.tags.push(result.data)
              this.$message({
                type: 'success',
                message: '标签添加成功'
              })
            }

          } else {
            this.createTags.push(inputValue)
          }

        }
        this.inputVisible = false;
        this.tagValue = '';
      },

      //获取当前资源的数据
      async getCurrentData() {
        if (this.isUpdate) {
          this.resourceId = this.$route.params.id
          const typeResult = await getTypeRelationAPI(this.resourceId)
          const resResult = await getResourceAPI(this.resourceId)
          if (typeResult.errno === 0 && resResult.errno === 0) {
            //这里必须先初始化tyeps 为一个 [] 再赋值给 form 不然点击 options 标签没反应
            resResult.data.types = []
            this.form = resResult.data
            this.form.types = typeResult.data.map(i => i.id)
            this.$refs.crop.headerImage = this.form.logo
          } else {
            this.$message({
              type: 'warning',
              message: '获取资源信息失败'
            })
          }

        }
      }

    },
    computed: {
      isUpdate() {
        return this.$route.name === 'UpdateResource'
      }
    },
    mounted() {
      this.getTypes()
      this.getCurrentData()
    },
    beforeRouteEnter: (to, from, next) => {
      next((vm) => {
        const path = vm.$route.path
        if (path === '/add-resource') {
          vm.resetData()
        }
      })
    }
  }
</script>

<style lang="scss" scope>
  .wrapper {
    width: 60%;
    margin: auto;

    .hidden-errorInfo+.el-form-item__error {
      display: none;

    }

    .hidden-errorInfo {
      .el-input__inner {
        border-color: #C0C4CC;
      }
    }

    .tag-box {
      display: inline-block;
    }
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .el-select {
    width: 100%;
  }

  /* .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  } */

  .input-new-tag {
    width: 90px;
    //margin-left: 10px;
    vertical-align: bottom;
  }
</style>