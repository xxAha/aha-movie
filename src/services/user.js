/**
 * @description 用户 services
 */
const { User } = require('../db/model')

/**
 * 查询用户信息
 * @param {*} userName 用户名
 * @param {*} password 密码
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }

  if(password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'avatar', 'role'],
    where: whereOpt
  })

  return result

}

module.exports = {
  getUserInfo
}