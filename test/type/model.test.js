/**
 * @description type Model 测试
 */

const {
  Type
} = require('../../src/db/model')
const { DEFAULT_TYPE_LOGO } = require('../../src/config/constant')

test('User 模型的各个属性，符合预期', () => {
  const type = Type.build({
    title: '测试标题'
  })
  // 验证各个属性
  expect(type.title).toBe('测试标题')
  expect(type.logo).toBe(DEFAULT_TYPE_LOGO) //严重默认头像

})