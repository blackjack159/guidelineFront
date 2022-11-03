import request from '@/utils/request' 

export default{
    //pagination for course at customer site
    getCourseList(page,limit,searchObj){
        return request({
            url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
            method: 'post',
            data: searchObj
          })
    },
    //get all subject
    getAllSubject(id){
        return request({
            url: '/eduservice/edu-subject/getAllSubject',
            method: 'get'
        })
    },
    //course detail method
    getCourseInfo(id){
        return request({
            url: '/eduservice/coursefront/getFrontCourseInfo/'+id,
            method: 'get'
        })
    },

    //update view count
    updateViewCount(courseId){
        return request({
            url: '/eduservice/coursefront/updateViewCount/'+courseId,
            method: 'get'
        })
    }
}