/**
 * @description 网站设置 API
 */

const router = require('koa-router')()
const auth = require('../../middleware/jwt')
const role = require('../../middleware/role')
const { getSetting, changeSetting } = require('../../controller/setting')
const { SETTING_ID } = require('../../config/constant')

router.prefix('/api/setting')

//获取网站设置
router.get('/', auth, async (ctx, next) => {
  //id 写死
  const id = SETTING_ID
  const result = await getSetting(id)
  ctx.body = result
})

//修改网站设置
router.patch('/', auth, role, async (ctx, next) => {
  const id = SETTING_ID
  const { title, logo, keywords, description } = ctx.request.body 
  const result = await changeSetting(id, { title, logo, keywords, description })
  ctx.body = result
})


module.exports = router