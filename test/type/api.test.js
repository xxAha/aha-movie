/**
 * @description tyep API 测试
 */

const server = require('../server')
const { token, typeData } = require('../testInfo')
const { DEFAULT_LOGO } = require('../../src/config/constant')

let typeId

test('创建分类，应该成功', async () => {
  const res = await server
    .post('/api/types')
    .send(typeData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  typeId = res.body.data.id
})

test('修改某个分类，应该成功', async () => {
  const res = await server
    .patch(`/api/types/${typeId}`)
    .send({
      title: '修改后的分类',
      logo: 'http://www.baidu.com',
      index: 999
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('查询某个分类，应该成功', async () => {
  const res = await server
    .get(`/api/types/${typeId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('查询所有分类，应该成功', async () => {
  const res = await server
    .get(`/api/types`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})


test('删除某个分类，应该成功', async () => {
  const res = await server
    .delete(`/api/types/${typeId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})
