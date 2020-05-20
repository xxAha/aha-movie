/**
 * @description resource Model 测试
 */

const {
  Resource
} = require('../../src/db/model')
const { DEFAULT_LOGO } = require('../../src/config/constant')


test('resource 模型的各个属性，符合预期', () => {
  const resource = Resource.build({
    title: '测试资源',
    link: 'http://www.baidu.com',
    index: 1
  })
  // 验证各个属性
  expect(resource.title).toBe('测试资源')
  expect(resource.link).toBe('http://www.baidu.com')
  expect(resource.index).toBe(1)
  expect(resource.logo).toBe(DEFAULT_LOGO)

})