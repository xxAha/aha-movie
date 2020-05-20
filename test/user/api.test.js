/**
 * @description user API 测试
 */
const server = require('../server')
const { DEFAULT_AVATAR } = require('../../src/config/constant')

//超级管理元
const userInfo = {
  userName: 'superAdmin',
  password: 'admin',
}

let token
let id
let testId

test('登录，应该成功', async () => {
  const res = await server
    .post('/api/users/login')
    .send(userInfo)
  expect(res.body.errno).toBe(0)
  //保存登录的token
  token = res.body.data.token
})

test('获取当前登录的用户信息，应该成功', async () => {
  const res = await server
    .get('/api/users/owner')
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  id = res.body.data.id
})


test('获取用户是否存在，应该成功', async () => {
  const res = await server
    .get(`/api/users/is_exist?userName=${userInfo.userName}`)
    .set('Authorization', 'Bearer ' + token)
  
  expect(res.body.errno).toBe(0)
})

test('通过id查询用户，应该成功', async () => {
  const res = await server
    .get(`/api/users/${id}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('创建用户，应该成功', async () => {
  const res = await server
    .post(`/api/users/`)
    .send({
      userName: '测试用户',
      nickName: '测试用户',
      role: 1,
      avatar: DEFAULT_AVATAR,
      password: '123456'
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  testId = res.body.data.id
})



// test('获取当前登录的用户信息，应该成功', async () => {
//   const res = await server
//     .get('/api/users/owner')
//     .set('Authorization', 'Bearer ' + token)
//   expect(res.body.errno).toBe(0)

// })