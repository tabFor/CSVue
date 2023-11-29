<template>
  <div class="login">
    <div>
      <el-input
        placeholder="请输入邮箱"
        v-model="name"
        clearable
        class="input_style"
      ></el-input>
      <el-tag :type="isValidEmail(this.name) ? '' : 'danger'">{{namecheck}}</el-tag>
    </div>

    <div>
      <el-input
        placeholder="请输入密码"
        v-model="pwd"
        show-password
        class="input_style"
      ></el-input>
      <el-tag :type="isValidPassword(this.pwd) ? '' : 'danger'">{{ passwordcheck }}</el-tag>
    </div>

    <div>
      <el-button
        :disabled="!(isValidEmail(this.name)&&isValidPassword(this.pwd)&&!discheck)"
        type="primary"
        @click="login"
        v-loading="loading"
        class="login_style"
      >登录</el-button>
      <el-button
        type="primary"
        @click="signin"
        class="login_style"
        :disabled="discheck"
      >注册</el-button>
    </div>
    <div>
      <el-button
        type="text"
        @click="forget"
        :disabled="discheck"
      >忘记密码</el-button>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Login",
  data() {
    return {
      // 是否显示密码
      discheck: false,
      // 是否正在加载
      loading: false,
      // 用户名
      name: "",
      // 密码
      pwd: ""
    };
  },
  methods: {
      forget() {
      this.$router.replace("/forget")
    },
    // 登录
    login() {
      // 正在加载
      this.loading = true;
      // 显示密码
      this.discheck = true;
      // 设置会话
      this.$session.set("email", '');
      // 发起ajax请求
      this.$ajax
        .get("/user/login", {
          headers: {
            email: this.name
          },
          params: {
            email: this.name,
            password: this.pwd,
            cookie:this.$session.get("session-id")
          }
        })
        .then(
          res => {
            console.log(res.data);
            // 登录成功
            if (String(res.data) === "登录成功") {
              this.$session.set("email", this.name);
              // 跳转到主页
              this.$router.replace("/layout/home");
            } else {
              // 输入错误
              console.assert("密码错误");
              // 提示错误信息
              this.$message("输入错误" + String(res.data));
            }
            // 加载结束
            this.loading = false;
            // 隐藏密码
            this.discheck = false;
          },
          err => {
            console.log(err);
            // 网络错误
            this.$message(err);
            // 加载结束
            this.loading = false;
            // 隐藏密码
            this.discheck = false;
          }
        );
    },
    // 注册
    signin() {
      // 跳转到注册页面
      this.$router.replace("/signin");
    },
    // 判断邮箱格式
    isValidEmail(email) {
      // 定义正则表达式
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // 使用正则表达式测试email
      return regex.test(email);
    },
    // 判断密码格式
    isValidPassword(password) {
      // 定义正则表达式
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      // 使用正则表达式测试password
      return regex.test(password);
    }
  },
  computed: {
    // 判断邮箱格式是否正确
    namecheck: {
      get() {
        // 判断邮箱格式是否正确
        if (this.isValidEmail(this.name)) {
          // 正确
          return "邮箱格式正确";
        } else {
          // 错误
          return "邮箱格式错误";
        }
      }
    },
    // 判断密码格式是否正确
    passwordcheck: {
      get() {
        // 判断密码格式是否正确
        if (this.isValidPassword(this.pwd)) {
          // 正确
          return "密码格式正确";
        } else {
          // 错误
          return "密码格式错误";
        }
      }
    }
  }
};
</script>
  
  <style>
.login {
  margin-top: 200px;
}
.input_style {
  width: 410px;
  margin-bottom: 10px;
}
.login_style {
  width: 200px;
}
</style>
  
  