<template>
  <div id="app">
    <router-link to="/">page1</router-link>
    <router-link :to="{name: 'HelloWorld'}">page2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import layout from './components/layout'
export default {
  components: {
    layout
  },
  name: 'App'
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

