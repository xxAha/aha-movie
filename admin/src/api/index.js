import axios from 'axios';
import router from '../router'

// 取消请求
const CancelToken = axios.CancelToken;
let cancel, promiseArr = {};
const Axios = axios.create({
  // baseURL: 'http://192.168.2.189:8080',
  timeout: 10000
});
// http request 拦截器
Axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('取消重复请求')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (sessionStorage.getItem('access_token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
  }
  return config
}, error => {
  return Promise.reject(error);
});
// http response 拦截器
Axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        //返回 401 清除token资讯并跳转到登录页面
        sessionStorage.clear();
        router.replace({
          path: '/login',
          // query: {
          //   register: 0
          // }
        })
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = '连接错误'
    }
  } else {
    error.message = "连接到服务器失败"
  }
  // Message.error(error.message + error.response.status)
  return Promise.reject(error.response)
});
export default ({method, url, data = ''}) => {
  method = method && method.toLowerCase()
  return new Promise((resolve, reject) => {
    Axios({
        method,
        url,
        data: method === 'post' || method === 'put' ? data : null,
        params: method === 'get' || method === 'delete' ? data : null,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
