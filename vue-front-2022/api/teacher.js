import request from '@/utils/request' 

export default{
    //pagination for instructor at customer site
    getTeacherList(page,limit){
        return request({
            url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
            method: 'post'
          })
    },
    //instructor's detail and its relatedcourse method
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
            method: 'get'
        })
    }
}