import Axios from '../index'

//用户登录
export const loginAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/users/login',
    data
  })
}


//获取某个用户的信息
export const getUserInfoAPI = function(id) {
  return Axios({
    method: 'get',
    url: `/api/users/${id}`
  })
}

//获取当前登录用户的信息
export const getOwnerInfoAPI = function() {
  return Axios({
    method: 'get',
    url: '/api/users/owner'
  })
}


//修改密码
export const changePasswordAPI = function({ id, oldPassword, newPassword }) {
  return Axios({
    method: 'patch',
    url: `/api/users/password/${id}`,
    data: {
      oldPassword,
      newPassword
    }
  })
}

//创建用户
export const createUserAPI = function(data) {
  return Axios({
    method: 'post',
    url: `/api/users`,
    data
  })
}

//修改用户信息
export const updateUserInfoAPI = function(id, data) {
  return Axios({
    method: 'patch',
    url: `/api/users/info/${id}`,
    data
  })
}

//获取用户列表
export const getAllUserAPI = function(page, pageSize, searchValue) {
  return Axios({
    method: 'get',
    url: '/api/users',
    data: {
      page,
      pageSize,
      searchValue
    }
  })
}

//删除某个用户
export const deleteUserAPI = function(id) {
  return Axios({
    method: 'delete',
    url: `/api/users/${id}`,
  })
}