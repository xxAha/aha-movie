/**
 * @description 标签 services
 */

const { Tag } = require('../db/model')

/**
 * 创建标签
 * @param {number} resourceId 标签关联的资源id
 * @param {string} title 标签标题
 */
async function createTag(resourceId, title) {
  const result = await Tag.create({
    resourceId,
    title
  })
  return result
}

/**
 * 删除标签
 * @param {number} id 标签id
 */
async function destroyTag(id) {
  const result = await Tag.destroy({
    where: {
      id: id
    }
  })
  return result > 0
}

/**
 * 获取所有标签
 */
async function findAllTags() {
  const result = await Tag.findAll()
  return result
}

module.exports = {
  createTag,
  destroyTag,
  findAllTags
}