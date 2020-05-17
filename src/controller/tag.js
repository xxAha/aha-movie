/**
 * @description 标签 controller
 */


const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createTagFailInfo, deleteTagFailInfo } = require('../model/ErrorInfo')
const { createTag, destroyTag } = require('../services/tag')

/**
 * 创建标签
 * @param {number} resourceId 标签关联的资源id
 * @param {string} title 标签标题
 */
async function addTag(resourceId, title) {
  try {
    const result = await createTag(resourceId, title)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(createTagFailInfo)
  }
}

/**
 * 删除标签
 * @param {number} id 标签id
 */
async function deleteTag(id) {
  try {
    const result = await destroyTag(id)
    console.log(result)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(deleteTagFailInfo)
  }
}


module.exports = {
  addTag,
  deleteTag
}