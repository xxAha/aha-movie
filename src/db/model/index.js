const User = require('./user')
const Type = require('./type')
const Resource = require('./resource')
const Tag = require('./tag')
const TypeRelation = require('./type-relation')
const Setting = require('./setting')

Resource.hasMany(Tag, {
  foreignKey: 'resourceId'
})

TypeRelation.belongsTo(Type, {
  foreignKey: 'typeId'
})

TypeRelation.belongsTo(Resource, {
  foreignKey: 'resourceId'
})

module.exports = {
  User,
  Type,
  Resource,
  Tag,
  TypeRelation,
  Setting
}