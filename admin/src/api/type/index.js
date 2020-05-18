import Axios from '../index'

//创建分类
export const createTypeAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/types/create',
    data
  })
}

//获取某个分类
export const getTypeAPI = function(id) {
  return Axios({
    method: 'get',
    url: `/api/types/${id}`
  })
}


//获取所有分类
export const getAllTypeAPI = function(id) {
  return Axios({
    method: 'get',
    url: '/api/types'
  })
}
