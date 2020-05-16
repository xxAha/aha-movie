/**
 * @description tag API 测试
 */

const server = require('../server')
const { token } = require('../testInfo')
const { DEFAULT_LOGO } = require('../../src/config/constant')

let resourceId
let typeId

const typePostData = {
  title: '测试标题',
  logo: DEFAULT_LOGO,
  index: 0
}

const resourcePostData = {
  title: '测试资源标题',
  logo: DEFAULT_LOGO,
  link: 'http://www.baidu.com',
  index: 1
}

test('创建分类，保存资源id', async () => {
  const res = await server
    .post('/api/types/create')
    .send(typePostData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  typeId = res.body.data.id
})

test('创建资源，保存资源id', async () => {
  const res = await server
    .post('/api/resources/create')
    .send(resourcePostData)
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
  resourceId = res.body.data.id
})

test('创建分类关系，应该成功', async () => {
  const res = await server
    .post('/api/type-relation/create')
    .send({
      typeId,
      resourceId
    })
    .set('Authorization', 'Bearer ' + token)
  expect(res.body.errno).toBe(0)
})