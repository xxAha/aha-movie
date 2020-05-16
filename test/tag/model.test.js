/**
 * @description tag Model 测试
 */

const { Tag } = require('../../src/db/model')


test('Tag 模型的各个属性，符合预期', () => {
  const tag = Tag.build({
    title: '测试标签',
    resourceId: 999
  })
  // 验证各个属性
  expect(tag.title).toBe('测试标签')
  expect(tag.resourceId).toBe(999)

})