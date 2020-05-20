/**
 * @description type-relation 数据格式校验
 */
const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    typeId: {
      type: 'number',
      maxLength: 255,
      minLength: 1
    },
    resourceId: {
      type: 'number',
      maxLength: 255,
      minLength: 1
    }
  }
}
/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function typeRelationValidate(data = {}) {
  return validate(SCHEMA, data)
}
module.exports = typeRelationValidate