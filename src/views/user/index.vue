<template>
  <AppContainer :main-height.sync="mainHeight">
    <template #header>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formData.paras.account" size="small" placeholder="请输入用户名" prefix-icon="el-icon-search" clearable @keyup.enter.native="getList()" />
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
      <el-table-column prop="account" label="用户名称" width="" />
      <el-table-column prop="department" label="班级/部门" width="200" :show-overflow-tooltip="true"/>
      <el-table-column prop="roles" label="班级/部门" >
      <template slot-scope="scope">
          {{ scope.row.roles == 0 ? "超级管理员" : (scope.row.roles == 1 ? "管理员" : "普通用户") }}
        </template></el-table-column>
      <el-table-column label="创建时间" width="" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.create_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.last_edit_time | timeFilter13 }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.roles != 0" type="" size="mini" @click="resetPassword(scope.row)">重置密码</el-button>
          <el-button v-if="scope.row.roles != 0" type="danger" size="mini" @click="deleteType(scope.row.id)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <pagination v-show="formData.totalRow > 0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
    </template>
  </AppContainer>
</template>
<script>
import Pagination from "@/components/Pagination"; // 分页
import AppContainer from "@/components/AppContainer/AppContainer.vue";
import {  getUserList, resetPassword} from "@/api/book";
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
          account: "",
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
      await getUserList(this.formData).then((res) => {
        this.tableData = res.result;
        this.formData.totalRow = res.totalRow;
        // console.log(this.tableData)
      });
    },
    resetPassword(row) {
      this.$confirm("此操作将重置改账号的登录密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: row.id,
          };
          resetPassword(params).then((res) => {
            if (res.code === 200) {
              this.getList();
              this.$message({ type: "success", message: "重置密码成功!" });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消重置密码" });
        });
        },
    addType() {
      console.log("tinajia");
    },
    deleteType(id) {
      console.log('shanchu');
    },
  },
};
</script>
<style>
</style>
