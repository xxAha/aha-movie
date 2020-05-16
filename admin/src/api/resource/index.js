import Axios from '../index'

//创建分类
export const createResourceAPI = function (data) {
  return Axios({
    method: 'post',
    url: '/api/resources/create',
    data
  })
}

//获取某资源的所有分类
export const getResourceTypeAPI = function (id) {
  return Axios({
    method: 'get',
    url: `/api/type-relation/${id}`,
  })
}

//获取所有资源
export const getAllResourceAPI = function () {
  return Axios({
    method: 'get',
    url: '/api/resources',
  })
}

//获取某个资源
export const getResourceAPI = function (id) {
  return Axios({
    method: 'get',
    url: `/api/resources/${id}`,
  })
}