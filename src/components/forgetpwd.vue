<template>
  <div class="signin">
    <div>
      <el-input
        placeholder="请输入邮箱"
        v-model="name"
        clearable
        class="input_style3"
      ></el-input>
      <el-tag :type="isValidEmail(this.name) ? '' : 'danger'">{{namecheck}}</el-tag>
    </div>

    <div>
      <el-input
        placeholder="验证码"
        v-model="pwd"
        class="input_style3"
      ></el-input>
      <el-button
        type="primary"
        @click="getcode"
        v-loading="loading"
        :disabled="!(isValidEmail(this.name)&&!loading)"
      >发送</el-button>
    </div>
    <div>
      <el-button
        :disabled="!(isValidEmail(this.name)&&(this.pwd.length===6)&&!loading)"
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
export default {
  name: "Login",
  data() {
    return {
      name: "",
      pwd: "",
      signcode: "",
      loading: false
    };
  },
  methods: {
    getcode() {
      //发送验证码
      this.loading = true;
      this.$session.set("email", this.name);
      console.log(this.$session.get("email"));
      this.$ajax
        .get("/user/findpassword", {
          headers: {
            email: this.$session.get("email")
          },
          params: {
            email: this.name
          }
        })
        .then(
          res => {
            if (String(res.data) === "邮箱未注册") {
              this.$message.error("邮箱未注册");
            } else {
              console.log(res.data);
              this.signcode = res.data;
              console.log(this.signcode);
            }

            this.loading = false;
          },
                err => {
            this.$message.error(err);
            console.log(err);
            this.loading = false;
          }
        );
    },
    signin() {
      this.loading = true;
      this.$ajax
        .get("/user/check", {
          headers: {
            email: this.$session.get("email")
          },
          params: {
            code: this.pwd
          }
        })
        .then(
          res => {
            console.log(res.data);
            if (String(res.data) === "验证码正确") {
              this.$router.replace("/signsetting");
            } else {
              console.assert("密码错误");
              this.$message("验证码错误");
            }
            this.loading = false;
          },
                err => {
            this.$message.error(err);
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
    namecheck: {
      get() {
        if (this.isValidEmail(this.name)) {
          return "格式正确";
        } else {
          return "格式错误";
        }
      }
    }
  }
};
</script>
    
    <style >
.signin {
  margin-top: 200px;
}
.input_style3 {
  width: 280px;
  margin-bottom: 10px;
}
.login_style {
  width: 200px;
}
</style>
    
    