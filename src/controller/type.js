/**
 * @description 分类 controller
 */
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTyepFailInfo, getTypesFailInfo, getTypeFailInfo } = require('../model/ErrorInfo')
const { createType, findAllType, findType } = require('../services/type')
const { createTypeRelation, findTypeTypeRelation } = require('../services/type-relation')

/**
 * 创建分类
 * @param {object} obj 数据对象
 */
async function addType({title, logo, index, resources = []}) {
  try {
    //创建分类
    const typeResult = await createType(title, logo, index)
    const typeId = typeResult.id

    //创建分类下的资源
    if(resources.length) {
      const resResult = await Promise.all(resources.map(r => createTypeRelation(typeId, r)))
      const resList = resResult.map(r => r.dataValues)
      typeResult.dataValues.resList = resList
    }

    return new SuccessModel(typeResult)

  } catch (error) {
    return new ErrorModel(createTyepFailInfo)
  }
}


/**
 * 查询某个分类
 * @param {number} id 分类id
 */
async function getType(id) {
  try {
    const result = await findType(id)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getTypeFailInfo)
  }
}

/**
 * 查询所有分类
 */
async function getAllType() {
  try {
    const result = await findAllType()
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getTypesFailInfo)
  }
}

module.exports = {
  addType,
  getAllType,
  getType
}