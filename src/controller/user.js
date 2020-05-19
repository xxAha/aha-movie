/**
 * @description 用户 controller
 */
const jwt = require('jsonwebtoken')
const doCrypto = require('../utils/cryp')
const { findUserInfo, updateUserPassword, createUser, updateUserInfo, findAllUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { loginFailInfo, loginCheckFailInfo, updatePasswordFailInfo, createUserFailInfo, updateUserInfoFailInfo, getUserListFailInfo } = require('../model/ErrorInfo')
const { SECRET } = require('../config/constant')
const { DEFAULT_PAGE, DEFAULT_PAGESIZE } = require('../config/constant')

/**
 * 用户登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(userName, password) {

  const user = await findUserInfo({ userName, password: doCrypto(password) })
  if (user == null) {
    return new ErrorModel(loginFailInfo)
  }

  const token = jwt.sign(user.dataValues, SECRET, {
    expiresIn: '1y'
  })

  return new SuccessModel({
    token
  })

}

/**
 * 创建用户
 * @param {object} 创建用户的数据对象
 */
async function addUser({userName, nickName, role, avatar, password}) {
  try {
    password = doCrypto(password)
    const result = await createUser({userName, nickName, role, avatar, password})
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(createUserFailInfo)
  }
}

/**
 * 获取当前用户的信息
 * @param {object} info 用户信息
 */
async function getOwnerInfo(ctx) {
  const info = ctx.state.user
  if (info == null) {
    return new ErrorModel(loginCheckFailInfo)
  }
  return new SuccessModel(info)
}

/**
 * 修改用户信息
 * @param {object} 创建用户的数据对象
 */
async function changeUserInfo(id, data) {
  try {
    const result = await updateUserInfo(id, data)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel(updateUserInfoFailInfo)
    }
  } catch (error) {
    return new ErrorModel(updateUserInfoFailInfo)
  }
}


/**
 * 修改用户密码
 * @param {number} id 用户id
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 */
async function changePassword(id, oldPassword, newPassword) {
  const oldPwd = doCrypto(oldPassword)
  const newPwd = doCrypto(newPassword)
  try {
    const result = await updateUserPassword(id, oldPwd, newPwd)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel(updatePasswordFailInfo)
    }

  } catch (error) {
    return new ErrorModel(updatePasswordFailInfo)
  }
}

/**
 * 查找所有用户
 */
async function getAllUser(page = DEFAULT_PAGE, pageSize = DEFAULT_PAGESIZE, searchValue = '') {

  try {
    const result = await findAllUser(page, pageSize, searchValue)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getUserListFailInfo)
  }

}

module.exports = {
  login,
  addUser,
  getAllUser,
  getOwnerInfo,
  changeUserInfo,
  changePassword
}