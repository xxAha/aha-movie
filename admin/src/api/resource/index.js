import Axios from '../index'

//创建分类
export const createResourceAPI = function (data) {
  return Axios({
    method: 'post',
    url: '/api/resources/create',
    data
  })
}
