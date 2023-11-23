<template>
    <el-aside>
        <el-menu :collapse-transition="false" :router="true" :collapse="true"
            :default-active="route.fullPath">
            <el-menu-item index="/photoMange">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <template #title>照片管理</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { HomeFilled } from "@element-plus/icons-vue";
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<style lang="scss" scoped>
.el-aside {
    width: auto;
    height: calc(100vh - 60px);
    .el-menu {
        height: 100%;
    }
}
</style>