<template>
  <AppContainer :main-height.sync="mainHeight">
    <template #header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" size="small" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" size="small" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" style="float:right;" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table
      :data="tableData"
      border
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
      <pagination
        v-show="formData.totalRow>0"
        :total="formData.totalRow"
        :page.sync="formData.pageNumber"
        :limit.sync="formData.pageSize"
      />
    </template>
  </AppContainer>
</template>
<script>
import Pagination from '@/components/Pagination' // 分页
import AppContainer from '@/components/AppContainer/AppContainer.vue'
export default {
  components: {
    Pagination,
    AppContainer
  },
  data() {
    return {
      mainHeight: 300,
      formData: {
        paras: {
          staffNumber: '',
          staffName: '',
          certNumber: '',
          institutionId: ''
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: 20
      },
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
