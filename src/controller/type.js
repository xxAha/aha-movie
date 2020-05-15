/**
 * @description 分类 controller
 */
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTyepFailInfo } = require('../model/ErrorInfo')
const { createType } = require('../services/type')

/**
 * 创建分类
 * @param {object} ctx 执行上下文
 */
async function addType(title, logo) {
  try {
    const result = await createType(title, logo)
    return new SuccessModel(result)

  } catch (error) {
    return new ErrorModel(createTyepFailInfo)
  }
}

module.exports = {
  addType
}