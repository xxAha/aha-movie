/**
 * @description 分类关系 controller
 */


const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTypeRelationFailInfo, deleteTypeRelationFailInfo, getHomeDataFileInfo } = require('../model/ErrorInfo')
const { createTypeRelation, destroyTypeRelation, findAllTypeRelation } = require('../services/type-relation')
const { findAllTags } = require('../services/tag')

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
    } else {
      return new ErrorModel(deleteTypeRelationFailInfo)
    }

  } catch (error) {
    return new ErrorModel(deleteTypeRelationFailInfo)
  }
}

/**
 * 获取所有的分类关系，整合首页数据
 */
async function getAllTypeRelations() {
  try {
    const result = []

    let tyReResult = await findAllTypeRelation()
    tyReResult = tyReResult.map(i => {
      let obj = i.dataValues
      obj.type = i.dataValues.type.dataValues
      obj.resource = i.dataValues.resource.dataValues
      return obj
    })

    let tagResult = await findAllTags()
    tagResult = tagResult.map(i => i.dataValues)


    tyReResult.forEach(item => {
      const index = result.findIndex(itemRes => {
        return itemRes.id === item.type.id
      })
      if (index !== -1) {
        result[index].list.push(item.resource)
        //排序 这里可以用 index 字段排序
        //对分类下的资源排序
        result[index].list.sort(function(a, b) {
          return b.index - a.index
        })
      } else {
        item.type.resources = []
        item.type.resources.push(item.resource)
        result.push(item.type)
      }
      //排序 这里可以用 index 字段排序
      //对分类进行排序
      result.sort(function(a, b) {
        return b.index - a.index
      })
    })

    result.forEach((item) => {
      item.resources.forEach(l => {
        const filterTags = tagResult.filter(tag => {
          return tag.resourceId === l.id
        })
        l.tags = filterTags
      })
    }) 

    return new SuccessModel(result)

  } catch (error) {
    return new ErrorModel(getHomeDataFileInfo)

  }

}

module.exports = {
  addTypeRelation,
  deleteTypeRelation,
  getAllTypeRelations
}