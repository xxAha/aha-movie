const { isProd } = require('../utils/env')

module.exports = {
  SECRET: "test",
  DEFAULT_AVATAR: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589428436131&di=f0fd8bcd64be1b7c60356a23114f86d6&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png',
  DEFAULT_LOGO: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589459451607&di=c9f27ab321a9d95e2e98f05b3f88368e&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F15%2F5905d300869d5_610.jpg',
  CRYPTO_SECRET_KEY: 'sljlcas',
  PUBLIC_PATH: isProd? 'http://localhost:3000': 'http://localhost:3000',
  DEFAULT_PAGE: 0,
  DEFAULT_PAGESIZE: 10,
  SETTING_ID: 1
}