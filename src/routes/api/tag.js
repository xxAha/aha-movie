/**
 * @description 标签 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addTag } = require('../../controller/tags')




router.prefix('/api/tags')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  const { resourceId, title } = ctx.request.body
  const result = await addTag(resourceId * 1, title)
  ctx.body = result
})


module.exports = router