const router = require('koa-router')()
const path = require('path')
const auth = require('../../middleware/jwt')
const { PUBLIC_PATH } = require('../../config/constant')

router.prefix('/api/types')

//创建分类
router.post('/create', auth, async (ctx, next) => {
  const file = ctx.request.files.file
  const basename = path.basename(file.path)
  
  const url =  `${PUBLIC_PATH}/${basename}`
  console.log(ctx.request.body, url)
})

module.exports = router