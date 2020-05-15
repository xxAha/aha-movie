/**
 * @description tyep API 测试
 */

const server = require('../server')
const { token, typePostData } = require('../testInfo')

test('创建分类，应该成功', async () => {
  const res = await server
    .post('/api/types/create')
    .send(typePostData)
    .set('Authorization', 'Bearer ' + token)

  expect(res.body.errno).toBe(0)
})

