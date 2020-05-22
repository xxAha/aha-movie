const router = require('koa-router')()
const { SETTING_ID } = require('../../config/constant')
const { getSetting } = require('../../controller/setting')
const { getAllType } = require('../../controller/type')

router.get('/', async (ctx, next) => {
  const id = SETTING_ID
  const setResult = await getSetting(id)
  const setting = setResult.data.dataValues
  const dataResult = await getAllType()
  const data = dataResult.data.rows
  

  await ctx.render('index', {
    data,
    setting,
    num: 1,
  })
})


module.exports = router