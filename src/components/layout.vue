<template>

  <el-container>
    <el-header height="60px">
      <Test></Test>
    </el-header>
    <el-container>
      <!-- <el-aside width="150px"><Guide></Guide></el-aside> -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import Test from "./test";
export default {
  name: "layout",
  components: {
    Test
  },
  mounted() {
    this.checklog();
  },
  methods: {
    checklog() {
      if (
        this.$session.get("session-id") === undefined ||
        this.$session.get("session-id") === null
      ) {
        this.$router.replace("/");
      } else {
      }
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #fdfdff;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px;
  min-height: 8vh;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 600px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 0px;
  padding: 5px !important;
  min-height: 92vh;
}

body > .el-container {
  margin-bottom: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
body {
  margin: 0;
}
</style>