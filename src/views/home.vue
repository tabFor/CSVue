<template>
  <el-container>
    <el-aside width="15vw">
      <CommonAside />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
body {
  margin: 0;
}

.el-main {
  background-color: aliceblue;
  height: 90vh;
}

.el-header {
  padding: 0;
}
</style>
<script>
import CommonAside from "./commonAside.vue";
import CommonHeader from "./commonHeader.vue";

export default {
  data() {
    return {};
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
  },
  components: { CommonAside, CommonHeader }
};
</script>