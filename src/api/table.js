import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getCity(data) {
  return request({
    url: 'http://localhost:4001/examination/city',
    method: 'post',
    data
  })
}
