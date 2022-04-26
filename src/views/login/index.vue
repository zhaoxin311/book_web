<template>
  <div class="login-container">
    <el-form v-show="!show" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          @input="loginForm.username = loginForm.username.replace(regexLogin.username, '')"
          @keyup.enter.native="$refs.password.focus()"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @input="loginForm.password = loginForm.password.replace(regexLogin.password, '')"
          @keyup.enter.native="$refs.verificationCode.focus()"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- <p class="login-form-item-label">验证码</p> -->
      <el-form-item prop="imgCaptcha">
        <span class="svg-container">
          <svg-icon icon-class="example" />
        </span>
        <el-input
          key="verificationCode"
          ref="verificationCode"
          v-model="loginForm.imgCaptcha"
          type="text"
          placeholder="请输入验证码"
          name="verificationCode"
          tabindex="3"
          auto-complete="no"
          maxlength="4"
          @input="loginForm.imgCaptcha = loginForm.imgCaptcha.replace(regexLogin.imgCaptcha, '')"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-verification-code">
          <!-- <svg-icon v-html="imgCaptchaData" /> -->
          <div class="login-img-captcha" @click="refreshCaptcha" v-html="imgCaptchaData" />
        </span>
      </el-form-item>
    </el-form>

    <el-form v-show="show" ref="registerFrom" :model="registerFrom" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">register Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerFrom.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          @input="registerFrom.username = registerFrom.username.replace(regexLogin.username, '')"
          @keyup.enter.native="$refs.password.focus()"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerFrom.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @input="registerFrom.password = registerFrom.password.replace(regexLogin.password, '')"
          @keyup.enter.native="$refs.confirmPassword.focus()"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="confirmPassword"
          v-model="registerFrom.confirmPassword"
          :type="passwordType"
          placeholder="请确认密码"
          name="confirmPassword"
          tabindex="2"
          auto-complete="on"
          @input="registerFrom.confirmPassword = registerFrom.confirmPassword.replace(regexLogin.password, '')"
          @keyup.enter.native="$refs.email.focus()"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registerFrom.email"
          placeholder="请输入电子邮件"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
          @input="registerFrom.email = registerFrom.email.replace(regexLogin.email, '')"
          @keyup.enter.native="$refs.password.focus()"
        />
      </el-form-item>

    </el-form>
    <div class="button-form">
      <el-button :loading="loading" type="primary" style="width:49%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <el-button :loading="registerLoading" type="primary" style="width:48%;margin-bottom:30px;" @click.native.prevent="register">注册</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>
    </div>

  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { getImgCaptcha, register } from '@/api/user.js'
import regexLogin from '@/constant/regex/login.js'
import rules from '@/constant/rules/login.js'
import createPasswordRules from '@/constant/rules/passwords.js'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    const { validatePass, validatePass2 } = createPasswordRules(this, 'registerFrom')
    return {
      show: false,
      loginForm: {
        username: 'WB03217',
        password: '1111111',
        imgCaptcha: '',
        imgCaptchaToken: ''
      },
      registerFrom: {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      loginRules: {
        ...rules,
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 6, message: '密码长度最少6位', trigger: 'blur' }
        // ]
      },
      loading: false,
      registerLoading: false,
      passwordType: 'password',
      redirect: undefined,
      imgCaptchaData: '',
      imgCaptchaID: '',
      regexLogin
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    void this.refreshCaptcha()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async refreshCaptcha() {
      var moment = require('moment')
      var create_time = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
      console.log(create_time, 'time')
      const respones = await getImgCaptcha({ create_time: create_time }).catch(e => console.log(e))
      // console.log(respones.captch.captch, 're')
      // const { captcha, captchaToken } = respones.data
      // const { captcha } = respones
      // console.log(captcha, 're')
      this.imgCaptchaData = respones.captch.captch
      this.imgCaptchaID = respones.captchID
      console.log(this.imgCaptchaID, 'id')
      // this.loginForm.imgCaptchaToken = captchaToken
    },
    handleLogin() {
      this.show = false
      var moment = require('moment')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const { imgCaptcha, username, password } = this.loginForm
          const param = {
            captch: imgCaptcha,
            captchID: this.imgCaptchaID,
            username,
            password,
            login_time: moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
          }
          console.log('22333')
          this.$store.dispatch('user/login', param).then(response => {
            console.log('333')
            if (response.code === 200) {
              console.log('444')
              this.$message({ type: 'success', message: '登录成功' })
              // window.sessionStorage.setItem('token', response.data.token)
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            } else {
              void this.refreshCaptcha()
              this.loading = false
            }
          }).catch(e => {
            void this.refreshCaptcha()
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async register() {
      this.show = true
      this.$refs.registerFrom.validate(valid => {
        if (valid) {
          this.registerLoading = true
          const { username, password, email } = this.registerFrom
          const param = {
            username,
            password,
            email
          }
          register(param).then(() => {
            this.registerLoading = false
            this.$message({ type: 'success', message: '注册成功' })
            // this.RegisterSuccessVisible = true
            console.log('ooo')
            this.$router.push({ path: this.redirect || '/' })
          }).catch(e => {
            this.registerLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
// @import './relogin.scss';
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .button-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
.login-img-captcha {
  z-index: 22;
  cursor: pointer;
  height: 40px;
  width: 100px;
  // background: red;
  position: absolute;
  top: 5px;
  right: 5px;
}
}
</style>
