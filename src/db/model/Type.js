/**
 * @description Type数据模型
 */
const seq = require('../seq')
const {
  STRING,
  INTEGER
} = require('../types')
const { DEFAULT_TYPE_LOGO } = require('../../config/constant')

const Type = seq.define('type', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '类型 标题'
  },
  logo: {
    type: STRING,
    allowNull: false,
    defaultValue: DEFAULT_TYPE_LOGO,
    comment: '类型 logo'
  },
  index: {
    type: INTEGER,
    allowNull: false,
    comment: '排序'
  }
})

module.exports = Type