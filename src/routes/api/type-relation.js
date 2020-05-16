/**
 * @description 分类关系 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addTypeRelation, getTypeRelation } = require('../../controller/type-relation')

router.prefix('/api/type-relation')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  const { typeId, resourceId } = ctx.request.body
  const result = await addTypeRelation(typeId * 1, resourceId * 1)
  ctx.body = result
})

//查询某个分类关系
router.get('/', auth, async (ctx, next) => {
  const id  = ctx.request.query.id
  const result = await getTypeRelation(id * 1)
  ctx.body = result
})


module.exports = router