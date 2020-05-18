/**
 * @description 分类 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addType, getAllType, getType, changeType, deleteType } = require('../../controller/type')



router.prefix('/api/types')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  let { title, logo, index, resources } = ctx.request.body
  index = index * 1
  const result = await addType({title, logo, index, resources})
  ctx.body = result
})

//修改某个资源
router.patch('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  let { title, logo, index,} = ctx.request.body
  const result = await changeType(id * 1, {title, logo, index})
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
  let { page, pageSize, searchValue } = ctx.query
  page = page && page * 1
  pageSize = pageSize && pageSize * 1
  const result = await getAllType(page, pageSize, searchValue)
  ctx.body = result
})

//删除某个资源
router.delete('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  const result = await deleteType(id)
  ctx.body = result
})


module.exports = router