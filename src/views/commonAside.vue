<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <!-- 要放到导航栏里面 -->
            <h3 class="aside">通用后台管理系统</h3>
            <!-- 观察数据,我们发现name是唯一标识 -->
            <!-- 查看文档,index是唯一标识 -->
            <el-menu-item @click="clickItem(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                <!-- 这里是字体图标,用模板字符串拼接,注意要动态绑定 -->
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group @click="clickItem(subItem)" v-for="subItem in item.children" :key="subItem.name">
                    <el-menu-item :index="subItem.name">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 300px;
}

.el-menu {
    height: 100vh;

}

.aside {
    text-align: center;
    line-height: 48px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
}
</style>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            MenuData: [
                {
                    path: '/admin',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/admin/law',
                    name: 'mall',
                    label: '法律管理',
                    icon: 'video-play',
                    url: 'MallManage/MallManage'
                },
                {
                    path: '/admin/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickItem(item) {
            // 防止自己跳自己的报错
            if (this.$route.path !== item.path && !(this.$route.path === '/admin' && (item.path === '/'))) {
                this.$router.push(item.path)
            }
        }
    },
    computed: {
        noChildren() {
            // 如果没有children则返回true,会被过滤器留下
            return this.MenuData.filter(item => !item.children)
        },
        hasChildren() {
            return this.MenuData.filter(item => item.children)
        }
    }
}
</script>
