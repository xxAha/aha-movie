/**
 * @description 资源 controller
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createResourceFailInfo, getResourceFailInfo, getAllResourceFailInfo } = require('../model/ErrorInfo')
const { createResource, findResourceInfo, findAllResourceInfo } = require('../services/resource')

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


/**
 * 查找某个资源
 * @param {number} id 资源id
 */
async function getResourceInfo(id) {
  try {
    const result = await findResourceInfo(id)
    return new SuccessModel(result)
    
  } catch (error) {
    return new ErrorModel(getResourceFailInfo)
  }
  
}

/**
 * 查找所有资源
 */
async function getAllResourceInfo() {
  try {
    const result = await findAllResourceInfo()
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getAllResourceFailInfo)
  }
  
}

module.exports = {
  addResource,
  getResourceInfo,
  getAllResourceInfo
}