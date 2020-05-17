import Axios from '../index'

//创建资源
export const createResourceAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/resources/create',
    data
  })
}

//获取所有资源
export const getAllResourceAPI = function(page, pageSize, searchValue) {
  return Axios({
    method: 'get',
    url: '/api/resources',
    data: {
      page,
      pageSize,
      searchValue
    }
  })
}

//获取某个资源
export const getResourceAPI = function(id) {
  return Axios({
    method: 'get',
    url: `/api/resources/${id}`,
  })
}

//删除某个资源
export const deleteResourceAPI = function(id) {
  return Axios({
    method: 'delete',
    url: `/api/resources/${id}`,
  })
}

//更新某个资源
export const updateResourceAPI = function(id, data) {
  return Axios({
    method: 'patch',
    url: `/api/resources/${id}`,
    data
  })
}