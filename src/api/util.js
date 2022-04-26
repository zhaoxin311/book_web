export default {
  // 去null值
  filtrate(data) {
    // 定义返回集合
    var list = []
    // 将循环的数据拆分为对象
    for (var item of data) {
      // 定义返回集合的对象
      var obj = {}
      // 将对象的属性循环出来
      for (var attr in item) {
        // 如果属性为guaHaoLeiXing
        if (item[attr] != null) {
          obj[attr] = item[attr]
        }
      }
      // 返回集合添加有值的对象
      list.push(obj)
    }
    return list
  },
  /* 去除为空的字段*/
  nullValueFun(data) {
    var obj = {}
    for (var key in data) {
      // 如果属性为guaHaoLeiXing
      if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        obj[key] = data[key]
      }
    }
    return obj
  },
  // 转换日期格式
  // time为要转换的时间
  // type :  DT1 转换为 2019-01-01 08:00:00格式
  // type :  DT2 转换为 2019-01-01格式
  // type :  DT3 转换为 2019/01/01 08:00:00格式
  // type :  DT4 转换为 2019/01/01格式
  // type :  DT5 转换为 时间戳格式
  // type :  DT6 转换为 2019年01月01日 08时00分00秒
  // type :  DT7 转换为 2019年01月01日
  // num为要加的天数
  // 正数为加，负数为减
  // 不加不减就不用传
  timestampToTime(time, type, num) {
    if (time) {
      var date = ''
      if (typeof time === 'string') {
        time = time.split(/\D+/)
        if (time.length === 3) {
          date = new Date(time[0], time[1] - 1, time[2])
        } else {
          date = new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5])
        }
      } else {
        date = new Date(time)
      }
      if (num !== undefined && num != null && typeof num === 'number') {
        date = new Date(new Date(time).getTime() + num * 60 * 60 * 24 * 1000)// 时间戳以毫秒为单位,也可用其他日期格式
      }
      const yy = date.getFullYear()// 年
      const mm = date.getMonth() + 1// 月
      const dd = date.getDate()// 日
      const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()// 小时
      const mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()// 分钟
      const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()// 秒
      if (type === 'DT1') {
        return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss// yyyy-mm-dd hh:mf:ss
      } else if (type === 'DT2') {
        return yy + '-' + mm + '-' + dd// yyyy-mm-dd
      } else if (type === 'DT3') {
        return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss// yyyy/mm/dd hh:mf:ss
      } else if (type === 'DT4') {
        return yy + '-' + mm + '-' + dd// yyyy/mm/dd
      } else if (type === 'DT5') {
        return date.getTime()// 时间戳 秒数
      } else if (type === 'DT6') {
        return yy + '年' + mm + '月' + dd + '日 ' + hh + '时' + mf + '分' + ss + '秒'// yyyy年mm月dd日 hh时mf分ss秒
      } else if (type === 'DT7') {
        return yy + '年' + mm + '月' + dd + '日'// yyyy年mm月dd日
      } else if (type === 'DT8') {
        return mm + '/' + dd// 月-日
      } else if (type === 'DT9') {
        return mm + '/' + dd// 月/日
      }
    }
  },
  // 获取当前日期时间
  now(type) {
    var now = new Date()// 当前日期时间
    return this.timestampToTime(now, type)// 转换标准格式
  },
  // 时间差
  timeDifference(time) {
    var Time = this.timestampToTime(time, 'DT5')// 传递时间的时间戳
    var now = this.now('DT5')// 当前时间的时间戳
    var difference = 0// 相差秒数
    if (Time < now) { // 之前时间
      difference = (now - Time) / 1000// (现在时间-之前时间)/1000
    } else if (Time > now) { // 之后时间
      difference = (Time - now) / 1000// (之后时间-现在时间)/1000
    } else { // 时间相等
      return 0 + 's'
    }
    if (difference < 60) { // 没达到1分钟
      return Math.floor(difference) + 's'
    } else if (difference >= 60 && difference < 3600) { // 没达到1小时
      return Math.floor(difference / 60) + '分钟'
    } else if (difference >= 3600 && difference < 86400) { // 没达到1天
      return Math.floor(difference / 60 / 60) + '小时'
    } else if (difference >= 86400) { // 超过或等于1天
      return Math.floor(difference / 60 / 60 / 24) + '天'
    }
  },
  // 序号
  indexMethod(index, current, pageSize) {
    return (index + 1) + (current - 1) * pageSize
  },
  goBack(_this) {
    // 调用全局挂载的方法
    _this.$store.dispatch('tagsView/delView', _this.$route)
    // 返回上一步路由
    _this.$router.go(-1)
  }
}
