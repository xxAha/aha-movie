/**
 * @description Type数据模型
 */
const seq = require('../seq')
const {
  STRING
} = require('../types')
const { DEFAULT_TYPE_LOGO } = require('../../config/constant')

const Type = seq.define('type', {
  title: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '类型 标题'
  },
  logo: {
    type: STRING,
    allowNull: false,
    defaultValue: DEFAULT_TYPE_LOGO,
    comment: '类型 logo'
  }
})

module.exports = Type