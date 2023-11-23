export default {
    // 根据类型查询图片
    getPhotoByCateIdUrl: function (id) {
        return `/photo/selectPhotos/${id}/-1`
    },
    // 获取照片类型
    getImgBoxUrl: '/category/selectSons',
    // 删除用户自己的图片
    deleteImageUrl: '/photo/deletePhoto',
}