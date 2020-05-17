/**
 * @description tag API 测试
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
let tagId

test('创建资源，保存资源id', async () => {
  const res = await server
    .post('/api/resources/create')
    .send(resourcePostData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  resourceId = res.body.data.id
})

test('创建标签，应该成功', async () => {
  const res = await server
    .post('/api/tags/create')
    .send({
      title: '测试标签',
      resourceId
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  tagId = res.body.data.id
})

test('删除标签，应该成功', async () => {
  const res = await server
    .post(`/api/tags/delete/${tagId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})