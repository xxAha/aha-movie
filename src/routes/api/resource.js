/**
 * @description 资源 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const { role } = require('../../middleware/role')
const { addResource, getResourceInfo, getAllResourceInfo, deleteResource, changeResource } = require('../../controller/resource')
const { genValidator } = require('../../middleware/validator')
const resourceValidate = require('../../validator/resource')


router.prefix('/api/resources')

//创建资源
router.post('/', auth, role, genValidator(resourceValidate), async (ctx, next) => {
  //创建资源
  const { title, logo, index, link, description,tags, types } = ctx.request.body
  const result = await addResource({ title, logo, index, link, description,tags, types })
  ctx.body = result

})

//修改某个资源
router.patch('/:id', auth, role, genValidator(resourceValidate), async (ctx, next) => {
  const { id } = ctx.params
  let { title, logo, link, index, description} = ctx.request.body
  const result = await changeResource(id * 1, {title, logo, link, index, description})
  ctx.body = result
  
})

//查询某个资源
router.get('/:id', auth, async (ctx, next) => {
  const { id } = ctx.params
  const result = await getResourceInfo(id)
  ctx.body = result
})

//查询所有资源
router.get('/', auth, async (ctx, next) => {
  let { page, pageSize, searchValue } = ctx.query
  page = page && page * 1
  pageSize = pageSize && pageSize * 1
  const result = await getAllResourceInfo(page, pageSize, searchValue)
  ctx.body = result
})

//删除某个资源
router.delete('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  const result = await deleteResource(id)
  ctx.body = result
})


module.exports = router