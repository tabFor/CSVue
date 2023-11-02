<template>
    <div>
        <MainGuide></MainGuide>
      <Table></Table>
      <Foot></Foot>
    </div>
</template>
<script>
    import MainGuide from './mainguide.vue'
import Table from './maintable.vue'
import Foot from './mainfoot.vue'
export default {
  name: 'layout',
  components: {
    MainGuide,
    Table,
    Foot
  }
}
</script>