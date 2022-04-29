<template>
  <AppContainer :main-height.sync="mainHeight">
    <template #header>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="类型编号">
          <el-input v-model="formData.paras.typeNo" size="small" placeholder="请输入图书类型编号" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="formData.paras.typeName" size="small" placeholder="请输入图书类型名称" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          {{ (formData.pageNumber - 1) * formData.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="typeNo" label="类型编号" width="" />
      <el-table-column prop="typeName" label="类型名称" width="" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editType(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteType(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <pagination v-show="formData.totalRow>0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
    </template>
  </AppContainer>
</template>
<script>
import Pagination from '@/components/Pagination' // 分页
import AppContainer from '@/components/AppContainer/AppContainer.vue'
import { getBookType } from '@/api/book'
export default {
  name: 'TpyeManage',
  components: {
    Pagination,
    AppContainer
  },
  data() {
    return {
      mainHeight: 0,
      formData: {
        paras: {
          typeNo: '',
          typeName: ''
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1
      },
      tableData: []
    }
  },
  /* 进入页面就调用*/
  // mounted() {
  //   /**  传-1 后台计算总条数 */
  //   this.formData.totalRow = -1
  //   this.getList()
  // },
  // 在实例被创建之后被调用
  created() {
    /**  传-1 后台计算总条数 */
    this.formData.totalRow = -1
    /**  分页默认从第一页开始 */
    this.formData.pageNumber = 1
    this.getList()
  },
  methods: {
    // 查询
    async getList() {
      this.formData.paras = this.util.nullValueFun(this.formData.paras)
      await getBookType(this.formData).then(res => {
        this.tableData = res.result
        this.formData.totalRow = res.totalRow
        console.log(this.tableData)
      })
    },
    editType() {
      console.log('xiugai')
    },
    deleteType() {
      console.log('shanchu')
    }
  }
}
</script>
<style >
.el-table .el-table__cell{
  padding: 5px 0;
}
</style>
