<template>
    <div class="signin">
      <div>
        <el-input placeholder="请输入邮箱" v-model="name" clearable class="input_style" ></el-input>
       <el-tag :type="isValidEmail(this.name) ? '' : 'danger'">{{namecheck}}</el-tag>
      </div> 
        
      <div>
        <el-input placeholder="验证码" v-model="pwd" show-password class="input_style2"></el-input>
        <el-button type="primary" @click="login2">发送</el-button>
        <span v-if="error.pwd" class="err-msg">{{error.pwd}}</span>
      </div>
      <div>
        <el-button :disabled="!(isValidEmail(this.name)&&(this.pwd.length===6))" type="primary" @click="login" class="login_style">注册</el-button>
      </div>
      <div>
        <el-button type="text" @click="login3">返回登录界面</el-button>
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
        signcode: '123456',
        error: {
          name: 'wrong',
          pwd: ''
        }
      }
    },
    methods: {
      login2() {//发送验证码
        this.$ajax.get('http://192.168.0.1:8081/chat/userMessage', 
        { email: this.input },  // 发送的email信息
  { headers: { 'Content-Type': 'application/json' } }  // 设置请求头
)
.then(res => {
  console.log(res.data);
    this.signcode = res.data;
}, err => {
  console.log(err);
});
        
      },
      login() {
          if (this.signcode === this.pwd) {
            this.$router.replace('/signsetting');
          } else { 
              console.assert('密码错误');
              this.$message('验证码错误');
          }
        },
        login3() {
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
  
  