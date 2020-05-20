/**
 * @description setting API 测试
 */

const server = require('../server')
const { token } = require('../testInfo')
const { DEFAULT_LOGO } = require('../../src/config/constant')

test('获取网站设置，应该成功', async () => {
  const res = await server
    .get('/api/setting')
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('修改网站设置，应该成功', async () => {
  const res = await server
    .patch('/api/setting')
    .send({
      title: '测试修改网站标题',
      logo: DEFAULT_LOGO,
      keywords: '测试修改网站关键词',
      description: '测试修改网站描述'
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})