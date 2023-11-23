<template>
    <div>
        <el-dialog v-model="dialogFormVisible" title="修改照片">
            <el-form ref="editOrAddPhotoFormRef" :model="editOrAddPhotoForm" :rules="editOrAddPhotoFormRules" label-width="80px"
                class="demo-ruleForm">
                <el-form-item label="作者" prop="username">
                    <el-input v-model="editOrAddPhotoForm.username" />
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editOrAddPhotoForm.password" />
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <!-- 多选框(角色身份,编辑还是管理员) -->
                    <el-select v-model="editOrAddPhotoForm.role" class="m-2" placeholder="Select" style="width:100%">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="editOrAddPhotoForm.introduction" type="textarea" />
                </el-form-item>

                <el-form-item label="图片" prop="avatar">
                    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">添加用户</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const editOrAddPhotoFormRef = (null)
const imageUrl = ref('')
const dialogFormVisible = ref(false)

const props = defineProps({
    operateType: {
        type: String,
        required: true
    }
})


const beforeAvatarUpload = (rawFile) => {
    console.log(rawFile);
}

// 上传成功
const handleAvatarSuccess = () => {
    dialogFormVisible.value = false
}

// 打开弹框
const openDialog = () => {
    dialogFormVisible.value = true
}

// 暴露方法
defineExpose({
    openDialog
})
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader) .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader) .el-upload:hover {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>