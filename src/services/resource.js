/**
 * @description 资源 services
 */

const { Resource, Tag, TypeRelation } = require('../db/model')
const { formatDate } = require('./_format')
const Op = require('sequelize').Op

/**
 * 创建资源
 * @param {object} 创建的数据对象
 */
async function createResource({title, logo, index, link, description}) {
  const result = await Resource.create({
    title,
    logo,
    index,
    link,
    description
  })
  return result
}

/**
 * 修改某个资源
 * @param {number} id 资源id
 * @param {object} data 需要更新的对象
 */
async function updateResource(id, data) {
  const updateData = {}
  if(data.title) {
    updateData.title = data.title
  }
  if(data.logo) {
    updateData.logo = data.logo
  }
  if(data.link) {
    updateData.link = data.link
  }
  if(data.description) {
    updateData.description = data.description
  }
  if(data.index >= 0) {
    updateData.index = data.index
  }
  const result = await Resource.update(updateData, {
    where: {
      id
    }
  })

  return result[0] > 0
}

/**
 * 删除资源
 * @param {number}} 资源id
 */
async function destroyResource(id) {
  await Tag.destroy({
    where: {
      resourceId: id
    }
  })
  await TypeRelation.destroy({
    where: {
      resourceId: id
    }
  })
  const result = await Resource.destroy({
    where: {
      id
    }
  })
  return result > 0
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
async function findAllResourceInfo(page, pageSize, searchValue) {
  const whereOpt = {}
  let limit = null
  let offset = null 
  if(searchValue) {
    whereOpt.title = {
      [Op.like]: '%' + searchValue + '%'
    }
  }


  if(pageSize) {
    limit = pageSize
  }

  if(page >=0 && pageSize) {
    offset = page * pageSize
  }

  let result = await Resource.findAndCountAll({
    where: whereOpt,
    limit,
    offset,
    order: [
      ['index', 'desc']
    ],
    include: [
      {
        model: Tag
      }
    ],
    distinct:true
  })

  if(result.count) {
    result.rows.map(r => {
      return formatDate(r.dataValues)
    })
  }
  return result
}


module.exports = {
  createResource,
  findResourceInfo,
  findAllResourceInfo,
  destroyResource,
  updateResource
}