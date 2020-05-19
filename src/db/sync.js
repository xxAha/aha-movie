/**
 * @description sequelize 同步数据库
 * @author 双越老师
 */

const seq = require('./seq')

const { User, Setting } = require('./model')
const { DEFAULT_LOGO } = require('../config/constant')
const doCrypto = require('../utils/cryp')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

async function initDate() {
  const setting = await Setting.create({
    title: 'Aha电影库',
    logo: DEFAULT_LOGO
  })
  const superAdmin = await User.create({
    userName: 'superAdmin',
    nickName: 'admin',
    role: 0,
    password: doCrypto('admin')
  })
  const admin = await User.create({
    userName: 'admin',
    nickName: 'admin',
    role: 1,
    password: doCrypto('admin')
  })
  return {
    setting: setting.dataValues,
    superAdmin: superAdmin.dataValues,
    admin: admin.dataValues
  }
}


// 执行同步
seq.sync({
  force: true
}).then(async () => {
  //初始化创建一个管理员
  console.log('sync ok')
  const result = await initDate()
  console.log('网站默认设置创建成功：', result.setting)
  console.log('超级管理创建成功：', result.superAdmin)
  console.log('管理创建成功：', result.admin)
  process.exit()
})