/**
 * @description 资源 services
 */

const { Resource, Tag } = require('../db/model')
const { formatResource } = require('./_format')

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
  return result
}

/**
 * 查找某个资源
 * @param {number} id 资源id
 */
async function findResourceInfo(id) {
  const result = await Resource.findOne({
    where: {
      id
    },
    include: [
      {
        model: Tag
      }
    ]
  })
  return result
}

/**
 * 查找所有资源
 */
async function findAllResourceInfo(id) {
  let result = await Resource.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: Tag
      }
    ]
  })

  if(result.count) {
    result.rows.map(r => {
      return formatResource(r.dataValues)
    })
  }
  return result
}


module.exports = {
  createResource,
  findResourceInfo,
  findAllResourceInfo
}