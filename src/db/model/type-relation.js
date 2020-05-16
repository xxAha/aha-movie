/**
 * @description type-relation 模型
 */
const seq = require('../seq')
const {
  INTEGER
} = require('../types')

const TypeRelation = seq.define('typeRelation', {
  typeId: {
    type: INTEGER,
    allowNull: false,
    comment: '分类 id'
  },
  resourceId: {
    type: INTEGER,
    allowNull: false,
    comment: '资源 id'
  }
})

module.exports = TypeRelation