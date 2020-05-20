/**
 * @description resource API 测试
 */

const server = require('../server')
const { token, resourceData } = require('../testInfo')

let resourceId

test('创建资源，应该成功', async () => {
  const res = await server
    .post('/api/resources')
    .send(resourceData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  resourceId = res.body.data.id
})

test('修改某个资源，应该成功', async () => {
  const res = await server
    .patch(`/api/resources/${resourceId}`)
    .send({
      title: '修改后的资源',
      logo: 'http://www.baidu.com',
      index: 999,
      link: 'http://www.baidu.com',
      description: '描述'
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('查询某个资源，应该成功', async () => {
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


test('删除某个资源，应该成功', async () => {
  const res = await server
    .delete(`/api/resources/${resourceId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})




