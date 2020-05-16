import Axios from '../index'

//创建分类
export const createTypeAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/types/create',
    data
  })
}

//获取所有分类
export const getTypesAPI = function(id) {
  return Axios({
    method: 'get',
    url: '/api/types'
  })
}
