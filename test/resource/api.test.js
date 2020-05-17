/**
 * @description resource API 测试
 */

const server = require('../server')
const { token } = require('../testInfo')
const { DEFAULT_LOGO } = require('../../src/config/constant')

const resourcePostData = {
  title: '测试资源标题',
  logo: DEFAULT_LOGO,
  link: 'http://www.baidu.com',
  index: 1
}

let resourceId

test('创建资源，应该成功', async () => {
  const res = await server
    .post('/api/resources/create')
    .send(resourcePostData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  resourceId = res.body.data.id
})

test('某个资源，应该成功', async () => {
  const res = await server
    .get(`/api/resources/${resourceId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('查询资源列表，应该成功', async () => {
  const res = await server
    .get('/api/resources')
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})



