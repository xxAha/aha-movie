import Axios from '../index'

//创建分类
export const createResourceAPI = function (data) {
  return Axios({
    method: 'post',
    url: '/api/resources/create',
    data
  })
}


//查询某资源的所有分类
export const getResourceTypeAPI = function (id) {
  return Axios({
    method: 'get',
    url: '/api/type-relation',
    data: {
      id
    }
  })
}