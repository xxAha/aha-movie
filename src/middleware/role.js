async function role(ctx, next) {
  const { role } = ctx.state.user
  if (role === 0) {
    await next()
  } else {
    ctx.throw(403, '没有权限')
    return
  }
}

module.exports = role