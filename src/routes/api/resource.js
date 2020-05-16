/**
 * @description 资源 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addResource } = require('../../controller/resource')




router.prefix('/api/resources')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  // const { title, logo, index,  } = ctx.request.body
  const result = await addResource(ctx.request.body)
  ctx.body = result

})


module.exports = router