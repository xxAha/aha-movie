const {
  ErrorModel
} = require('../model/ResModel')
const {
  roleCheckFailInfo
} = require('../model/ErrorInfo')

async function role(ctx, next) {
  const {role} = ctx.state.user
  if (role === 0) {
    await next()
  } else {
    ctx.body = new ErrorModel(roleCheckFailInfo)
    return
  }
}

module.exports = role