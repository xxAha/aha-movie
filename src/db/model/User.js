/**
 * @description user数据模型
 */
const seq = require('../seq')
const {
  STRING,
  INTEGER
} = require('../types')
const { DEFAULT_AVATAR } = require('../../config/constant')


const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true, //唯一，不能重复
    comment: '用户名 唯一' //数据库注释
  },
  role: {
    type: INTEGER,
    allowNull: false,
    //0 -> 超级管理员
    //1 -> 一般管理员
    comment: '角色' 
  },
  password: {
    type: STRING,
    allowNull: false,
    // set(val) {
    //   // val 是设置的值
    //   // 密码加密逻辑
    //   const psw = doCrypto(val)
    //   //最后执行 this.setDataValue 方法
    //   this.setDataValue('password', psw)
    // },
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  avatar: {
    type: STRING,
    defaultValue: DEFAULT_AVATAR,
    comment: '头像 图片地址'
  }

})


module.exports = User