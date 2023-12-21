<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    router="false"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/layout/query">查询界面</el-menu-item>
    <el-menu-item index="/layout/home">AI对话</el-menu-item>
    <el-menu-item index="/layout/user">用户信息</el-menu-item>
    <el-menu-item index="/layout/dialog">对话记录</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeIndex2: this.$router.currentRoute.path
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("当前路由信息对象", this.$router.currentRoute);
      console.log("当前路由路径", this.$router.currentRoute.path);
      console.log(key, keyPath);
      this.activeIndex2 = key;
      this.$router.replace(this.activeIndex2);
    }
  }
};
</script>

<style scoped>
.el-menu {
  background-color: #5793e6 !important;
  width: 100% !important;
  padding: 0px !important;
  margin-left: 0% !important;
  border: #1d1d1d !important;
  padding-inline-start: 0% !important;
  /* height: 8vh; */
}
.el-menu-item {
  background-color: #5793e6 !important ;
  color: #ffffff !important;
}
body {
  margin: 0;
}
</style>