<template>
    <!-- 登陆表单 -->
    <div class="registerPage">
        <div class="formContainer">
            <h2>用户注册</h2>
            <div class="userAvatar">
                <el-avatar :src="userAvatar" />
                <div class="changeAvatar" @click="openChangeAvatarDialog" v-if="isRegister == 0">更换头像</div>
            </div>
            <el-form v-if="isRegister == 0" ref="registerFormRef" :model="registerForm" status-icon :rules="registerRules"
                class="registerform">
                <el-form-item prop="nick">
                    <el-input v-model="registerForm.nick" :prefix-icon="EditPen" type="text" autocomplete="off"
                        placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" :prefix-icon="UserFilled" type="text" autocomplete="off"
                        placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="signature">
                    <el-input v-model="registerForm.signature" :prefix-icon="ChatLineSquare" type="text" autocomplete="off"
                        placeholder="请输入个性签名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" :prefix-icon="Lock" type="password" autocomplete="off"
                        placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item prop="secpassword">
                    <el-input v-model="registerForm.secpassword" :prefix-icon="Lock" type="password" autocomplete="off"
                        placeholder="请再次输入密码" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button class="registerButton" type="primary" @click="submitForm(registerFormRef)">注册</el-button>
                </el-form-item>
            </el-form>
            <div class="tips" v-if="isRegister == 0">
                <span class="register" @click="toLogin">已有账号，去登录</span>
            </div>
            <div class="toLogin" v-if="isRegister == 1">
                <el-result icon="success" title="注册成功" sub-title="返回登录页登录">
                    <template #extra>
                        <el-button type="primary" @click="toLogin">返回登录</el-button>
                    </template>
                </el-result>
            </div>
        </div>
    </div>
    <el-dialog v-model="avatarDialogTableVisible" title="选择头像 ">
        <div class="avatatDiv">
            <el-image v-for="(item, index) in userAvatarList" :key="index" style="width: 100px; height: 100px"
                :src="item.url" fit="fit" @click="changeCurrentAvatar(item.url)" />
        </div>
    </el-dialog>
</template>

<script setup>
import services from '@/services'
import { ElMessage } from 'element-plus'
import { UserFilled, Lock, EditPen, ChatLineSquare } from '@element-plus/icons-vue'
import { ref, reactive } from "vue"
import { useRouter } from 'vue-router';


const router = useRouter()


const registerFormRef = ref()
const isRegister = ref(0)
const avatarDialogTableVisible = ref(false)
const userAvatarList = ref([])
const userAvatar = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")
const registerForm = reactive({
    nick: '',
    username: '',
    signature: '',
    password: '',
    secpassword: ''
})
const checkPassword = (rule, value, callback) => {
    if (value === registerForm.password) {
        return callback();
    }
    // 返回一个错误提示
    callback(new Error('两次输入的密码不一致'));
};
const registerRules = reactive({
    nick: [
        { required: true, message: '请输入昵称', trigger: 'blur', },
        { min: 3, max: 10, message: '昵称长度在 3 到 10 个字符', trigger: 'blur', },
    ],
    username: [
        { required: true, message: '请输入账号', trigger: 'blur', },
        { min: 7, max: 15, message: '登录账号长度在 7 到 15 个字符', trigger: 'blur', },
    ],
    signature: [
        { required: true, message: '请输入个性签名', trigger: 'blur', },
        { min: 5, max: 20, message: '个性签名长度在 5 到 20 个字符', trigger: 'blur', },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur', },
        { min: 5, max: 12, message: '密码长度在 5 到 20 个字符', trigger: 'blur', },
    ],
    secpassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur', },
        { validator: checkPassword, trigger: 'blur' },
    ],
})

// 获取头像列表

// 更换头像
const changeCurrentAvatar = (url) => {
    userAvatar.value = url
    avatarDialogTableVisible.value = false
}
const openChangeAvatarDialog = () => {
    avatarDialogTableVisible.value = true
    services.getAllAvatar()
        .then((res) => {
            if (res.code == "200") {
                userAvatarList.value = res.data
            }
        });
}

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let params = {
                nick: registerForm.nick,
                signature: registerForm.signature,
                userAvatar: userAvatar.value,
                username: registerForm.username,
                password: registerForm.password
            }
            services.useRegister(params)
                .then((res) => {
                    if (res.code === 200) {
                        isRegister.value = 1
                    } else {
                        ElMessage.error("注册失败")
                    }
                });
        } else {
            return false
        }
    })
}

// 注册
const toLogin = () => {
    router.push("/login")
}
</script>

<style lang="scss" scoped>
.registerPage {
    height: 100%;
    background-image: url('@/assets/imgs/R-C.jpg');
    background-size: cover;

    .formContainer {
        width: 360px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        // color: white;
        text-align: center;
        padding: 20px;
        border: 1px solid #eaeeea;
        box-shadow: 0 0 25px #cac6c6;
        border-radius: 15px;

        .userAvatar {
            .changeAvatar {
                color: #409EFF;
                font-size: 12px;
                cursor: pointer;
                margin-top: 10px;
            }

            .el-avatar {
                margin-top: 20px;
                display: inline-block;
                width: 25%;
                height: 100%;
            }

        }

        :deep(.el-input__inner)::placeholder {
            font-size: 12px;
        }

        h3 {
            font-size: 30px;
        }

        .registerform {
            margin-top: 20px;
        }

        .registerButton {
            width: 100%;
        }
    }

    .tips {
        text-align: right;

        .register {
            color: #409EFF;
            font-size: 12px;
            cursor: pointer;
        }
    }
}
</style>