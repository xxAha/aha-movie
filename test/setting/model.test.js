/**
 * @description setting Model 测试
 */

const { Setting } = require('../../src/db/model')


test('setting 模型的各个属性，符合预期', () => {
  const setting = Setting.build({
    title: '测试设置',
    logo: 'http://www.baidu.com',
    keywords: '关键词',
    description: '描述'
  })
  // 验证各个属性
  expect(setting.title).toBe('测试设置')
  expect(setting.logo).toBe('http://www.baidu.com')
  expect(setting.keywords).toBe('关键词')
  expect(setting.description).toBe('描述')
})