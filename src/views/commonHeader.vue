<template>
    <div class="header-container">
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/co.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item command="info">个人信息</el-dropdown-item> -->
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleCommand(command) {
            // 处理菜单项点击事件的逻辑
            switch (command) {
                case "info":
                    // 选项1的点击事件处理逻辑
                    this.$router.replace("/admin/info");
                    break;
                case "logout":
                    this.$ajax
                        .get("/user/deletelogged", {
                            params: {
                                cookie: this.$session.get("session-id")
                            }
                        })
                        .then(res => {
                            console.log(res);
                            this.$message.success("退出登录");
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error("修改失败");
                        });
                    this.$router.replace("/adminlogin");
                    // 选项2的点击事件处理逻辑
                    break;
                default:
                    // 默认处理逻辑
                    break;
            }
        }
    }
};
</script>

<style scoped>
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
    color: #409eff;
}

.user {
    width: 40px;
    height: 40px;

    border-radius: 50%;
}
</style>
