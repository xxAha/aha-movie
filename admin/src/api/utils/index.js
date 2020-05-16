import Axios from '../index'

//上传文件
export const uploadAPI = function (data) {
  return Axios({
    method: 'post',
    url: '/api/upload',
    data
  })
}