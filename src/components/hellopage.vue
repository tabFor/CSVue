<template>
  <div id="app">
    <el-container class="container">
      <el-header>
        <el-row
          type="flex"
          justify="center"
          align="middle"
        >
          <el-col :span="24">
            <h1 class="title animated fadeInDown">欢迎来到合同智审平台！</h1>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row
          type="flex"
          justify="center"
          align="middle"
        >
          <el-col
            :span="12"
            class="button-group"
          >
            <el-button
              class="custom-button animated fadeInUp"
              type="primary"
              @click="userLogin"
            >用户登录</el-button>
            <el-button
              class="custom-button animated fadeInUp"
              type="success"
              @click="adminLogin"
            >管理员登录</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    userLogin() {
      // 这里添加用户登录的代码
      console.log("用户登录");
      this.$router.replace("/login");
    },
    adminLogin() {
      // 这里添加管理员登录的代码
      console.log("管理员登录");
      this.$router.replace("/adminlogin");
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  /* background: linear-gradient(to right, #ff9966, #ff5e62); */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.title {
  color: #f9a4a4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 3em;
  margin-bottom: 50px;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 50%;
}

.custom-button {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.el-main {
  background-color: rgba(255, 255, 255, 0);
}
</style>
