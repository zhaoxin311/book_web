<template>
  <AppContainer :main-height.sync="mainHeight">
    <template #header>
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline">
        <el-form-item label="图书编号">
          <el-input v-model="formData.paras.book_no" size="small" placeholder="请输入图书编号" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input v-model="formData.paras.book_name" size="small" placeholder="请输入图书名称" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formData.paras.book_author" size="small" placeholder="请输入作者" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getList">查询</el-button>
          <el-button type="primary" size="small" @click="reset()">重置</el-button>
          <el-button type="primary" size="small" @click="editOrAddBook()">添加</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          {{ (formData.pageNumber - 1) * formData.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="book_no" label="图书编号" width="" />
      <el-table-column prop="book_name" label="图书名称" width="" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-link type="primary" @click="toDetails(scope.row)">{{ scope.row.book_name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="book_author" label="作者" width="" />
      <el-table-column prop="book_publish" label="出版社" width="" />
      <el-table-column prop="price" label="定价(/元)" width="80" />
      <el-table-column prop="book_amount" label="数量(/本)" width="80" />
      <el-table-column label="出版时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.publish_time | timeFilterYMD13 }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" size="mini" @click="editType(scope.row)">借阅</el-button>
          <el-button type="primary" size="mini" @click="editOrAddBook(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteBook(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <pagination v-show="formData.totalRow > 0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
    </template>
    <!-- 添加或编辑图书信息弹窗 -->
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="addBookVisible" @close="onClose">
      <el-form ref="addForm" :model="addData" :rules="rules" size="small" label-width="98px">
        <el-form-item label="图书编号" prop="book_no">
          <el-input v-model="addData.book_no" placeholder="请输入图书编号" clearable :style="{ width: '90%' }" />
        </el-form-item>
        <el-form-item label="图书名称" prop="book_name">
          <el-input v-model="addData.book_name" placeholder="请输入图书名称" clearable :style="{ width: '90%' }" />
        </el-form-item>
        <el-form-item label="作者" prop="book_author">
          <el-input v-model="addData.book_author" placeholder="请输入图书作者" clearable :style="{ width: '90%' }" />
        </el-form-item>
        <el-form-item label="出版社" prop="book_publish">
          <el-input v-model="addData.book_publish" placeholder="请输入出版社" clearable :style="{ width: '90%' }" />
        </el-form-item>
        <el-form-item label="定价" prop="price">
          <el-input-number v-model="addData.price" :precision="2" :step="0.1"></el-input-number><span style="margin-left:10px;">单位:（元）</span>
        </el-form-item>
        <el-form-item label="数量" prop="book_amount">
          <el-input-number v-model="addData.book_amount" :min="1"></el-input-number><span style="margin-left:10px;">单位:（本）</span>
        </el-form-item>
        <el-form-item label="出版时间" prop="publish_time">
          <el-date-picker v-model="addData.publish_time" type="date" placeholder="请输入出版时间" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="图书简介" prop="introduction">
          <el-input type="textarea" :rows="3" placeholder="请输入图书简介" v-model="addData.introduction" :style="{ width: '90%' }" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="onClose">取消</el-button>
        <el-button size="small" type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 图书详情信息展示弹窗 -->
    <el-dialog title="书籍详情" width="50%" :visible.sync="bookDetailsVisible" @close="bookDetailsVisible = false">
      <!-- <div class="center"> <el-avatar :size="100" shape="square" icon="el-icon-picture" style=" right:0;left:0; margin: 0 auto;" :src="bookDetails.book_img" /></div> -->
      <div class="center">
        <el-image style="width: 140px; height: 150px" :src="bookDetails.book_img" :preview-src-list="bookImgList"></el-image>
      </div>
      <el-card class="box-card" style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span style=" font-size: 18px; font-weight: bold;">《 {{bookDetails.book_name}} 》</span>
          <el-button type="success" icon="el-icon-check" size="mini" style="float: right;">借阅</el-button>
        </div>
          <el-descriptions>
            <el-descriptions-item label="书籍编号">{{bookDetails.book_no}}</el-descriptions-item>
            <el-descriptions-item label="书籍作者">{{bookDetails.book_author}}</el-descriptions-item>
            <el-descriptions-item label="出版社">{{bookDetails.book_publish}}</el-descriptions-item>
            <el-descriptions-item label="定价 (/元)">{{bookDetails.price}} 元</el-descriptions-item>
            <el-descriptions-item label="数量 (/本)">{{bookDetails.book_amount}} 本</el-descriptions-item>
            <el-descriptions-item label="出版时间"> {{ bookDetails.publish_time | timeFilterYMD13 }} </el-descriptions-item>
            <el-descriptions-item label="图书简介">{{bookDetails.introduction}}</el-descriptions-item>
            <!-- <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item> -->
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
import rules from "./rule"; // 校验
import { getBookList, addBook, updateBook, deleteBook } from "@/api/book";
export default {
  name: "TpyeManage",
  components: {
    Pagination,
    AppContainer,
  },
  data() {
    return {
      mainHeight: 0,
      dialogTitle: "添加图书信息",
      dialogType: 0, // 0:add,1:edit
      addBookVisible: false, // 添加图书弹窗
      bookDetailsVisible: false, //书籍详情弹窗
      bookImgList: [], //大图
      formData: {
        paras: {
          book_no: "",
          book_name: "",
          book_author: "",
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1,
      },
      addData: {
        id: "",
        book_no: "",
        book_name: "",
        book_author: "",
        book_amount: 1,
        price: 0,
        book_publish: "",
        publish_time: "",
        introduction: "",
      },
      rules: { ...rules },

      tableData: [],
      bookDetails: {},
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
      await getBookList(this.formData).then((res) => {
        this.tableData = res.result;
        this.formData.totalRow = res.totalRow;
        console.log(this.tableData);
      });
    },
    reset() {
      this.formData = this.$options.data().formData; // 重置列表查询对象
      this.getList();
    },
    editOrAddBook(row) {
      if (row) {
        this.addBookVisible = true;
        this.dialogTitle = "编辑图书信息";
        this.dialogType = 1;
        this.addData = { ...row };
      } else {
        this.addBookVisible = true;
        this.dialogTitle = "添加图书信息";
        this.dialogType = 0;
        this.addData = {};
      }
    },
    handelConfirm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          if (this.dialogType === 0) {
            this.addData = this.util.nullValueFun(this.addData);
            const params = this.addData;
            addBook(params)
              .then((res) => {
                if (res.code === 200) {
                  this.getList();
                  this.$message.success(res.msg);
                  this.addBookVisible = false;
                }
              })
              .catch((e) => {
                this.$message.error(e.msg);
              });
          } else {
            this.addData = this.util.nullValueFun(this.addData);
            const params = this.addData;
            updateBook(params)
              .then((res) => {
                if (res.code === 200) {
                  this.getList();
                  this.$message.success(res.msg);
                  this.addBookVisible = false;
                }
              })
              .catch((e) => {
                this.$message.error(e.msg);
              });
            console.log("修改确认");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除图书
    deleteBook(id) {
      this.$confirm("此操作将删除该图书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          deleteBook(params).then((res) => {
            if (res.code === 200) {
              this.getList();
              this.$message({ type: "success", message: "删除成功!" });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    onClose() {
      this.$refs["addForm"].resetFields();
      this.addBookVisible = false;
    },
    toDetails(row) {
      this.bookDetailsVisible = true;
      this.bookDetails = { ...row };
      this.bookImgList.splice(0, 1, row.book_img);
      console.log(row, "toDetails");
    },
  },
};
</script>
<style>
.el-table .el-table__cell {
  padding: 5px 0;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
