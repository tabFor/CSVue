<template>
  <div id="app">
    <router-view name="login"></router-view>
    <router-view name="layout"></router-view>
    <router-view name="adlogin"></router-view>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import layout from "./components/layout";
export default {
  components: {
    layout,
    RouterView
  },
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0px !important;
}
</style>

