/**
 * @description 分类 controller
 */
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTyepFailInfo, getTypesFailInfo } = require('../model/ErrorInfo')
const { createType, findTypes } = require('../services/type')
const { createTypeRelation } = require('../services/type-relation')

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
      typeResult.dataValues.resList =resList
    }

    return new SuccessModel(typeResult)

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