/**
 * @description json schema 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv()


/**
* json schema 校验
* @param {Object} schema json schema 规则
* @param {Object} data 待校验的数据
*/
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
  // 没通过校验返回一个error对象
  return ajv.errors[0]
  }
  // 通过校验返回undefined
  }
  module.exports = validate
  