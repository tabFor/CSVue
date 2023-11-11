<template>

    <el-container>
  <el-header height="60px">
    <Test></Test>
    <Card></Card>
</el-header>
  <el-container>
    <!-- <el-aside width="150px"><Guide></Guide></el-aside> -->
    <el-main>
      <router-view ></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import Test from './test'
import Guide from './sideguide.vue'
import MainGuide from './mainguide.vue'
import Table from './maintable.vue'
import Foot from './mainfoot.vue'
export default {
  name: 'layout',
  components: {
      Test,
    Guide,
    MainGuide,
    Table,
    Foot
  },
    beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
      // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    //当你在登录状态下是不能离开的，除非·你退出登录
    return '/layout/home'
  }
}
</script>

<style>

  .el-header {
    background-color: #fdfdff;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 600px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 0px;
    padding: 5px !important;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>