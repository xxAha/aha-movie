/**
 * @description 分类 services
 */

const { Type } = require('../db/model')

/**
 * 创建分类
 * @param {string} title 标题
 * @param {string} logo 图标
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
 * 查询所有分类
 */
async function findTypes() {
  let result = await Type.findAll()
  return result
}


module.exports = {
  createType,
  findTypes
}