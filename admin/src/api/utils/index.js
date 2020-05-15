import Axios from '../index'

//用户登录
export const uploadAPI = function (data) {
  return Axios({
    method: 'post',
    url: '/api/upload',
    data
  })
}