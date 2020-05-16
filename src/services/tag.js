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

module.exports = {
  createTag
}