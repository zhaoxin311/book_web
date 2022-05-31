<template>
  <AppContainer :main-height.sync="mainHeight">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="card-item">
          <div style="height:85px;">
            <span class="card-title">借阅中</span><br>
            <span class="card-num">{{ this.echartsData.borrow_data }}</span>
            <svg-icon icon-class="borrow-book" class="icon-class" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-item">
          <div style="height:85px;">
            <span class="card-title">等待审核</span><br>
            <span class="card-num">{{ this.echartsData.deng_data }}</span>
            <svg-icon icon-class="book-deng" class="icon-class" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-item">
          <div style="height:85px;">
            <span class="card-title">借阅已超时</span><br>
            <span class="card-num">{{ this.echartsData.time_data }}</span>
            <svg-icon icon-class="book-time" class="icon-class" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-item">
          <div style="height:85px;">
            <span class="card-title">已归还</span><br>
            <span class="card-num">{{ this.echartsData.return_data }}</span>
            <svg-icon icon-class="book-return" class="icon-class" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="personal-card">
          <div slot="header" class="">
            <div class="center">
              <el-avatar :size="50" style=" right:0;left:0; margin: 0 auto;" :src="img_url" />
            </div>
            <div class="center">
              <el-link style="font-size:12px;" icon="el-icon-edit" @click="editAvatar">编辑头像</el-link>
            </div>
            <div class="center" style="font-size: 16px; font-weight:bold; margin-top: 10px;">{{ name }}</div>
            <div class="center" style="font-size: 14px;  margin-top: 10px;">{{ department }}</div>
          </div>
          <el-descriptions class="margin-top" title="详细信息" :column="1">
            <template slot="extra">
              <el-button type="primary" size="mini" @click="changeInfo">修改个人信息</el-button>
            </template>
            <el-descriptions-item label="用户名">{{ name }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ phone }}</el-descriptions-item>
            <el-descriptions-item label="身份">{{ roles==0?'超级管理员': (roles==1? '管理员':'普通用户') }}</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">{{ remark==1?'图书馆': (remark==2? '学校':'社会') }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="e-mail">{{ email }}</el-descriptions-item>
            <el-descriptions-item label="联系地址">{{ address }}</el-descriptions-item>
            <el-descriptions-item label="上次登录时间">{{ last_login_time | timeFilter13 }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="personal-card">
          <div id="type_amount" style="width: 100%;height:450px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-dialogDrag title="修改个人信息" :visible.sync="userInfoFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="部门/班级" prop="department">
          <el-input v-model="ruleForm.department" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <!-- 修改个人信息时不能修改身份 -->
        <!-- <el-form-item label="身份" prop="roles">
          <el-select v-model="ruleForm.roles" placeholder="请选择身份">
            <el-option label="超级管理员" :value="0" />
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-select v-model="ruleForm.remark" placeholder="请选择备注信息">
            <el-option label="图书馆" :value="1" />
            <el-option label="学校" :value="2" />
            <el-option label="社会" :value="3" />
          </el-select>
        </el-form-item>

        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="ruleForm.address" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">还原数据</el-button>
        <el-button size="small" @click="userInfoFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改个人头像" width="30%" :visible.sync="imgAvatarVisible">
      <div class="center">
        <el-avatar :size="100" style=" right:0;left:0; margin: 0 auto;" :src="avatarUrl" />
      </div>
      <div class="center"> <input ref="upFile" style="width: 75px; margin: 10px 0px;" accept="image/png, image/jpeg" type="file" @change="File()"></div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="avatarSubmit()">确认提交</el-button>
        <el-button size="small" @click="imgAvatarVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </AppContainer>
</template>
<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import rules from "./rules";
import { getUpdateUserInfo, getUpdateAvatar } from "@/api/user";
import { getTypeAmount, getUserAmount } from "@/api/book";
import AppContainer from "@/components/AppContainer/AppContainer.vue";

export default {
  components: {
    AppContainer,
  },
  data() {
    return {
      mainHeight: 0,
      avatarUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userInfoFormVisible: false, // 修改个人信息弹窗
      imgAvatarVisible: false, // 修改头像弹窗
      typeList: [], //echarts
      echartsData: [],
      upFile: {
        files: [],
      },
      ruleForm: {
        id: "",
        account: "",
        department: "",
        phone: "",
        roles: "",
        remark: "",
        email: "",
        address: "",
      },
      rules: {
        ...rules,
      },
    };
  },
  computed: {
    ...mapGetters([
      "id",
      "name",
      "department",
      "phone",
      "roles",
      "remark",
      "email",
      "address",
      "last_login_time",
      "img_url",
    ]),
  },
  created() {
    this.getTypeAmount();
    this.getUserAmount();
  },
  methods: {
    // 提交修改个人信息表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.ruleForm;
          getUpdateUserInfo(params).then((res) => {
            console.log(res);
            this.userInfoFormVisible = false;
            location.reload();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置个人信息表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 修改个人信息弹窗赋值
    changeInfo() {
      this.ruleForm.id = this.id;
      this.ruleForm.account = this.name;
      this.ruleForm.department = this.department;
      this.ruleForm.roles = this.roles;
      this.ruleForm.remark = this.remark;
      this.ruleForm.phone = this.phone;
      this.ruleForm.email = this.email;
      this.ruleForm.address = this.address;
      this.ruleForm.last_login_time = new Date().valueOf();
      this.userInfoFormVisible = true;
    },

    // 编辑头像弹窗展示及头像base64显示
    editAvatar() {
      this.imgAvatarVisible = true;
      this.avatarUrl = this.img_url;
    },
    // 获取本地头像文件
    File() {
      const file = this.$refs.upFile.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // 调用自带方法进行转换
      reader.onload = (e) => {
        this.avatarUrl = e.target.result;
        console.log(e.target.result);
      };
    },

    // 提交变更后的头像文件
    avatarSubmit() {
      const params = {
        update_time: new Date().valueOf(),
        img_url: this.avatarUrl,
      };
      getUpdateAvatar(params).then((res) => {
        console.log(res);
        this.imgAvatarVisible = false;
        location.reload();
      });
    },

    // echarts图
    getEcharts() {
      // 加判断，取消控制台警告"There is a chart instance already initialized on the dom.""
      if (document.getElementById("type_amount") == null) {
        return;
      }
      echarts.dispose(document.getElementById("type_amount"));
      var chartDom = echarts.init(document.getElementById("type_amount"));
      var option;

      option = {
        title: {
          text: "XXXX大学图书馆在藏书籍类型汇总",
          subtext: "（统计截止日期：2021-12-31）",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: "90%",
          itemWidth: 20,
          width: "86%",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "书籍类型",
            type: "pie",
            radius: [20, 140],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: this.typeList,
          },
        ],
      };

      chartDom.setOption(option);
    },
    async getTypeAmount() {
      await getTypeAmount().then((res) => {
        this.typeList = res.result;
        this.getEcharts();
      });
    },
    async getUserAmount() {
      await getUserAmount().then((res) => {
        this.echartsData = res.result[0];
        this.getEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.personal-card {
  width: 100%;
  height: 500px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-button {
  float: right;
  font-size: 12px;
  padding: 3px 0;
}
.card-item {
  height: 125px;
  margin-bottom: 20px;
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.el-col {
  border-radius: 4px;
}
.icon-class {
  font-size: 75px;
  float: right;
  margin: 0px 10px 10px 10px;
}
.card-title {
  font-size: 16px;
}
.card-num {
  padding: 10px 30px;
  line-height: 62px;
  font-size: 30px;
  font-weight: bold;
}
</style>
