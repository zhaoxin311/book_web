const rules = {
  book_no: [
    { required: true, message: "请输入图书编号", trigger: "blur", },
    { min: 6, message: '最小长度在 6 个字符以上', trigger: 'blur' },
    // { max: 10, message: '最大长度在 10 个字符以内', trigger: 'blur' }
  ],
  book_name: [
    { required: true, message: "请输入图书名称", trigger: "blur", },
  ],
  book_author: [
    { required: true, message: "请输入图书作者", trigger: "blur", },
  ],
  book_publish: [
    { required: true, message: "请输入出版社", trigger: "blur", },
  ],
  publish_time: [
    { required: true, message: "请选择出版时间", trigger: "blur", },
  ],
  book_amount: [
    { required: true, message: "请输入图书数量", trigger: "blur", },
  ],
  price: [
    { required: true, message: "请输入图书定价", trigger: "blur", },
  ],
  introduction: [
    { required: true, message: "请输入图书简介", trigger: "blur", },
  ],
}

export default rules
