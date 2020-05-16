/**
 * @description tag API 测试
 */

const server = require('../server')
const { token } = require('../testInfo')

const tagPostData = {
  title: '测试标签',
  resourceId: 1
}

test('创建标签，应该成功', async () => {
  const res = await server
    .post('/api/tags/create')
    .send(tagPostData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})