/**
 * @description setting 网站设置数据模型
 */
const seq = require('../seq')
const { STRING } = require('../types')

const Setting = seq.define('setting', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '网站 标题'
  },
  logo: {
    type: STRING,
    allowNull: false,
    comment: '网站 logo'
  },
  keywords: {
    type: STRING,
    comment: '网站 关键词'
  },
  description: {
    type: STRING,
    comment: '网站 描述'
  }
})

module.exports = Setting