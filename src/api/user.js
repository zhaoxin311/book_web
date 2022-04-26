import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:4001/login',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: 'http://localhost:4001/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'http://localhost:4001/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'http://localhost:4001/logout',
    method: 'get'
  })
}
// 图片验证码
export function getImgCaptcha(params) {
  return request({
    url: 'http://localhost:4001/getCaptch',
    method: 'get',
    params
  })
}

// 获取动态路由（侧边栏）数据
export function getAsyncRouter(params) {
  return request({
    url: 'http://localhost:4001/getAuthMenu',
    method: 'get',
    params
  })
}
