/**
 * @description 资源 controller
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createResourceFailInfo, getResourceFailInfo, getAllResourceFailInfo, deleteResourceFailInfo, updateResourceFailInfo } = require('../model/ErrorInfo')
const { createResource, findResourceInfo, findAllResourceInfo, destroyResource, updateResource } = require('../services/resource')
const { createTag } = require('../services/tag')
const { createTypeRelation } = require('../services/type-relation')
const { findAllTypeRelation, findResTypeRelation } = require('../services/type-relation')
const { DEFAULT_PAGE, DEFAULT_PAGESIZE } = require('../config/constant')

/**
 * 创建资源
 * @param {object}
 */
async function addResource({ title, logo, index, link, description, tags = [], types = [] }) {
  try {
    //创建资源
    const resResult = await createResource({ title, logo, index, link, description })
    const resourceId = resResult.id

    //创建资源下的标签
    if (tags.length) {
      const tagResult = await Promise.all(tags.map(tag => createTag(resourceId, tag)))
      const tagList = tagResult.map(i => i.dataValues)
      resResult.dataValues.tags = tagList
    }
    //创建资源下的分类关系
    if (types.length) {
      const tyResult = await Promise.all(types.map(type => createTypeRelation(type, resourceId)))
      const typeList = tyResult.map(i => i.dataValues)
      resResult.dataValues.types = typeList
    }

    return new SuccessModel(resResult)

  } catch (error) {
    return new ErrorModel(createResourceFailInfo)
  }

}

/**
 * 修改某个资源
 * @param {number} id 资源id
 * @param {object} data 需要更新的数据
 */
async function changeResource(id, data) {
  try {
    const result = await updateResource(id, data)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel(updateResourceFailInfo)
    }
  } catch (error) {
    return new ErrorModel(updateResourceFailInfo)
  }
}

/**
 * 删除资源
 * @param {object}
 */
async function deleteResource(id) {
  try {
    const result = await destroyResource(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel(deleteResourceFailInfo)
    }

  } catch (error) {
    return new ErrorModel(deleteResourceFailInfo)
  }

}


/**
 * 查找某个资源
 * @param {number} id 资源id
 */
async function getResourceInfo(id) {

  try {
    //获取资源信息
    let resResult = await findResourceInfo(id)
    //获取资源下的分类信息
    let tyReResult = await findResTypeRelation(id)
    if(tyReResult.length) {
      tyReResult = tyReResult.map(i => {
        const type = i.dataValues.type.dataValues
        return type
      })
      resResult.dataValues.types = tyReResult
    }
    return new SuccessModel(resResult)

  } catch (error) {
    return new ErrorModel(getResourceFailInfo)
  }

}

/**
 * 查找所有资源
 */
async function getAllResourceInfo(page = DEFAULT_PAGE, pageSize = DEFAULT_PAGESIZE, searchValue = '') {

  try {
    //查询所有的资源
    const resResult = await findAllResourceInfo(page, pageSize, searchValue)
    //查询所有的分类关系
    const tyRelationResult = await findAllTypeRelation()

    resResult.rows.forEach(item => {
      tyRelationResult.forEach(ty => {
        if (item.id === ty.resourceId) {
          const data = item.dataValues
          if (data.types) {
            data.types.push(ty.type)
          } else {
            data.types = []
            data.types.push(ty.type)
          }
        }
      })
    })

    return new SuccessModel(resResult)
  } catch (error) {
    return new ErrorModel(getAllResourceFailInfo)
  }

}

module.exports = {
  addResource,
  getResourceInfo,
  getAllResourceInfo,
  deleteResource,
  changeResource
}