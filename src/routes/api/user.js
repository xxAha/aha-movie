/**
 * @description 用户 API
 */

const router = require('koa-router')()
const {
  login,
  getOwnerInfo,
  changePassword,
  addUser,
  changeUserInfo,
  getAllUser,
  getUserInfoById,
  deleteUser,
  userIsExist
} = require('../../controller/user')
const auth = require('../../middleware/jwt')
const checkOwner = require('../../middleware/checkOwner')
const role = require('../../middleware/role')
const { genValidator } = require('../../middleware/validator')
const userValidate = require('../../validator/user')

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
  const { id } = ctx.state.user
  const result = await getUserInfoById(id)
  ctx.body = result
})

//获取用户是否存在
router.get('/is_exist', auth, async (ctx, next) => {
  const { userName } = ctx.query
  const result = await userIsExist(userName)
  ctx.body = result
})

//通过id获取某个用户的信息
router.get('/:id', auth, async (ctx, next) => {
  let { id } = ctx.params
  id = id && id * 1
  const result = await getUserInfoById(id)
  ctx.body = result
})


//创建用户
router.post('/', auth, role, genValidator(userValidate), async (ctx, next) => {
  const { userName, nickName, role, avatar, password } = ctx.request.body
  const result = await addUser({ userName, nickName, role, avatar, password })
  ctx.body = result
})

//修改用户信息
router.patch('/info/:id', auth, genValidator(userValidate), async (ctx, next) => {
  const { id } = ctx.params
  const { nickName, role, avatar } = ctx.request.body
  const result = await changeUserInfo(id * 1, { nickName, role, avatar })
  ctx.body = result
})

//修改密码
router.patch('/password/:id', auth, checkOwner, genValidator(userValidate), async (ctx, next) => {
  const { id } = ctx.params
  const { oldPassword, newPassword } = ctx.request.body
  const result = await changePassword(id * 1, oldPassword, newPassword)
  ctx.body = result
})


//查询所有用户
router.get('/', auth, async (ctx, next) => {
  let { page, pageSize, searchValue } = ctx.query
  page = page && page * 1
  pageSize = pageSize && pageSize * 1
  const result = await getAllUser(page, pageSize, searchValue)
  ctx.body = result
})

//删除某个用户
router.delete('/:id', auth, role, async (ctx, next) => {
  const { id } = ctx.params
  const result = await deleteUser(id)
  ctx.body = result
})


module.exports = router