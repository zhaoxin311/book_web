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

// 获取借阅图书列表
export function getBorrowBookList(data) {
  return request({
    url: 'http://localhost:4001/book/getBorrowBookList',
    method: 'post',
    data
  })
}
// 获取管理员租借管理列表
export function getRentalManageList(data) {
  return request({
    url: 'http://localhost:4001/admin/book/getRentalManageList',
    method: 'post',
    data
  })
}

// 添加图书到我的借阅
export function addBorrowBook(data) {
  return request({
    url: 'http://localhost:4001/book/addBorrowBook',
    method: 'post',
    data
  })
}
// 归还图书
export function returnBook(params) {
  return request({
    url: 'http://localhost:4001/book/returnBook',
    method: 'get',
    params
  })
}

// 续租图书
export function continueBorrow(data) {
  return request({
    url: 'http://localhost:4001/book/continueBorrow',
    method: 'post',
    data
  })
}

// 管理员确认租借图书
export function confirmBorrow(params) {
  return request({
    url: 'http://localhost:4001/admin/book/confirmBorrow',
    method: 'get',
    params
  })
}
// 管理员确认归还图书
export function confirmReturn(params) {
  return request({
    url: 'http://localhost:4001/admin/book/confirmReturn',
    method: 'get',
    params
  })
}
// 管理员确认续租图书
export function confirmContinue(params) {
  return request({
    url: 'http://localhost:4001/admin/book/confirmContinue',
    method: 'get',
    params
  })
}
// 超级管理员重置管理员和普通用户的密码
export function resetPassword(params) {
  return request({
    url: 'http://localhost:4001/superadmin/resetPassword',
    method: 'get',
    params
  })
}

// 管理员获取用户列表
export function getUserList(data) {
  return request({
    url: 'http://localhost:4001/admin/book/getUserList',
    method: 'post',
    data
  })
}
// 个人中心echarts
export function getTypeAmount(data) {
  return request({
    url: 'http://localhost:4001/echarts/getTypeAmount',
    method: 'post',
    data
  })
}
// 个人中心echarts统计数据
export function getUserAmount(data) {
  return request({
    url: 'http://localhost:4001/echarts/getUserAmount',
    method: 'post',
    data
  })
}