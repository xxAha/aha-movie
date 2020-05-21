const router = require('koa-router')()
const { SETTING_ID } = require('../../config/constant')
const { getSetting } = require('../../controller/setting')
const { getAllTypeRelations } = require('../../controller/type-relation')

router.get('/', async (ctx, next) => {
  const id = SETTING_ID
  const setResult = await getSetting(id)
  const setting = setResult.data.dataValues
  const dataResut = await getAllTypeRelations()
  const data = dataResut.data
  

  await ctx.render('index', {
    data,
    setting
  })
})


module.exports = router