/**
 * @description 分类 controller
 */
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTyepFailInfo, getTypesFailInfo } = require('../model/ErrorInfo')
const { createType, findTypes } = require('../services/type')

/**
 * 创建分类
 * @param {object} ctx 执行上下文
 */
async function addType(title, logo, index) {
  try {
    const result = await createType(title, logo, index)
    return new SuccessModel(result)

  } catch (error) {
    return new ErrorModel(createTyepFailInfo)
  }
}

/**
 * 查询所有分类
 */
async function getTyps() {
  try {
    const result = await findTypes()
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getTypesFailInfo)
  }
}

module.exports = {
  addType,
  getTyps
}