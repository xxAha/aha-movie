/**
 * @description tyep API 测试
 */

const server = require('../server')
const { token } = require('../testInfo')
const { DEFAULT_LOGO } = require('../../src/config/constant')

const typePostData = {
  title: '测试标题',
  logo: DEFAULT_LOGO,
  index: 0
}

test('创建分类，应该成功', async () => {
  const res = await server
    .post('/api/types/create')
    .send(typePostData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('查询分类，应该成功', async () => {
  const res = await server
    .get('/api/types')
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

