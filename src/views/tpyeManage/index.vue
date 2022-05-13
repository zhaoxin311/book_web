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
          <el-button type="primary" size="small" @click="addType">添加</el-button>
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
      <el-table-column label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.create_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.update_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editType(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteType(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <pagination v-show="formData.totalRow > 0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
    </template>
    <!-- 添加图书类型弹窗 -->
    <el-dialog :title="dialogTitle" width="30%" :visible.sync="addBookTypeVisible" @close="onClose">
      <el-form ref="addTypeForm" :model="addTypeData" :rules="rules" size="small" label-width="98px">
        <el-form-item label="类型编号" prop="typeNo">
          <el-input v-model="addTypeData.typeNo" placeholder="请输入类型编号" clearable :style="{ width: '90%' }" />
        </el-form-item>
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="addTypeData.typeName" placeholder="请输入类型名称" clearable :style="{ width: '90%' }" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="onClose">取消</el-button>
        <el-button size="small" type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改图书类型弹窗 -->
    <!-- <el-dialog title="修改图书类型" width="30%" :visible.sync="addBookTypeVisible" @close="onClose">
      <el-form ref="addTypeForm" :model="addTypeData" :rules="rules" size="small" label-width="98px">
        <el-form-item label="类型编号" prop="typeNo">
          <el-input v-model="addTypeData.typeNo" placeholder="请输入类型编号" clearable :style="{width: '90%'}" />
        </el-form-item>
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="addTypeData.typeName" placeholder="请输入类型名称" clearable :style="{width: '90%'}" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="onClose">取消</el-button>
        <el-button size="small" type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog> -->
  </AppContainer>
</template>
<script>
import Pagination from "@/components/Pagination"; // 分页
import AppContainer from "@/components/AppContainer/AppContainer.vue";
import {
  getBookType,
  addBookType,
  updateBookType,
  deleteBookType,
} from "@/api/book";
export default {
  name: "TpyeManage",
  components: {
    Pagination,
    AppContainer,
  },
  data() {
    return {
      mainHeight: 0,
      dialogTitle: "添加图书类型",
      dialogType: 0, // 0:add,1:edit
      addBookTypeVisible: false, // 添加图书类型弹窗
      formData: {
        paras: {
          typeNo: "",
          typeName: "",
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1,
      },
      addTypeData: {
        id: "",
        typeNo: "",
        typeName: "",
        create_time: "",
        update_time: "",
      },
      rules: {
        typeNo: [
          { required: true, message: "请输入类型编号", trigger: "blur" },
        ],
        typeName: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
        ],
      },
      tableData: [],
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
      await getBookType(this.formData).then((res) => {
        this.tableData = res.result;
        this.formData.totalRow = res.totalRow;
        // console.log(this.tableData)
      });
    },
    editType(row) {
      this.addBookTypeVisible = true;
      this.dialogTitle = "修改图书类型";
      this.dialogType = 1;
      this.addTypeData = { ...row };
    },
    addType() {
      this.addBookTypeVisible = true;
      this.dialogTitle = "添加图书类型";
      this.addTypeData.typeNo = "";
      this.addTypeData.typeName = "";
      this.dialogType = 0;
    },

    // 删除图书类型
    deleteType(id) {
      this.$confirm("此操作将删除该图书类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            update_time: new Date().valueOf(),
            id: id,
          };
          deleteBookType(params).then((res) => {
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
      this.$refs["addTypeForm"].resetFields();
      this.addBookTypeVisible = false;
    },
    handelConfirm() {
      this.$refs["addTypeForm"].validate((valid) => {
        if (valid) {
          if (this.dialogType === 0) {
            this.addTypeData.create_time = new Date().valueOf();
            this.addTypeData = this.util.nullValueFun(this.addTypeData);
            const params = this.addTypeData;
            addBookType(params)
              .then((res) => {
                if (res.code === 200) {
                  this.getList();
                  this.$message.success(res.msg);
                  this.addBookTypeVisible = false;
                }
              })
              .catch((e) => {
                this.$message.error(e.msg);
              });
          } else {
            this.addTypeData.update_time = new Date().valueOf();
            this.addTypeData = this.util.nullValueFun(this.addTypeData);
            const params = this.addTypeData;
            updateBookType(params)
              .then((res) => {
                if (res.code === 200) {
                  this.getList();
                  this.$message.success(res.msg);
                  this.addBookTypeVisible = false;
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
  },
};
</script>
<style>
.el-table .el-table__cell {
  padding: 5px 0;
}
</style>
