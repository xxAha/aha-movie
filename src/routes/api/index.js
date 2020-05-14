const path = require('path')
const router = require('koa-router')()
const auth = require('../../middleware/jwt')

router.prefix('/api')


//上传文件 + token 验证
router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file
  //获取文件名字
  //file.path -> 文件的绝对路径
  const basename = path.basename(file.path)
  //ctx.origin -> 域名http://localhost:3000
  ctx.body = {
    url: `${ctx.origin}/${basename}`
  }

})

module.exports = router