
export default function createPasswordRules(_this, formName) {
  var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else if (value.length < 6) {
      callback(new Error('请输入最少6位数的密码'))
    } else {
      if (_this[formName].confirmPassword !== '') {
        _this.$refs[formName].validateField('confirmPassword')
      }
      callback()
    }
  }
  var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value.length < 6) {
      callback(new Error('请输入最少6位数的密码'))
    } else if (value !== _this[formName].password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
  return {
    validatePass,
    validatePass2
  }
}
