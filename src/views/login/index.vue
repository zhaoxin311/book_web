<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">XXXX大学图书馆管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="off" @input="loginForm.username = loginForm.username.replace(regexLogin.username, '')" @keyup.enter.native="$refs.password.focus()" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="off" @input="loginForm.password = loginForm.password.replace(regexLogin.password, '')" @keyup.enter.native="$refs.verificationCode.focus()" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="imgCaptcha">
        <span class="svg-container">
          <svg-icon icon-class="example" />
        </span>
        <el-input key="verificationCode" ref="verificationCode" v-model="loginForm.imgCaptcha" type="text" placeholder="请输入验证码" name="verificationCode" tabindex="3" auto-complete="no" maxlength="4" @input="loginForm.imgCaptcha = loginForm.imgCaptcha.replace(regexLogin.imgCaptcha, '')" @keyup.enter.native="handleLogin" />
        <span class="show-verification-code">
          <!-- <svg-icon v-html="imgCaptchaData" /> -->
          <div class="login-img-captcha" @click="refreshCaptcha" v-html="imgCaptchaData" />
        </span>
      </el-form-item>
    </el-form>
    <div class="button-form">
      <el-button :loading="loading" type="primary" style="width:49%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <el-button type="primary" style="width:48%;margin-bottom:30px;" @click="newUserVisible = true">注册新用户</el-button>
    </div>
    <el-dialog title="注册新用户" top="2%" width="60%" :visible.sync="newUserVisible" @close="onClose">
      <el-form ref="registerFrom" :model="registerFrom" :rules="loginRules" style="padding:0px;" class="login-form" auto-complete="off" label-position="left">
        <div class="title-container">
          <h3 class="title" style=" color: #5c5959; margin: 0px auto 10px auto;">XXXX大学图书馆管理系统</h3>
        </div>
        <div class="center">
          <el-avatar :size="100" style=" right:0;left:0; margin: 0 auto;" :src="avatarUrl" />
          <input ref="upFile" style="width: 75px; margin: 10px 0;" accept="image/png, image/jpeg" type="file" @change="File()">
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="registerFrom.username" placeholder="请输入用户名" name="username" type="text" tabindex="1" auto-complete="off" @input="registerFrom.username = registerFrom.username.replace(regexLogin.username, '')" @keyup.enter.native="$refs.password.focus()" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="registerFrom.password" :type="passwordType" placeholder="请输入密码" name="password" tabindex="2" auto-complete="off" @input="registerFrom.password = registerFrom.password.replace(regexLogin.password, '')" @keyup.enter.native="$refs.confirmPassword.focus()" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="confirmPassword" v-model="registerFrom.confirmPassword" :type="passwordType" placeholder="请确认密码" name="confirmPassword" tabindex="2" auto-complete="off" @input="registerFrom.confirmPassword = registerFrom.confirmPassword.replace(regexLogin.password, '')" @keyup.enter.native="$refs.email.focus()" />
        </el-form-item>
        <el-form-item prop="roles">
          <span class="text-container">
            <svg-icon icon-class="roles" style="font-size:16px;" />
            选择角色：
          </span>
          <el-radio v-model="registerFrom.roles" label="0">超级管理员</el-radio>
          <el-radio v-model="registerFrom.roles" label="1">管理员</el-radio>
          <el-radio v-model="registerFrom.roles" label="2">普通用户</el-radio>
        </el-form-item>
        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" style="font-size:20px;" />
          </span>
          <el-input ref="email" v-model="registerFrom.email" placeholder="请输入电子邮件" name="email" type="text" tabindex="1" auto-complete="off" @input="registerFrom.email = registerFrom.email.replace(regexLogin.email, '')" @keyup.enter.native="$refs.password.focus()" />
        </el-form-item>
        <el-button :loading="registerLoading" type="primary" style="width:49%;margin-bottom:30px;" @click.native.prevent="register">注册</el-button>
        <el-button type="primary" style="width:48%;margin-bottom:30px;" @click="onClose">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { getImgCaptcha, register } from "@/api/user.js";
import regexLogin from "@/constant/regex/login.js";
import rules from "@/constant/rules/login.js";
import createPasswordRules from "@/constant/rules/passwords.js";

export default {
  name: "Login",
  data() {
    const { validatePass, validatePass2 } = createPasswordRules(
      this,
      "registerFrom"
    );
    return {
      newUserVisible: false,
      avatarUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      loginForm: {
        username: "WB03217",
        password: "1111111",
        imgCaptcha: "",
        imgCaptchaToken: "",
      },
      registerFrom: {
        username: "",
        password: "",
        confirmPassword: "",
        roles: "",
        email: "",
      },
      loginRules: {
        ...rules,
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        roles: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
      },
      loading: false,
      registerLoading: false,
      passwordType: "password",
      redirect: undefined,
      imgCaptchaData: "",
      imgCaptchaID: "",
      regexLogin,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    void this.refreshCaptcha();
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async refreshCaptcha() {
      var create_time = new Date().valueOf();
      const respones = await getImgCaptcha({ create_time: create_time }).catch(
        (e) => console.log(e)
      );
      this.imgCaptchaData = respones.captch.captch;
      this.imgCaptchaID = respones.captchID;
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const { imgCaptcha, username, password } = this.loginForm;
          const param = {
            captch: imgCaptcha,
            captchID: this.imgCaptchaID,
            username,
            password,
            login_time: new Date().valueOf(),
          };
          this.$store
            .dispatch("user/login", param)
            .then((response) => {
              if (response.code === 200) {
                this.$message({ type: "success", message: "登录成功" });
                this.$router.push({ path: "/home" });
                this.loading = false;
              } else {
                void this.refreshCaptcha();
                this.loading = false;
              }
            })
            .catch((e) => {
              void this.refreshCaptcha();
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async register() {
      this.$refs.registerFrom.validate((valid) => {
        if (valid) {
          this.registerLoading = true;
          const img_url = this.avatarUrl;
          const { username, password, email, roles } = this.registerFrom;
          const param = {
            username,
            password,
            email,
            roles,
            img_url,
          };
          register(param)
            .then(() => {
              this.registerLoading = false;
              this.$message({ type: "success", message: "注册成功" });
              this.onClose();
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch((e) => {
              this.registerLoading = false;
              this.onClose();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    onClose() {
      this.$refs["registerFrom"].resetFields();
      this.newUserVisible = false;
    },
  },
};
</script>

<style lang="scss">
// @import './relogin.scss';
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #272121;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;

  background: url(../../assets/img/bg2.png) no-repeat;
  // object-fit: fill;
  background-size: cover;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
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

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .text-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 120px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #5c5959;
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
