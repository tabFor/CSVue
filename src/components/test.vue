<template>
	<el-menu :default-active="activeIndex2" class="el-menu-demo"  mode="horizontal" router="true" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="/layout/home">首页</el-menu-item>
		<el-menu-item index="/layout/query">查询界面</el-menu-item>
		<el-menu-item index="/layout/user">用户信息</el-menu-item>
		<el-menu-item index="/layout/dialog">对话记录</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex2: '/layout/home',
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.activeIndex2 = key;
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