<template>
  <AppContainer :main-height.sync="mainHeight">
    <template #header>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="图书编号">
          <el-input v-model="formData.paras.book_no" size="small" placeholder="请输入图书编号" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input v-model="formData.paras.book_name" size="small" placeholder="请输入图书名称" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item label="借阅人">
          <el-input v-model="formData.paras.borrower" size="small" placeholder="请输入借阅人" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getList">查询</el-button>
          <el-button type="primary" size="small" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          {{ (formData.pageNumber - 1) * formData.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="borrower" label="借阅人" width="" />
      <el-table-column prop="book_no" label="图书编号" width="" />
      <el-table-column prop="book_name" label="图书名称" width="160" :show-overflow-tooltip="true" />
      <el-table-column label="借书时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.borrow_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="还书时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.return_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.operate_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120">
        <template slot-scope="scope">
          {{ states[scope.row.state] }}
          <!-- {{ scope.row.state | states }} -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==1" type="success" size="mini" @click="returnBook(scope.row)">归还</el-button>
          <el-button v-if="scope.row.state==3" type="warning" size="mini" @click="continueBook(scope.row)">续借</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <pagination v-show="formData.totalRow>0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
    </template>
  </AppContainer>
</template>
<script>
import Pagination from "@/components/Pagination"; // 分页
import AppContainer from "@/components/AppContainer/AppContainer.vue";
import { getBorrowBookList, returnBook } from "@/api/book";
export default {
  name: "TpyeManage",
  components: {
    Pagination,
    AppContainer,
  },
  // filters:{
  //   states(status){
  //     var statusMap = ''
  //   if (status === 1) statusMap = '借阅中'
  // 	if (status === 2) statusMap = '等待归还审核'
  // 	if (status === 3) statusMap = '借阅已超时'
  // 	if (status === 4) statusMap = '等待续借审核'
  // 	if (status === 5) statusMap = '已归还'
  //   return statusMap
  //   }
  // },
  data() {
    return {
      mainHeight: 0,
      formData: {
        paras: {
          book_no: "",
          book_name: "",
          borrower: "",
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1,
      },
      tableData: [],
      state: "",
      states: {   //图书状态
        0:'等待租借审核',
        1: "借阅中",
        2: "等待归还审核",
        3: "借阅已超时",
        4: "等待续借审核",
        5: "已归还",
      },
    };
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
    this.formData.totalRow = -1;
    /**  分页默认从第一页开始 */
    this.formData.pageNumber = 1;
    this.getList();
  },
  methods: {
    // 查询
    async getList() {
      this.formData.paras = this.util.nullValueFun(this.formData.paras);
      await getBorrowBookList(this.formData).then((res) => {
        this.tableData = res.result[0];
        this.formData.totalRow = res.totalRow;
        console.log(this.tableData);
      });
    },
    reset() {
      this.formData = this.$options.data().formData; // 重置列表查询对象
      this.getList();
    },
    returnBook(row) {
      this.$confirm("确认是否归还该图书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: row.id,
            operate_time: (new Date()).valueOf(), 
          };
          returnBook(params).then((res) => {
            if (res.code === 200) {
              this.getList();
              this.$message({ type: "success", message: "已提交请求，等待管理员归还审核!" });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消归还图书" });
        });
    },
    continueBook() {
      console.log("shanchu");
    },
  },
};
</script>
<style >
</style>
