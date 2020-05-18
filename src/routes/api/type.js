/**
 * @description 分类 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addType, getAllType, getType } = require('../../controller/type')



router.prefix('/api/types')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  let { title, logo, index, resources } = ctx.request.body
  index = index * 1
  const result = await addType({title, logo, index, resources})
  ctx.body = result
})

//查询某个分类
router.get('/:id', auth, async (ctx, next) => {
  const { id } = ctx.params
  const result = await getType( id * 1 )
  ctx.body = result
})

//查询所有分类
router.get('/', auth, async (ctx, next) => {
  const result = await getAllType()
  ctx.body = result
})


module.exports = router