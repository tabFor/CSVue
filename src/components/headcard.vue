<template>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">后台用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
<style>
    .el-breadcrumb{
        padding: 13px !important;
    }
    /*.el-breadcrumb__inner{
        color: #000;
    }*/
</style>