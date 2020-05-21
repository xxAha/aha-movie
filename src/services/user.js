/**
 * @description 用户 services
 */
const { User } = require('../db/model')
const { formatDate } = require('./_format')
const Op = require('sequelize').Op

/**
 * 创建用户
 * @param {object} 创建的数据对象
 */
async function createUser({ userName, role, password, nickName, avatar }) {
  const result = await User.create({
    userName,
    nickName,
    role,
    password,
    avatar
  })

  return result
}

/**
 * 查询用户信息
 * @param {object} data 查询条件对象
 */
async function findUserInfo(data) {
  const whereOpt = {}
  if (data.id) {
    whereOpt.id = data.id
  }
  if (data.userName) {
    whereOpt.userName = data.userName
  }
  if (data.nickName) {
    whereOpt.nickName = data.nickName
  }
  if (data.password) {
    whereOpt.password = data.password
  }
  
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'avatar', 'role'],
    where: whereOpt
  })

  return result

}

/**
 * 查询用户列表
 */
async function findAllUser(page, pageSize, searchValue) {
  const whereOpt = {}
  if(searchValue) {
    whereOpt.userName = {
      [Op.like]: '%' + searchValue + '%'
    }
  }

  let result = await User.findAndCountAll({
    where: whereOpt,
    limit: pageSize,
    offset: page * pageSize,
    order: [
      ['id', 'desc']
    ]
  })

  if(result.count) {
    result.rows.map(r => {
      return formatDate(r.dataValues)
    })
  }
  return result
}


/**
 * 修改用户信息
 * @param {number} id 用户id
 * @param {object} data 修改的数据对象
 */
async function updateUserInfo(id, data) {
  const updateData = {}
  if (data.nickName) {
    updateData.nickName = data.nickName
  }
  // if (data.role) {
  //   updateData.role = data.role
  // }
  if (data.avatar) {
    updateData.avatar = data.avatar
  }

  const result = await User.update(updateData, {
    where: {
      id
    }
  })

  return result[0] > 0
}

/**
 * 修改用户密码
 * @param {number} id 用户id
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 */
async function updateUserPassword(id, oldPassword, newPassword) {
  const result = await User.update({
    password: newPassword
  }, {
    where: {
      id,
      password: oldPassword
    }
  })
  return result[0] > 0
}

/**
 * 删除用户
 * @param {number} id 用户id
 */
async function destroyUser(id) {
  const result = await User.destroy({
    where: {
      id
    }
  })
  return result > 0
}



module.exports = {
  createUser,
  findUserInfo,
  updateUserPassword,
  updateUserInfo,
  findAllUser,
  destroyUser
}