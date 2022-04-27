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
                <el-button type="primary" size="mini">修改个人信息</el-button>
              </template>
              <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
              <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
              <el-descriptions-item label="身份">老师</el-descriptions-item>
              <el-descriptions-item label="备注"><el-tag size="small">学校</el-tag></el-descriptions-item>
              <el-descriptions-item label="e-mail">1234567890@qq.com</el-descriptions-item>
              <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
              <el-descriptions-item label="上次登录时间">2022-04-23 15:22:58</el-descriptions-item>
            </el-descriptions>
          </div>
        </transition>
      </el-card>
    </div>
    <div class="from-con">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </AppContainer>
</template>
<script>
import { mapGetters } from 'vuex'
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
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'department',
      'create_time'
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
