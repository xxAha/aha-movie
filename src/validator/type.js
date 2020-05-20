/**
 * @description type 数据格式校验
 */
const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    logo: {
      type: 'string',
      pattern: '([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://|[wW]{3}.|[wW][aA][pP].|[fF][tT][pP].|[fF][iI][lL][eE].)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
    },
    index: {
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
function typeValidate(data = {}) {
  return validate(SCHEMA, data)
}
module.exports = typeValidate