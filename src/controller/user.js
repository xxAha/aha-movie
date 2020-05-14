/**
 * @description 用户 controller
 */
const jwt = require('jsonwebtoken')
const {
  getUserInfo
} = require('../services/user')
const doCrypto = require('../utils/cryp')
const {
  ErrorModel,
  SuccessModel
} = require('../model/ResModel')
const {
  loginFailInfo,
  loginCheckFailInfo
} = require('../model/ErrorInfo')
const { SECRET } = require('../config/constant')

/**
 * 用户登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(userName, password) {
  const user = await getUserInfo(userName, doCrypto(password))
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
 * 获取当前用户的信息
 * @param {object} info 用户信息
 */
async function getOwnerInfo(ctx) {
  const info = ctx.state.user
  if(info == null) {
    return new ErrorModel(loginCheckFailInfo)
  }
  return new SuccessModel(info)
}


module.exports = {
  login,
  getOwnerInfo
}