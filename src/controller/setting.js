/**
 * @description 网站设置 controller
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getSettingFailInfo, updateSettingFailInfo } = require('../model/ErrorInfo')
const { findSetting, updateSetting } = require('../services/setting')

/**
 * 获取某个设置
 * @param {number} id 设置表id
 */
async function getSetting(id) {
  try {
    const result = await findSetting(id)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(getSettingFailInfo)
  }
}

/**
 * 修改某个设置
 * @param {number} id 设置表id
 * @param {object} data 更新的数据对象
 */
async function changeSetting(id, data) {
  try {
    const result = await updateSetting(id, data)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(updateSettingFailInfo)
  }
}

module.exports = {
  getSetting,
  changeSetting
}
