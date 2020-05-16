/**
 * @description 资源 controller
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createResourceFailInfo } = require('../model/ErrorInfo')
const { createResource } = require('../services/resource')
const { createTag } = require('../services/tag')

/**
 * 创建资源
 * @param {object}
 */
async function addResource({title, logo, index, link, tags}) {
  try {
    const resResult = await createResource({title, logo, index, link, tags})
    if(tags.length) {
      const resourceId = resResult.id
      console.log(resourceId, tags)
      const tagResult = await Promise.all(tags.map(tag => createTag(resourceId, tag)))
      resResult.tags = tagResult
      return new SuccessModel(resResult)
    }else {
      return new SuccessModel(resResult)
    }
    
  } catch (error) {
    return new ErrorModel(createResourceFailInfo)
  }
  
}

module.exports = {
  addResource
}