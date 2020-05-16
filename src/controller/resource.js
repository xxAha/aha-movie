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
async function addResource({title, logo, index, link}) {
  try {
    const result = await createResource({title, logo, index, link})
    return new SuccessModel(result)
    
  } catch (error) {
    return new ErrorModel(createResourceFailInfo)
  }
  
}

module.exports = {
  addResource
}