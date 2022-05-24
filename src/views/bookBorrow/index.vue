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
          <el-button type="success" :loading="impLoading" size="small" @click="importList()">导出数据</el-button>
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
      <el-table-column prop="book_type" label="图书类型" width="" :show-overflow-tooltip="true" />
      <el-table-column label="借书时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.borrow_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="还书时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.return_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="160">
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
      <el-table-column label="操作" width="" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==1" type="success" size="mini" @click="returnBook(scope.row)">归还</el-button>
          <el-button v-if="scope.row.state==3" type="warning" size="mini" @click="continueBook(scope.row)">续借</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <pagination v-show="formData.totalRow>0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
    </template>
    <!-- 续借弹窗图书信息展示 -->
    <el-dialog title="续借书籍" width="50%" :visible.sync="continueBookVisible" @close="continueBookVisible = false">
      <!-- <div class="center"> <el-avatar :size="100" shape="square" icon="el-icon-picture" style=" right:0;left:0; margin: 0 auto;" :src="bookDetails.book_img" /></div> -->
      <!-- <div class="center">
        <el-image style="width: 140px; height: 150px;" :src="bookDetails.book_img"></el-image>
      </div> -->
      <el-card class="box-card" style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span style=" font-size: 18px; font-weight: bold;">《 {{bookDetails.book_name}} 》</span>
          <el-button  v-if="bookDetails.book_amount != 0" type="primary" size="mini" style="float: right;" @click="confirmContinueBook(bookDetails)">确认续借</el-button>
        </div>
          <el-descriptions>
            <el-descriptions-item label="书籍编号">{{bookDetails.book_no}}</el-descriptions-item>
            <el-descriptions-item label="租借人"> {{ bookDetails.borrower }} </el-descriptions-item>
            <el-descriptions-item label="租借时间"> {{ bookDetails.borrow_time | timeFilterYMD13 }} </el-descriptions-item>
            <el-descriptions-item label="还书时间"> {{ bookDetails.return_time | timeFilterYMD13 }} </el-descriptions-item>
            <el-descriptions-item label="当前状态" :span="2">
              <el-tag type="danger" size="small">已逾期</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="续借时长">
              <el-input-number v-model="continueDay" size="mini" :min="10" :max="100"></el-input-number>（单位：天）
            </el-descriptions-item>
          </el-descriptions>
      </el-card>
      <div slot="footer">
        <!-- <el-button size="small" @click="bookDetailsVisible = false">取消</el-button> -->
        <!-- <el-button size="small" type="primary" @click="handelConfirm">确定</el-button> -->
      </div>
    </el-dialog>
  </AppContainer>
</template>
<script>
import Pagination from "@/components/Pagination"; // 分页
import AppContainer from "@/components/AppContainer/AppContainer.vue";
import { getBorrowBookList, returnBook, continueBorrow } from "@/api/book";

import { parseTime } from '@/utils'
export default {
  name: "TpyeManage",
  components: {
    Pagination,
    AppContainer,
  },
  // filters:{
  //   states1(status){
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
      continueBookVisible: false,//续借弹窗
      bookDetails:{},
      continueDay:10,
      impLoading:false,
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
        this.tableData = res.result;
        this.formData.totalRow = res.totalRow;
        // console.log(this.tableData);
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
    continueBook(row) {
      this.continueBookVisible = true
      this.bookDetails = { ...row };
    },
    confirmContinueBook(row){
      const params = {
        id: row.id,
        continueDay: this.continueDay
      }
      continueBorrow(params).then((res) => {
        if (res.code === 200) {
          this.continueBookVisible = false
          this.getList();
          this.$message({ type: "success", message: "已提交请求，等待管理员归还审核!" });
        }
      });
    },
    // 导出当前我的借阅列表信息
    importList(){
      this.impLoading = true
      const fileName = '借阅记录'
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['图书id', '借阅人', '图书编号', '图书名称', '图书类型', '借书时间', '还书时间', '操作时间','当前状态']
        const filterVal = ['id', 'borrower', 'book_no', 'book_name', 'book_type', 'borrow_time', 'return_time', 'operate_time','state']
        const list = [].concat(this.tableData)
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: fileName + new Date().getTime(),
          autoWidth: this.autoWidth,
          bookType: 'xlsx'
        })
        this.impLoading = false
      }).catch(() => {
        this.impLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if ( ['borrow_time', 'return_time', 'operate_time'].includes(j) ) {
          return parseTime(v[j])
        } else if(j==='state'){
          return this.states[v[j]]
        } else {
          return v[j]
        }
      }))
    },
  },
};
</script>
<style >
</style>
