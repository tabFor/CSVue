<template>
    <div class="login">
      <div>
        <el-input placeholder="请输入邮箱" v-model="name" clearable class="input_style"></el-input>
        <el-tag :type="isValidEmail(this.name) ? '' : 'danger'">{{namecheck}}</el-tag>
      </div>
      
      <div>
        <el-input placeholder="请输入密码" v-model="pwd" show-password class="input_style"></el-input>
        <el-tag :type="isValidPassword(this.pwd) ? '' : 'danger'">{{ passwordcheck }}</el-tag>
      </div>
      
      <div>
        <el-button :disabled="!(isValidEmail(this.name)&&isValidPassword(this.pwd))" type="primary" @click="login" class="login_style">登录</el-button>
        <el-button type="primary" @click="signin" class="login_style">注册</el-button>
      </div>
      <div>
        <el-button type="text" @click="login">忘记密码</el-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        name: '',
        pwd: '',
      }
    },
    methods: {
      login() {
        this.
          $router.replace('/layout/home');
      },
      signin() {
      this.$router.replace('/signin')
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
                  return "邮箱格式正确"
            }
                else {
              return "邮箱格式错误";
            }
        },
      },
      passwordcheck: {
        get() {
          if (this.isValidPassword(this.pwd)) {
                  return "密码格式正确"
            }
                else {
              return "密码格式错误";
            }
        },
      },
    }
  }
  
  </script>
  
  <style>
    .login{
      margin-top: 200px;
    }
    .input_style{
      width: 410px;
      margin-bottom: 10px;
    }
    .login_style{
      width: 200px;
    }
  </style>
  
  