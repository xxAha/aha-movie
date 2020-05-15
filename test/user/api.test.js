/**
 * @description user API 测试
 */
const server = require('../server')
const { userInfo } = require('../testInfo')

let token

test('登录，应该成功', async () => {
  const res = await server
    .post('/api/users/login')
    .send(userInfo)
  //保存登录的token
  token = res.body.data.token
  expect(res.body.errno).toBe(0)
})

test('获取当前登录的用户信息，应该成功', async () => {
  const res = await server
    .get('/api/users/owner')
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)

})