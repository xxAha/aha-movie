import Axios from '../index'

//创建标签
export const createTagAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/tags/create',
    data
  })
}

//删除标签
export const deleteTagAPI = function(id) {
  return Axios({
    method: 'delete',
    url: `/api/tags/${id}`,
  })
}

