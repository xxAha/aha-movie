const {
  ErrorModel
} = require('../model/ResModel')
const {
  roleCheckFail
} = require('../model/ErrorInfo')

async function role(ctx, next) {
  const {role} = ctx.state.user
  if (role === 0) {
    await next()
  } else {
    ctx.body = new ErrorModel(roleCheckFail)
    return
  }
}

module.exports = role