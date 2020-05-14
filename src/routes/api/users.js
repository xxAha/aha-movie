const router = require('koa-router')()
const {
  login,
  getOwnerInfo
} = require('../../controller/user')
const auth = require('../../middleware/jwt')

router.prefix('/api/users')

//用户登录
router.post('/login', async (ctx, next) => {
  const {
    userName,
    password
  } = ctx.request.body
  const result = await login(userName, password)
  ctx.body = result
})

router.get('/', async (ctx) => {
  ctx.body = {
    a: 1
  }
})

//获取当前登录用户的新
router.get('/owner', auth, async (ctx, next) => {
  const result = await getOwnerInfo(ctx)
  ctx.body = result
})

module.exports = router