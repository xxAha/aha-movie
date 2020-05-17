/**
 * @description 资源 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addResource, getResourceInfo, getAllResourceInfo, deleteResource, changeResource } = require('../../controller/resource')
const { addTag } = require('../../controller/tag')
const { addTypeRelation, getAllTypeRelation } = require('../../controller/type-relation')


router.prefix('/api/resources')

//创建资源
router.post('/create', auth, role, async (ctx, next) => {
  //创建资源
  const { title, logo, index, link, tags, types } = ctx.request.body
  const result = await addResource({ title, logo, index, link, tags, types })
  ctx.body = result

})

//修改某个资源
router.patch('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  let { title, logo, link, index} = ctx.request.body
  const result = await changeResource(id * 1, {title, logo, link, index})
  ctx.body = result
  
})

//删除某个资源
router.delete('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  const result = await deleteResource(id)
  ctx.body = result
})


//查询某个资源
router.get('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  const result = await getResourceInfo(id)
  ctx.body = result
})

//查询所有资源
router.get('/', auth, role, async (ctx, next) => {
  //查询所有的资源
  const resResult = await getAllResourceInfo()
  //查询所有的分类
  const tyRelationResult = await getAllTypeRelation()

  resResult.data.rows.forEach(item => {
    tyRelationResult.data.forEach(ty => {
      if(item.id === ty.resourceId) {
        const data = item.dataValues
        if(data.types) {
          data.types.push(ty.type)
        }else {
          data.types = []
          data.types.push(ty.type)
        }
      }
    })
  })

  ctx.body = resResult
})


module.exports = router