// 限制输入类型
const login = {
  username: /[^\w_]/g,
  password: /(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}\s/g,
  captcha: /[^\a-\z\A-\Z0-9]/g,
  phone: /^0|[^\d]/g,
  imgCaptcha: /[^\a-\z\A-\Z0-9]/g
}

export default login
