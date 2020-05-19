/**
 * @description 用户 services
 */
const { User } = require('../db/model')

/**
 * 查询用户信息
 * @param {object} data 查询条件对象
 */
async function findUserInfo(data) {
  const whereOpt = {}
  if(data.id) {
    whereOpt.id = data.id
  }
  if(data.userName) {
    whereOpt.userName = data.userName
  }
  if(data.password) {
    whereOpt.password = data.password
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'avatar', 'role'],
    where: whereOpt
  })

  return result

}

/**
 * 修改用户密码
 * @param {number} id 用户id
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 */
async function updateUserPassword(id, oldPassword, newPassword) {
  const result = await User.update({
    password: newPassword
  }, {
    where: {
      id,
      password: oldPassword
    }
  })
  return result[0] > 0
}

module.exports = {
  findUserInfo,
  updateUserPassword
}