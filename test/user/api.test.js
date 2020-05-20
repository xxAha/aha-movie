/**
 * @description user API 测试
 */
const server = require('../server')
const { DEFAULT_AVATAR } = require('../../src/config/constant')
const { token } =require('../testInfo')

var user = {
  userName: '测试用户',
  nickName: '测试用户',
  role: 0,
  avatar: DEFAULT_AVATAR,
  password: '123456'
}

//用超级管理员的token 创建一个用户
test('创建用户，应该成功', async () => {
  const res = await server
    .post(`/api/users/`)
    .send(user)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  user = res.body.data
})


test('登录，应该成功', async () => {
  const res = await server
    .post('/api/users/login')
    .send({
      userName: '测试用户',
      password: '123456'
    })
  expect(res.body.errno).toBe(0)
  //保存登录的token
  user.token = res.body.data.token
})

test('获取当前登录的用户信息，应该成功', async () => {
  const res = await server
    .get('/api/users/owner')
    .set('Authorization', 'Bearer ' + user.token)
  expect(res.body.errno).toBe(0)
  user.id = res.body.data.id
})

test('获取用户是否存在，应该成功', async () => {
  const res = await server
    .get(`/api/users/is_exist`)
    .send({
      userName: user.userName
    })
    .set('Authorization', 'Bearer ' + user.token)
  expect(res.body.errno).toBe(0)
})

test('通过id查询用户，应该成功', async () => {
  const res = await server
    .get(`/api/users/${user.id}`)
    .set('Authorization', 'Bearer ' + user.token)
  expect(res.body.errno).toBe(0)
})



test('查询用户列表，应该成功', async () => {
  const res = await server
    .get(`/api/users`)
    .set('Authorization', 'Bearer ' + user.token)
    expect(res.body.errno).toBe(0)
})

test('修改用户信息，应该成功', async () => {
  const res = await server
    .patch(`/api/users/info/${user.id}`)
    .send({
      nickName: '修改后的测试用户',
      avatar: 'http://www.baidu.com'
    })
    .set('Authorization', 'Bearer ' + user.token)
    
  expect(res.body.errno).toBe(0)
})

test('修改密码，应该成功', async () => {
  const res = await server
    .patch(`/api/users/password/${user.id}`)
    .send({
      oldPassword: '123456',
      password: '1234567'
    })
    .set('Authorization', 'Bearer ' + user.token)
  expect(res.body.errno).toBe(0)
})

test('删除某个用户，应该成功', async () => {
  const res = await server
    .delete(`/api/users/${user.id}`)
    .set('Authorization', 'Bearer ' + user.token)
    
    expect(res.body.errno).toBe(0)
})

