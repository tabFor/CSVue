<!--language: JavaScript-->
<template>
  <div>
    <!-- 头部 -->
    <header class="header">Hello</header>
    <el-button @click="gologUser">用户登录</el-button>
    <el-button @click="gologAdmin">管理员登录</el-button>
  </div>
</template>

<script>
export default {
  // 定义一个data函数，返回一个对象
  data() {
    return {
      // 定义一个属性property，值为"value"
      property: "value"
    };
  },
  // 定义一个methods函数，返回一个对象
  methods: {
    // 定义一个golog函数，用于跳转到登录页面
    gologUser() {
      this.$router.replace("/login");
    },
    gologAdmi() {
      this.$router.replace("/login");
    }
  }
};
</script>

<style></style>