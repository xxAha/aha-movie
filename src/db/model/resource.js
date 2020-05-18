/**
 * @description resource数据模型
 */
const seq = require('../seq')
const {
  STRING,
  INTEGER
} = require('../types')
const { DEFAULT_LOGO } = require('../../config/constant')

const Resource = seq.define('resource', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '资源 标题'
  },
  logo: {
    type: STRING,
    allowNull: false,
    defaultValue: DEFAULT_LOGO,
    comment: '资源 logo'
  },
  link: {
    type: STRING,
    allowNull: false,
    defaultValue: DEFAULT_LOGO,
    comment: '资源 link'
  },
  index: {
    type: INTEGER,
    allowNull: false,
    comment: '资源 排序'
  },
  description: {
    type: STRING,
    allowNull: true,
    comment: '资源 描述'
  }
})

module.exports = Resource