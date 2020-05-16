/**
 * @description 分类关系 controller
 */


const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTypeRelationFailInfo, getTypeRelationFailInfo } = require('../model/ErrorInfo')
const { createTypeRelation, findTypeRelation } = require('../services/type-relation')

/**
 * 创建分类关系
 * @param {number} typeId 分类id
 * @param {number} resourceId 资源id
 */
async function addTypeRelation(typeId, resourceId) {
  try {
    const result = await createTypeRelation(typeId, resourceId)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(createTypeRelationFailInfo)
  }
}

/**
 * 获取某个资源的分类信息
 * @param {number} resourceId 资源id
 */
async function getTypeRelation(resourceId) {
  try {
    const result = await findTypeRelation(resourceId)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getTypeRelationFailInfo)
  }
}

module.exports = {
  addTypeRelation,
  getTypeRelation
}