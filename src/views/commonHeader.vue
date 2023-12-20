<template>
    <div class="header-container">
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
}
</script>

<style >
.header-container {
    background-color: #333;
    height: 60px;


    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 20px;


}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;


}

.user {
    width: 40px;
    height: 40px;

    border-radius: 50%;
}
</style>
