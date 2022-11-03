import request from '@/utils/request' //axios and interceptor encapsulated

export default{
    //添加Video
    addVideo(video){
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
        })
    },
    //删除 lesson
    deleteVideo(id){
        return request({
            url:'/eduservice/video/'+id,
            method: 'delete'
        })
    },
    //delete video
    deleteAliyunvod(id){
        return request({
            url: '/eduvod/video/removeAliyunVideo/'+id,
            method: 'delete'
        })
    },
    //根据id查询小节
    getVideoById(videoId){
        return request({
            url: '/eduservice/video/getLessonInfo/'+videoId,
            method: 'get'
        })   
    },
    updateVideo(video){
        return request({
            url: '/eduservice/video/updateVideo',
            method: 'put',
            data: video
        })
    },
}