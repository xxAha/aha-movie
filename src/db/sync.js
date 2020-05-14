/**
 * @description sequelize 同步数据库
 * @author 双越老师
 */

const seq = require('./seq')

const { User } = require('./model')
const doCrypto = require('../utils/cryp')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

async function createAdmin(params) {
  const admin = await User.create({
    userName: 'admin',
    nickName: 'admin',
    role: 0,
    password: doCrypto('admin')
  })
  return admin.dataValues
}

// 执行同步
seq.sync({
  force: true
}).then(async () => {
  //初始化创建一个管理员
  const admin = await createAdmin()
  console.log('超级管理创建成功：', admin)
  console.log('sync ok')
  process.exit()
})


