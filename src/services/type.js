/**
 * @description 分类 services
 */

const { Type, TypeRelation } = require('../db/model')
const { formatResource } = require('./_format')
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

  if (data.index) {
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
  if (searchValue) {
    whereOpt.title = {
      [Op.like]: '%' + searchValue + '%'
    }
  }

  let result = await Type.findAndCountAll({
    where: whereOpt,
    limit: pageSize,
    offset: page * pageSize,
    order: [
      ['id', 'desc']
    ]
  })

  if(result.count) {
    result.rows.map(r => {
      return formatResource(r.dataValues)
    })
  }
  
  return result
}

/**
 * 删除分类
 * @param {number}} 分类id
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