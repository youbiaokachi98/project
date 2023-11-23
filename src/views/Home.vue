<template>
    <el-container direction="vertical">
        <TopHeader></TopHeader>
        <el-container>
            <LeftMenu></LeftMenu>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import LeftMenu from '../components/LeftMenu.vue'
import TopHeader from '../components/TopHeader.vue'
</script>

<style lang="scss" scoped>
.el-main{
    height: calc(100vh - 60px);
}
</style>