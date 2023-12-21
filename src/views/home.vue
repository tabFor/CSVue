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
<style>
body {
    margin: 0;
}

.el-main {
    background-color: aliceblue;
}

.el-header {
    padding: 0;
}
</style>
<script>
import CommonAside from './commonAside.vue';
import CommonHeader from './commonHeader.vue';

export default {
    data() {
        return {};
    },
    components: { CommonAside, CommonHeader }
}
</script>