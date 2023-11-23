<template>
    <!-- 登陆表单 -->
    <div class="loginPage">
        <div class="formContainer">
            <h2>用户注册</h2>
            <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" class="loginform">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" :prefix-icon="UserFilled" type="text" autocomplete="off"
                        placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" autocomplete="off"
                        placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button class="loginButton" type="primary" @click="submitForm(loginFormRef)">登录</el-button>

                </el-form-item>
            </el-form>
            <div class="tips">
                <span class="register" @click="register">没有账号，去注册</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import services from '@/services'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from "vue"
import { useRouter } from 'vue-router';

const router = useRouter()


const loginFormRef = ref()

const loginForm = reactive({
    username: '',
    password: '',
})
const loginRules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
})

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            services.userLogin(loginForm).then(res => {
                if (res.code === 200) {
                    ElMessage.success("登录成功")
                    sessionStorage.setItem("token",res.data.token)
                    router.push("/photoMange")
                } else {
                    ElMessage.error("登录失败")
                }
            })
        } else {
            return false
        }
    })
}

// 注册
const register = () => {
    router.push("/register")
}
</script>

<style lang="scss" scoped>
.loginPage {
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

        :deep(.el-input__inner)::placeholder {
            font-size: 12px;
        }

        h3 {
            font-size: 30px;
        }

        .loginform {
            margin-top: 20px;
        }

        .loginButton {
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