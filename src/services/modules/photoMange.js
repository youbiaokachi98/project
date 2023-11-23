import request from '../request'
import apis from '../apis/photoMange'

export default {
    // 根据类型查询图片
    getPhotoByCateId(params) {
        return request.get(apis.getPhotoByCateIdUrl(params))
    },
    // 获取照片类型
    getImgBox(params) {
        return request.get(apis.getImgBoxUrl, params)
    },
    // 删除用户自己的图片
    deleteImage(params) {
        return request.post(apis.deleteImageUrl, params)
    },
}