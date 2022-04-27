## 页面主容器

用于页面主内容去展示的容器，分为上中下三部分，分别有对应的 `slot` 插槽。高度可动态修改。

## 使用案例

需要绑定一个动态高度 `main-height` 属性，默认值任意数字。并将该属性与 `el-table` 组件的 `height` 属性绑定，如下：

```vue
<template>
  <AppContainer :main-height.sync="mainHeight">
    <template #header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="mainHeight = 500">点击变高</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table
      :data="tableData"
      :height="mainHeight"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
    <template #footer>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </AppContainer>
</template>
<script>
import AppContainer from '@/components/AppContainer/AppContainer.vue'
export default {
  components: {
    AppContainer
  },
  data() {
    return {
      currentPage: 4,
      mainHeight: 300,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
```

## 属性

| 参数          | 说明                                               | 类型   | 可选值   | 默认值 |
| ------------- | ------------------------------------------------- | ------ | -------- | ------ |
| header-height | 设置头部高度（单位px）                              | number | 任意数字 | auto   |
| main-height   | 获取内容区高度（单位px）                            | number | 任意数字 | 0      |
| footer-height | 设置底部高度（单位px）                              | number | 任意数字 | auto   |
| surplus-height| 设置除 AppContainer 外需要减去的屏幕高度（单位px）   | number | 任意数字 | 133   |
| native        | 是否使用原生滚动条样式                              | number | —    | false |

 

## 方法

| 方法名       | 说明                              | 参数 |
| ------------ | --------------------------------- | ---- |
| updateHeight | 更新内容区高度值（`main-height`） | 无   |


## 插槽

| name    | 说明                         |
| ------- | ---------------------------- |
| header  | 页面头部内容插槽             |
| default | 页面主要内容插槽（默认插槽） |
| footer  | 页面底部内容插槽             |



<!-- <template>
  <AppContainer :main-height.sync="mainHeight">

    <div>个人中心</div>
  </AppContainer>
</template>
<script>
import AppContainer from '@/components/AppContainer/AppContainer.vue'

export default {
  components: {
    AppContainer
  },
  data() {
    return {
      mainHeight: 0
    }
  }
}
</script> -->
