import Axios from '../index'

//创建分类
export const createTypeAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/types',
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
export const getAllTypeAPI = function(page, pageSize, searchValue) {
  return Axios({
    method: 'get',
    url: '/api/types',
    data: {
      page,
      pageSize,
      searchValue
    }
  })
}

//更新某个分类
export const updateTypeAPI = function(id, data) {
  return Axios({
    method: 'patch',
    url: `/api/types/${id}`,
    data
  })
}

//删除某个分类
export const deleteTypeAPI = function(id) {
  return Axios({
    method: 'delete',
    url: `/api/types/${id}`,
  })
}