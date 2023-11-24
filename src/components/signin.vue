<template>
    <div class="signin">
      <div>
        <el-input placeholder="请输入邮箱" v-model="name" clearable class="input_style" ></el-input>
       <el-tag :type="isValidEmail(this.name) ? '' : 'danger'">{{namecheck}}</el-tag>
      </div> 
        
      <div>
        <el-input placeholder="验证码" v-model="pwd" show-password class="input_style2"></el-input>
        <el-button type="primary">发送</el-button>
        <span v-if="error.pwd" class="err-msg">{{error.pwd}}</span>
      </div>
      <div>
        <el-button type="primary" @click="login" class="login_style">注册</el-button>
      </div>
      <div>
        <el-button type="text" @click="login2">返回登录界面</el-button>
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
        error: {
          name: 'wrong',
          pwd: ''
        }
      }
    },
    methods: {
      login() {
        const { name, pwd, $router } = this
        this.$router.replace('/signsetting');
      },
      login2() {
        const { name, pwd, $router } = this
        this.$router.replace('/');
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
                  return "格式正确"
            }
                else {
              return "格式错误";
            }
        },
      },
    }
  }
  </script>
  
  <style>
    .signin{
      margin-top: 200px;
    }
    .input_style{
      width: 280px;
      margin-bottom: 10px;
    }
    .input_style2{
      width: 280px;
      margin-bottom: 10px;
    }
    .login_style{
      width: 200px;
    }
  </style>
  
  