/**
 * @description 网站设置 setting
 */

const { Setting } = require('../db/model')

/**
 * 获取某个设置
 * @param {number} id 设置表id
 */
async function findSetting(id) {
  const result = await Setting.findOne({
    where: {
      id
    }
  })
  return result
}

/**
 * 修改某个网站设置
 * @param {number} id 数据表格id
 * @param {object} data 更新的数据对象
 */
async function updateSetting(id, data) {
  const updateData = {}
  if(data.title) {
    updateData.title = data.title
  }
  if(data.logo) {
    updateData.logo = data.logo
  }
  if(data.keywords) {
    updateData.keywords = data.keywords
  }
  if(data.description) {
    updateData.description = data.description
  }

  const result = await Setting.update(updateData, {
    where: {
      id
    }
  })
  
  return result[0] > 0
}

module.exports = {
  findSetting,
  updateSetting
}