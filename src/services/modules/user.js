import request from '../request'
import apis from '../apis/user'


export default {
    // 用户登录
    userLogin(params) {
        return request.post(apis.userLoginUrl, params)
    },
    // 用户注册
    useRegister(params) {
        return request.post(apis.userRegisterUrl, params)
    },
    // 获取用户头像
    getAllAvatar(){
        return request.get(apis.getAllAvatarUrl)
    },
    // 获取用户信息
    getUserInfo(){
        return request.get(apis.getUserInfoUrl)
    }
}