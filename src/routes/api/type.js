/**
 * @description 分类 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const { addType } = require('../../controller/type')



router.prefix('/api/types')

//创建分类
router.post('/create', auth, async (ctx, next) => {
  const { title, logo } = ctx.request.body
  const result = await addType(title, logo)

  ctx.body = result
})


module.exports = router