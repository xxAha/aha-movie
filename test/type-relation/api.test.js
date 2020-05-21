/**
 * @description type-relation API 测试
 */

const server = require('../server')
const { token,resourceData, typeData } = require('../testInfo')

let resourceId
let typeId

test('创建一个资源，保存id', async () => {
  const res = await server
    .post(`/api/resources`)
    .send(resourceData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  resourceId = res.body.data.id
})

test('创建一个分类，保存id', async () => {
  const res = await server
    .post(`/api/types`)
    .send(typeData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  typeId = res.body.data.id
})

test('创建分类关系，应该成功', async () => {
  const res = await server
    .post(`/api/type-relation`)
    .send({
      typeId,
      resourceId
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('删除分类关系，应该成功', async () => {
  const res = await server
    .delete(`/api/type-relation?typeId=${typeId}&resourceId=${resourceId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('删除某个资源，应该成功', async () => {
  const res = await server
    .delete(`/api/resources/${resourceId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})

test('删除某个分类，应该成功', async () => {
  const res = await server
    .delete(`/api/types/${typeId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})