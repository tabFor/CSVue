<template>
	<el-menu :default-active="activeIndex2" class="el-menu-demo"  mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="1">首页</el-menu-item>
		<el-menu-item index="2">系统管理</el-menu-item>
		<el-menu-item index="3">后台用户管理</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				activeIndex3: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
.el-menu{
	   background-color: #fcfdfd !important;
	   width: 100% !important;
	   padding: 0px !important;
	   margin-left: 0% !important;
	   border: #1d1d1d !important;
	   padding-inline-start: 0% !important;
  }
 .el-menu-item  {
      background-color: #f7f8fa !important ;
     color: #1d1d1d !important;
 }
</style>