<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="日期" width="180">
      <template slot-scope="scope">
        <input :class="colorFun(scope.row.date)" :value="scope.row.date | dataFun" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '<span class="color">2016-05-02</span>',
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  // 计算属性 不要和 methods属性中的方法重复，否则只会调用 methods中的方法
  computed: {
    colorFun() {
      return function(val) {
        var reg = /<span.+<\/span>/;
        if (reg.test(val)) {
          var objE = document.createElement("div");
          objE.innerHTML = val;
          return objE.childNodes[0].className;
        } else {
          return '';
        }
      };
    }
  },
  filters: {
    dataFun(val) {
      // 格式化
      var reg = /<span.+<\/span>/;
      if (reg.test(val)) {
        var objE = document.createElement("div");
        objE.innerHTML = val;
        console.log(objE.childNodes[0].className);
        return objE.childNodes[0].innerHTML;
      } else {
        return val;
      }
    }
  },
};
</script>
<style scoped>
.color {
  color: red;
}
</style>