<template>
    <div>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane :label="item.name" :name="item.categoryId" v-for="item in photoCategoryList"
                :key="item.categoryId">
                <ShowTableList v-if="activeName == item.categoryId" :categoryId="item.categoryId"></ShowTableList>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref } from "vue"
import services from '@/services'
import ShowTableList from '../components/ShowTableList.vue'
import imageApi from '../request/imageApi';

const photoCategoryList = ref([])
const activeName = ref(null)

const getPhotoCategory = () => {
    let params = {
        name:"探索"
    }
    services.getImgBox({ params }).then((res) => {
        console.log(res);
        if (res.code == "200" && res.data.length) {
            photoCategoryList.value = res.data
            activeName.value = res.data[0].categoryId
        }
    });
}
getPhotoCategory()

</script>

<style lang="scss" scoped></style>