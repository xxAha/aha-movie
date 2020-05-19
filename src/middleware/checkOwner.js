async function checkOwner(ctx, next) {
  if (ctx.params.id != ctx.state.user.id) {
    ctx.throw(403, '没有权限')

  }
  await next()
}


module.exports = checkOwner