/**
 * @description type-relation Model 测试
 */
const { TypeRelation } = require('../../src/db/model')

test('Tag 模型的各个属性，符合预期', () => {
  const tag = TypeRelation.build({
    typeId: 1,
    resourceId: 1
  })
  // 验证各个属性
  expect(tag.typeId).toBe(1)
  expect(tag.resourceId).toBe(1)

})