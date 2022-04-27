<template>
  <AppContainer :main-height.sync="mainHeight">
    <div class="personal-card">
      <el-card class="box-card">
        <div slot="header" class="">
          <div class="center"> <el-avatar :size="50" style=" right:0;left:0; margin: 0 auto;" :src="avatarUrl" /> </div>
          <div class="center" style="font-size: 16px; font-weight:bold; margin-top: 10px;">{{ name }}</div>
          <div class="center" style="font-size: 14px;  margin-top: 10px;">{{ department }}</div>
          <el-button v-if="showInfo" type="text" class="right-button" @click="showInfo = !showInfo">收起</el-button>
          <el-button v-if="!showInfo" type="text" class="right-button" @click="showInfo = !showInfo">更多...</el-button>
        </div>
        <transition name="fade">
          <div v-if="showInfo" class="text item">
            <el-descriptions class="margin-top" title="详细信息" :column="1">
              <template slot="extra">
                <el-button type="primary" size="mini" @click="changeInfo">修改个人信息</el-button>
              </template>
              <el-descriptions-item label="用户名">{{ name }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ phone }}</el-descriptions-item>
              <el-descriptions-item label="身份">{{ roles==0?'管理员': (roles==1? '学生':'老师') }}</el-descriptions-item>
              <el-descriptions-item label="备注"><el-tag size="small">{{ remark==1?'图书馆': (remark==2? '学校':'社会') }}</el-tag></el-descriptions-item>
              <el-descriptions-item label="e-mail">{{ email }}</el-descriptions-item>
              <el-descriptions-item label="联系地址">{{ address }}</el-descriptions-item>
              <el-descriptions-item label="上次登录时间">{{ last_login_time }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </transition>
      </el-card>
    </div>
    <div class="from-con">
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
        <el-form-item label="身份" prop="roles">
          <el-select v-model="ruleForm.roles" placeholder="请选择身份">
            <el-option label="管理员" :value="0" />
            <el-option label="老师" :value="2" />
            <el-option label="学生" :value="1" />
          </el-select>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </AppContainer>
</template>
<script>
import { mapGetters } from 'vuex'
import rules from './rules'
import { getUpdateUserInfo } from '@/api/user'
import AppContainer from '@/components/AppContainer/AppContainer.vue'

export default {
  components: {
    AppContainer
  },
  data() {
    return {
      mainHeight: 0,
      avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      showInfo: false,
      ruleForm: {
        id: '',
        account: '',
        department: '',
        phone: '',
        roles: '',
        remark: '',
        email: '',
        address: ''
      },
      rules: {
        ...rules
      }
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name',
      'department',
      'phone',
      'roles',
      'remark',
      'email',
      'address',
      'last_login_time'
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.ruleForm
          getUpdateUserInfo(params).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeInfo() {
      var moment = require('moment')
      this.ruleForm.id = this.id
      this.ruleForm.account = this.name
      this.ruleForm.department = this.department
      this.ruleForm.roles = this.roles
      this.ruleForm.remark = this.remark
      this.ruleForm.phone = this.phone
      this.ruleForm.email = this.email
      this.ruleForm.address = this.address
      this.ruleForm.last_login_time = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
      console.log(this.ruleForm.account, 'name')
    }
  }
}

</script>
<style lang="scss" scoped>
  .personal-card{
    width: 350px;
    height: 500px;
    float: left;
    border: 1px solid red;
  }
  .from-con{
    width: 700px;
    height: 600px;
    float: right;
    border: 1px solid yellow;
  }
  .center{
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .right-button {
  float: right;
  font-size: 12px;
  padding: 3px 0;
}
// 卡片1展开收起的过渡
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
