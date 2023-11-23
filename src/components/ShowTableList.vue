<template>
    <el-button type="primary" @click="addPhoto" style="margin-bottom: 15px;">新增</el-button>
    <el-table class="photoTable" :data="tableData" :border="true" style="width: 100%" max-height="calc(100vh - 220px)">
        <el-table-column type="index" width="55" fixed align="center" />
        <el-table-column prop="nick" label="作者" align="center" />
        <el-table-column prop="userAvatar" label="作者头像" align="center">
            <template #default="scope">
                <div v-if="scope.row.userAvatar">
                    <el-avatar :size="50" :src="scope.row.userAvatar" @error="errorHandler(scope.row)"></el-avatar>
                </div>
                <!-- 默认头像 -->
                <div v-else>
                    <el-avatar :size="50" :src="defaultAvatar" />
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="link" label="照片" align="center">
            <template #default="scope">
                <el-image style="width: 100px; height: 100px" :src="scope.row.link" fit="contain" preview-teleported
                    :z-index="999" lazy :preview-src-list="[scope.row.link]">
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                            <div class="errorDetail">图片加载失败</div>
                        </div>
                    </template>
                </el-image>
            </template>
        </el-table-column>
        <el-table-column prop="approvalCounts" label="点赞数" align="center" />
        <el-table-column prop="commentCounts" label="评论数" align="center" />
        <el-table-column prop="publishTime" label="发布时间" align="center" />
        <el-table-column label="操作" width="320" align="center">
            <template #default="scope">
                <el-button @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <EditPhotoDialog ref="editPhotoDialog"></EditPhotoDialog>
</template>

<script setup>
import { ref } from 'vue'
import imageApi from '../request/imageApi';
import services from '../services'
import defaultAvatar from '../assets/imgs/defaultAvatar.png'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import EditPhotoDialog from './EditPhotoDialog.vue'
const props = defineProps({
    categoryId: {
        type: Number,
        required: true
    }
})

const tableData = ref([])
const editPhotoDialog = ref(null)


// 初始化
const getPhotoByCate = (categoryId) => {
    services.getPhotoByCateId(categoryId).then((res) => {
        console.log(res);
        if (res.code == "200") {
            tableData.value = res.data
        }
    });
}

getPhotoByCate(props.categoryId)


// 头像加载失败设置默认头像
const errorHandler = (row) => {
    row.userAvatar = defaultAvatar
}

// 新增图片
const addPhoto = () => {
    let data = {
        title: "标题标题标题标题",
        information: "描述",
        categoryId: 8,
        link: "http://cdn.u1.huluxia.com/g4/M01/BF/C4/rBAAdmM_l6GAQkRDAADJkzj_VTs129.jpg"
    }
    imageApi.insertPhoto(data).then((res) => {
        console.log(res);
        // if (res.code == "200") {
        //     tableData.value = res.data
        // }
    });
}

// 编辑
const handleEdit = (row) => {
    console.log(row);
    editPhotoDialog.value.openDialog()
}

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm(
        '确定要删除该图片吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            console.log(111);
            console.log(row.photoId);
            // 调用删除接口  row.photoId
            services.deleteImage({ photoId: String(row.photoId) }).then((res) => {
                console.log(res);
                // if (res.code == "200") {
                //     tableData.value = res.data
                // }
            });
        })
        .catch(() => {

        })
}
</script>

<style lang="scss" scoped>
.photoTable {
    :deep(.el-image) {
        width: 100% !important;
    }
}

.photoTable .image-slot {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 30px;

    .errorDetail {
        font-size: 12px;
        margin-top: 5px;
    }

    .el-icon {
        font-size: 30px;
    }

}
</style>