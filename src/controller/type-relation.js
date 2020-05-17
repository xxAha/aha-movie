/**
 * @description 分类关系 controller
 */


const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTypeRelationFailInfo, getTypeRelationFailInfo, deleteTypeRelationFailInfo } = require('../model/ErrorInfo')
const { createTypeRelation, findTypeRelation, findAllTypeRelation, destroyTypeRelation } = require('../services/type-relation')

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
 * 获取某个资源的分类关系
 * @param {number} resourceId 资源id
 */
async function getTypeRelation(resourceId) {

  try {
    let result = await findTypeRelation(resourceId)
    if(result.length) {
      result = result.map(i => {
        const type = i.dataValues.type.dataValues
        return type
      })
    }
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getTypeRelationFailInfo)
  }
}


/**
 * 获取所有资源的分类关系
 */
async function getAllTypeRelation() {

  try {
    let result = await findAllTypeRelation()
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getTypeRelationFailInfo)
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
  getTypeRelation,
  getAllTypeRelation,
  deleteTypeRelation
}