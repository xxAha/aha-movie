/**
 * @description 分类关系 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addTypeRelation, deleteTypeRelation } = require('../../controller/type-relation')
const { genValidator } = require('../../middleware/validator')
const typeRelationValidate = require('../../validator/type-relation')

router.prefix('/api/type-relation')

//创建分类
router.post('/', auth, role, genValidator(typeRelationValidate), async (ctx, next) => {
  const { typeId, resourceId } = ctx.request.body
  const result = await addTypeRelation(typeId * 1, resourceId * 1)
  ctx.body = result
})

//删除某个分类关系
router.delete('/', auth, async (ctx, next) => {
  const { typeId, resourceId } = ctx.query
  const result = await deleteTypeRelation(typeId * 1, resourceId * 1)
  ctx.body = result
})


module.exports = router