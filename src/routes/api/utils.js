/**
 * @description 工具 API
 */

const path = require('path')
const router = require('koa-router')()
const { PUBLIC_PATH } = require('../../config/constant')
const { SuccessModel } = require('../../model/ResModel')

router.prefix('/api')

//上传文件
router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file
  //获取文件名字
  //file.path -> 文件的绝对路径
  const basename = path.basename(file.path)

  ctx.body = new SuccessModel({
    url: `${PUBLIC_PATH}/${basename}`
  })
})

module.exports = router