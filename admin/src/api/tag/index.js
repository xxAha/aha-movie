import Axios from '../index'

//创建分类
export const createTagAPI = function(data) {
  return Axios({
    method: 'post',
    url: '/api/tags/create',
    data
  })
}

