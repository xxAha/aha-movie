/**
 * @description tag API 测试
 */

const server = require('../server')
const { token, resourceData } = require('../testInfo')

let resourceId
let tagId

test('创建资源，保存资源id', async () => {
  const res = await server
    .post('/api/resources')
    .send(resourceData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  resourceId = res.body.data.id
})

test('创建标签，应该成功', async () => {
  const res = await server
    .post('/api/tags')
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
    .delete(`/api/tags/${tagId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})