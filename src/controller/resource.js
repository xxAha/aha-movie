/**
 * @description 资源 controller
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createResourceFailInfo, getResourceFailInfo, getAllResourceFailInfo,deleteResourceFailInfo, updateResourceFailInfo } = require('../model/ErrorInfo')
const { createResource, findResourceInfo, findAllResourceInfo, destroyResource, updateResource } = require('../services/resource')

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
 * 修改某个资源
 * @param {number} id 资源id
 * @param {object} data 需要更新的数据
 */
async function changeResource(id, data) {
  try {
    //
    const result = await updateResource(id, data)
    if(result) {
      return new SuccessModel()
    }else {
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
    }else {
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
  getAllResourceInfo,
  deleteResource,
  changeResource
}