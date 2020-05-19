import Axios from '../index'

//获取网站设置
export const getSettingAPI = function () {
  return Axios({
    method: 'get',
    url: '/api/setting'
  })
}

//修改网站设置
export const updateSettingAPI = function (data) {
  return Axios({
    method: 'patch',
    url: '/api/setting',
    data
  })
}

