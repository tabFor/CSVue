<template>
  <div class="signin">
    <div>
      <el-input
        placeholder="请输入密码"
        v-model="pwd"
        clearable
        show-password
        class="input_style"
      ></el-input>
      <el-tag :type="isValidPassword(this.pwd) ? '' : 'danger'">{{pwdcheck}}</el-tag>
    </div>

    <div>
      <el-input
        placeholder="请确认密码"
        v-model="pwdCheck"
        clearable
        show-password
        class="input_style2"
      ></el-input>
      <el-tag :type="isValidPassword(this.pwdCheck) ? '' : 'danger'">{{samecheck}}</el-tag>
    </div>
    <el-alert
      class="alert_style"
      title="密码格式为八位以上字母加数字"
      type="success"
      :center="true"
      :closable="false"
    >
    </el-alert>
    <div>
      <i class="el-icon-edit"></i>
    </div>
    <div>
      <el-button
        :disabled="!(isValidPassword(this.pwd)&&(this.pwd===this.pwdCheck)&&!loading)"
        type="primary"
        @click="signin"
        class="login_style"
        v-loading="loading"
      >重置密码</el-button>
    </div>
    <div>
      <el-button
        type="text"
        @click="backTLog"
        :disabled="loading"
      >返回登录界面</el-button>
    </div>
  </div>
</template>

<script>
import { Alert } from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      pwd: "",
      pwdCheck: ""
    };
  },
  methods: {
    signin() {
      this.loading = true;
      console.log(this.$session.get('email'));
      this.$ajax
        .get("/user/resetpassword", {
          params: {
            password: this.pwd,
            email:this.$session.get('email')
          }
        })
        .then(
          res => {
            console.log(res.data);
            if (String(res.data) === "修改密码成功") {
              this.$message({
                message: "重置密码成功",
                type: "success"
              });
              this.$router.replace("/layout/home");
            }
            console.log(res.data);
            this.loading=false
          },
          err => {
            this.$message({
              message: "失败",
              type: "success"
            });
            console.log(err);
            this.loading = false;
          }
        );
    },
    backTLog() {
      this.$router.replace("/");
    },
    isValidEmail(email) {
      // 定义正则表达式
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // 使用正则表达式测试email
      return regex.test(email);
    },
    isValidPassword(password) {
      // 定义正则表达式
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      // 使用正则表达式测试password
      return regex.test(password);
    }
  },
  computed: {
    pwdcheck: {
      get() {
        if (this.isValidPassword(this.pwd)) {
          return "格式正确";
        } else {
          return "格式错误";
        }
      }
    },
    samecheck: {
      get() {
        if (this.pwd === this.pwdCheck) {
          return "密码一致";
        } else {
          return "密码不一";
        }
      }
    }
  }
};
</script>

<style>
.signin {
  margin-top: 200px;
}
.input_style {
  width: 280px;
  margin-bottom: 10px;
}
.input_style2 {
  width: 280px;
  margin-bottom: 10px;
}
.login_style {
  width: 200px;
}
.alert_style {
  width: 300px;
  left: 50%;
  margin-left: -150px;
}
body {
  margin: 0;
}
</style>

