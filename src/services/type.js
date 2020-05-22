/**
 * @description 分类 services
 */

const { Type, TypeRelation } = require('../db/model')
const { formatDate } = require('./_format')
const Op = require('sequelize').Op

/**
 * 创建分类
 * @param {string} title 标题
 * @param {string} logo 图标
 * @param {number} index 排序
 */
async function createType(title, logo, index) {
  const result = await Type.create({
    title,
    logo,
    index
  })
  return result

}

/**
 * 修改某个分类
 * @param {number} id 分类id
 * @param {object} data 需要更新的对象
 */
async function updateType(id, data) {
  const updateData = {}
  if (data.title) {
    updateData.title = data.title
  }
  if (data.logo) {
    updateData.logo = data.logo
  }

  if (data.index >= 0) {
    updateData.index = data.index
  }
  const result = await Type.update(updateData, {
    where: {
      id
    }
  })

  return result[0] > 0
}

/**
 * 查询某个分类
 * @param {number} id 分类id
 */
async function findType(id) {
  let result = await Type.findOne({
    where: {
      id
    }
  })
  return result
}

/**
 * 查询所有分类
 */
async function findAllType(page, pageSize, searchValue) {
  const whereOpt = {}
  let limit = null
  let offset = null 
  if (searchValue) {
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

  let result = await Type.findAndCountAll({
    where: whereOpt,
    limit,
    offset,
    order: [
      ['index', 'desc']
    ]
  })

  if(result.count) {
    result.rows.map(r => {
      return formatDate(r.dataValues)
    })
  }
  
  return result
}

/**
 * 删除分类
 * @param {number} id 分类id
 */
async function destroyType(id) {
  await TypeRelation.destroy({
    where: {
      typeId: id
    }
  })
  const result = await Type.destroy({
    where: {
      id
    }
  })
  return result > 0
}


module.exports = {
  createType,
  updateType,
  findAllType,
  findType,
  destroyType
}