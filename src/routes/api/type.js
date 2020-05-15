/**
 * @description 分类 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addType } = require('../../controller/type')



router.prefix('/api/types')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  const { title, logo, index } = ctx.request.body
  const result = await addType(title, logo, index * 1)
  ctx.body = result
})


module.exports = router