const User = require('./User')
const Type = require('./Type')
const Resource = require('./resource')
const Tag = require('./tag')

Resource.hasMany(Tag, {
  foreignKey: 'resourceId'
})

module.exports = {
  User,
  Type,
  Resource,
  Tag
}