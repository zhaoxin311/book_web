import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }

export function getBookType(data) {
  return request({
    url: 'http://localhost:4001/book/getBookType',
    method: 'post',
    data
  })
}

