/**
 * @description 分类 controller
 */
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTyepFailInfo, getTypesFailInfo, getTypeFailInfo, updateTypeFailInfo, deleteTypeFailInfo } = require('../model/ErrorInfo')
const { createType, findAllType, findType, updateType, destroyType } = require('../services/type')
const { createTypeRelation, findTypeTypeRelation, findAllTypeRelation } = require('../services/type-relation')
const { DEFAULT_PAGE, DEFAULT_PAGESIZE } = require('../config/constant')

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
 * 修改某个分类
 * @param {number} id 分类id
 * @param {object} data 需要更新的数据
 */
async function changeType(id, data) {
  try {
    const result = await updateType(id, data)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel(updateTypeFailInfo)
    }
  } catch (error) {
    return new ErrorModel(updateTypeFailInfo)
  }
}


/**
 * 查询某个分类
 * @param {number} id 分类id
 */
async function getType(id) {

  try {
    //查询分类
    let typeResult = await findType(id)
    //查询分类下的资源
    let tyReResult = await findTypeTypeRelation(id)
    if(tyReResult.length) {
      tyReResult = tyReResult.map(i => {
        const resource = i.dataValues.resource.dataValues
        return resource
      })
      typeResult.dataValues.resources = tyReResult
    }
    return new SuccessModel(typeResult)

  } catch (error) {
    return new ErrorModel(getTypeFailInfo)
  }
}

/**
 * 查询所有分类
 */
async function getAllType(page = DEFAULT_PAGE, pageSize = DEFAULT_PAGESIZE, searchValue = '') {
  try {
    //查询分类
    const typeResult = await findAllType(page, pageSize, searchValue)
    //查询分类下的关系
    const tyRelationResult = await findAllTypeRelation()
    //分类下添加该分类下的资源
    typeResult.rows.forEach(item => {
      tyRelationResult.forEach(ty => {
        if (item.id === ty.typeId) {
          const data = item.dataValues
          if (data.resources) {
            data.resources.push(ty.resource)
          } else {
            data.resources = []
            data.resources.push(ty.resource)
          }
        }
      })
    })

    return new SuccessModel(typeResult)
  } catch (error) {
    return new ErrorModel(getTypesFailInfo)
  }
}

/**
 * 删除分类
 * @param {number} id 分类id
 */
async function deleteType(id) {
  try {
    const result = await destroyType(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel(deleteTypeFailInfo)
    }

  } catch (error) {
    return new ErrorModel(deleteTypeFailInfo)
  }

}


module.exports = {
  addType,
  changeType,
  getAllType,
  getType,
  deleteType
}