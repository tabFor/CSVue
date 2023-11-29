<template>
  <div>
    <MainGuide></MainGuide>
    <Table></Table>

  </div>
</template>
<script>
import MainGuide from "./mainguide.vue";
import Table from "./maintable.vue";
export default {
  name: "layout",
  components: {
    MainGuide,
    Table,
  }
};
</script>
<style>
body {
  margin: 0px;
}
</style>