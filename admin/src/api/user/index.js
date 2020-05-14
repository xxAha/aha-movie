import Axios from '../index'

//用户登录
export const loginAPI = function (data) {
  return Axios({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

//获取当前登录用户的信息
export const getOwnerInfoAPI = function () {
  return Axios({
    method: 'get',
    url: '/api/users/owner'
  })
}
