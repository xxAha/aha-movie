/**
 * @description 资源 services
 */

const { Resource, Type, Tag } = require('../db/model')

/**
 * 创建资源
 * @param {object} 数据对象
 */
async function createResource({title, logo, index, link, tags}) {
  const result = await Resource.create({
    title,
    logo,
    index,
    link
  })
  return result.dataValues
}


module.exports = {
  createResource
}