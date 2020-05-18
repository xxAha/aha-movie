/**
 * @description 分类关系 controller
 */


const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTypeRelationFailInfo, deleteTypeRelationFailInfo } = require('../model/ErrorInfo')
const { createTypeRelation, destroyTypeRelation } = require('../services/type-relation')

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
 * 删除某个资源的分类关系
 * @param {number} typeId 分类id
 * @param {number} resourceId 资源id
 */
async function deleteTypeRelation(typeId, resourceId) {
  try {
    const result = await destroyTypeRelation(typeId, resourceId)
    if (result) {
      return new SuccessModel()
    }else {
      return new ErrorModel(deleteTypeRelationFailInfo)
    }
    
  } catch (error) {
    return new ErrorModel(deleteTypeRelationFailInfo)
  }
}

module.exports = {
  addTypeRelation,
  deleteTypeRelation
}