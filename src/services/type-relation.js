/**
 * @description 分类关系 services
 */

const { TypeRelation, Type, Resource } = require('../db/model')

/**
 * 创建分类关系
 * @param {number} typeId 分类id
 * @param {number} resourceId 资源id
 */
async function createTypeRelation(typeId, resourceId) {
  const result = await TypeRelation.create({
    typeId,
    resourceId
  })
  return result.dataValues
}

/**
 * 获取某个资源的分类关系
 * @param {number} resourceId 资源id
 */
async function findTypeRelation(resourceId) {
  const result = await TypeRelation.findAll({
    where: {
      resourceId
    },
    include: [
      {
        model: Type
      }
    ]
  })
  return result
}

/**
 * 获取所有资源的分类信息
 */
async function findAllTypeRelation() {
  const result = await TypeRelation.findAll({
    include: [
      {
        model: Type
      }
    ]
  })
  return result
}

/**
 * 删除某个资源的分类关系
 * @param {number} typeId 分类id
 * @param {number} resourceId 资源id
 */
async function destroyTypeRelation(typeId, resourceId) {
  const result = await TypeRelation.destroy({
    where: {
      typeId,
      resourceId
    }
  })
  return result > 0
}

//模拟查询分类关系表
// async function test() {
//   const result = await TypeRelation.findAll({
//     include: [
//       {
//         model: Type
//       },
//       {
//         model: Resource
//       }
//     ]
//   })
//   const data = result.map(r => {
//     const t = r.dataValues
//     t.type = r.dataValues.type.dataValues
//     t.resource = r.dataValues.resource.dataValues
//     return t
//   })
//   console.log(data)
// }
//test()

module.exports = {
  createTypeRelation,
  findTypeRelation,
  findAllTypeRelation,
  destroyTypeRelation
}