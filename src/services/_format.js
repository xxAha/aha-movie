/**
 * @description 数据格式化
 */

const { timeFormat } = require('../utils/dt')

/**
 * 格式化资源对象
 * @param {object} obj 资源对象
 */
function formatResource(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

module.exports = {
  formatResource
}