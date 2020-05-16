/**
 * @description 资源 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { addResource } = require('../../controller/resource')
const { addTag } = require('../../controller/tag')




router.prefix('/api/resources')

//创建分类
router.post('/create', auth, role, async (ctx, next) => {
  const { title, logo, index, link, tags = [] } = ctx.request.body
  const resResult = await addResource({ title, logo, index, link })

  if (tags.length) {
    const resourceId = resResult.data.id
    const tagResult = await Promise.all(tags.map(tag => addTag(resourceId, tag)))
    const tagList = tagResult.map(i => i.data)
    resResult.data.tags = tagList
  }

  ctx.body = resResult

})


module.exports = router