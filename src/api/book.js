import request from '@/utils/request'

// 删除书籍类型
export function deleteBookType(params) {
  return request({
    url: 'http://localhost:4001/book/deleteBookType',
    method: 'get',
    params
  })
}

// 获取图书类型列表
export function getBookType(data) {
  return request({
    url: 'http://localhost:4001/book/getBookType',
    method: 'post',
    data
  })
}

// 添加图书类型
export function addBookType(data) {
  return request({
    url: 'http://localhost:4001/book/addBookType',
    method: 'post',
    data
  })
}

// 修改图书类型
export function updateBookType(data) {
  return request({
    url: 'http://localhost:4001/book/updateBookType',
    method: 'post',
    data
  })
}

// 获取图书列表
export function getBookList(data) {
  return request({
    url: 'http://localhost:4001/book/getBookList',
    method: 'post',
    data
  })
}
// 添加图书
export function addBook(data) {
  return request({
    url: 'http://localhost:4001/book/addBook',
    method: 'post',
    data
  })
}
// 修改图书
export function updateBook(data) {
  return request({
    url: 'http://localhost:4001/book/updateBook',
    method: 'post',
    data
  })
}

// 删除书籍
export function deleteBook(params) {
  return request({
    url: 'http://localhost:4001/book/deleteBook',
    method: 'get',
    params
  })
}
