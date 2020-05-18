/**
 * @description 分类 services
 */

const { Type } = require('../db/model')

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
async function findAllType() {
  let result = await Type.findAll()
  return result
}


module.exports = {
  createType,
  findAllType,
  findType
}