/**
 * @description Tag数据模型
 */
const seq = require('../seq')
const {
  STRING,
  INTEGER
} = require('../types')

const Tag = seq.define('tag', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '标签 标题'
  },
  resourceId: {
    type: INTEGER,
    allowNull: false,
    comment: '资源 id'
  }
})

module.exports = Tag