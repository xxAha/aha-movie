/**
 * @description 用户 API
 */

const router = require('koa-router')()
const { login, getOwnerInfo, changePassword } = require('../../controller/user')
const auth = require('../../middleware/jwt')
const checkOwner = require('../../middleware/checkOwner')

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

//获取当前登录用户的信息
router.get('/owner', auth, async (ctx, next) => {
  const result = await getOwnerInfo(ctx)
  ctx.body = result
})

//修改密码
router.patch('/password/:id', auth, checkOwner, async (ctx, next) => {
  const { id } = ctx.params
  const { oldPassword, newPassword } = ctx.request.body
  const result = await changePassword(id * 1, oldPassword, newPassword)
  ctx.body = result
})

module.exports = router