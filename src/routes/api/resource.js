/**
 * @description 资源 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addResource, getResourceInfo, getAllResourceInfo } = require('../../controller/resource')
const { addTag } = require('../../controller/tag')
const { addTypeRelation, getAllTypeRelation } = require('../../controller/type-relation')


router.prefix('/api/resources')

//创建资源
router.post('/create', auth, role, async (ctx, next) => {
  //创建资源
  const { title, logo, index, link, tags = [], typeId } = ctx.request.body
  const resResult = await addResource({ title, logo, index, link })
  const resourceId = resResult.data.id

  //创建资源标签
  if (tags.length) {
    const tagResult = await Promise.all(tags.map(tag => addTag(resourceId, tag)))
    const tagList = tagResult.map(i => i.data)
    resResult.data.dataValues.tags = tagList
  }

  //创建分类关系
  const tyResult = await addTypeRelation(typeId, resourceId)
  resResult.data.dataValues.type = []
  resResult.data.dataValues.type.push(tyResult.data)
  
  ctx.body = resResult

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