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

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
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
