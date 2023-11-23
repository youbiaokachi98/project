<template>
    <el-header>
        <div class="left">
            <el-icon>
                <Menu />
            </el-icon>
            <span style="margin-left:10px;">照片分享后台管理系统</span>
        </div>
        <div class="right">
            <span style="margin-right: 10px;">{{ store.userInfo.nick }} </span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar style="cursor: pointer;" :src="store.userInfo.userAvatar" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { onMounted } from 'vue';
import services from '../services'
import { useStore } from "@/store";
import { Menu, User } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router'
const store = useStore()
const route = useRouter();


onMounted(() => {
    services.getUserInfo().then(res=>{
        console.log(res);
        store.changeUserInfo(res.data)
    })
})

// 退出登录
const handleLogout = () => {
    route.push("/login")
    sessionStorage.removeItem("token")
    store.clearUserInfo()
}
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,
.right {
    display: flex;
}
.left {
    i {
        margin: auto;
        cursor: pointer;
    }
}

.right {
    .el-dropdown {
        margin: auto;
    }
}
</style>