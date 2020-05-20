/**
 * @description  user 数据格式校验
 */
const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    role: {
      type: 'number',
      enum: [0, 1, 2],
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 6
    },
    nickName: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    avatar: {
      type: 'string',
      pattern: '([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://|[wW]{3}.|[wW][aA][pP].|[fF][tT][pP].|[fF][iI][lL][eE].)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
    }
  }
}
/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}
module.exports = userValidate