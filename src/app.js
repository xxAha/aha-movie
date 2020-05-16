const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const {
  ErrorModel
} = require('./model/ResModel')
const {
  TokenValidationFailInfo
} = require('./model/ErrorInfo')

// error handler
onerror(app)

app.use(koaBody({
  //使用文件上传
  multipart: true,
  //koa-body 里引入了第三方模块 formidable(node-formidable)
  //formidable 的配置可以查
  formidable: {
    //上传目录
    uploadDir: path.join(__dirname, '../uploadFiles'),
    //是否保留文件后缀名
    keepExtensions: true,
    //限制图片大小 1 * 1024 * 1024 = 1m
    maxFileSize: 1 * 1024 * 1024
  }
}))

// middlewares
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, 'public')))
app.use(require('koa-static')(path.resolve(__dirname, '../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


//koa-jwt 401 token 验证失败的处理中间件
app.use(async function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = new ErrorModel(TokenValidationFailInfo)
    } else {
      throw err;
    }
  })
})

//自动加载路由
const initLoadRouters = require('../src/routes/core/init')
initLoadRouters(app)

//app.use(userRouter.routes(), userRouter.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app