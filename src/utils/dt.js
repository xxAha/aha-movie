/**
 * @description 时间相关的工具函数
 */

const moment = require('moment')

/**
 * 格式化时间，如 2020-05-16T10:03:57.000Z
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return moment(moment(new Date(str)).valueOf()).format('YYYY/MM/DD')
}

module.exports = {
  timeFormat
}