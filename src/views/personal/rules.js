const rules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '最小长度在 4 个字符以上', trigger: 'blur' },
    { max: 16, message: '最大长度在 16 个字符以内', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      required: true,
      pattern: /^1[3-9]\d{9}$/, /* 可以写正则表达式呦呦呦 */
      message: '目前只支持中国大陆的手机号码',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  roles: [
    { required: true, message: '请选择角色身份', trigger: 'change' }
  ],
  department: [
    { required: true, message: '请填写所在部门或者所在班级信息', trigger: 'blur' }
  ],
  remark: [
    { required: true, message: '请选择备注信息', trigger: 'change' }
  ],
  address: [
    { required: true, message: '请填写联系地址', trigger: 'blur' }
  ]
}

export default rules
