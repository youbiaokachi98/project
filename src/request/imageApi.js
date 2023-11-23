
import server from "./server";
export default {
    async deleteImage(id) {
        return await server({
            method: 'post',
            params: { photoId: id },
            url: `/photo/deletePhoto`
        })
    },
    async insertPhoto(data){
        return await server({
            method:'post',
            url:'/photo/insertPhoto',
            data:data
        })
    },
    // 获取摄影师
    async getPhotographerInfo(pageNum) {
        return await server({
            method: 'get',         
            url: `/photographer/getAllUserInfo?pageNum=`+pageNum
        })
    },
}