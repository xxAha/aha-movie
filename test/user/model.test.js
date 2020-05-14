/**
 * @description user Model 测试
 */

const {
  User
} = require('../../src/db/model')
const { DEFAULT_AVATAR } = require('../../src/config/constant')

test('User 模型的各个属性，符合预期', () => {
  const user = User.build({
    userName: 'zhangsan',
    nickName: 'zhangsan',
    password: 'p123123',
    role: 1
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.nickName).toBe('zhangsan')
  expect(user.password).toBe('p123123')
  expect(user.role).toBe(1)
  expect(user.avatar).toBe(DEFAULT_AVATAR) //严重默认头像

})