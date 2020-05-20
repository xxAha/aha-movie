/**
 * @description 标签 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addTag, deleteTag } = require('../../controller/tag')
const { genValidator } = require('../../middleware/validator')
const tagValidate = require('../../validator/tag')

router.prefix('/api/tags')

//创建标签
router.post('/', auth, role, genValidator(tagValidate), async (ctx, next) => {
  const { resourceId, title } = ctx.request.body
  const result = await addTag(resourceId * 1, title)
  ctx.body = result
})

//删除标签
router.delete('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  const result = await deleteTag(id)
  ctx.body = result
})


module.exports = router