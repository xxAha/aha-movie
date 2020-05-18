/**
 * @description 分类 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addType, getTyps } = require('../../controller/type')



router.prefix('/api/types')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  let { title, logo, index, resources } = ctx.request.body
  index = index * 1
  const result = await addType({title, logo, index, resources})
  ctx.body = result
})

//查询分类
router.get('/', auth, async (ctx, next) => {
  const result = await getTyps()
  ctx.body = result
})


module.exports = router