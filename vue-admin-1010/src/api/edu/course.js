import request from '@/utils/request' //axios and interceptor encapsulated

export default{
    //1. add course info
    addCourseInfo(courseInfo){
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data:courseInfo
        })
    },
    //2. get all teacher
    getListTeacher(){
        return request({
            url:"/eduservice/teacher/findAll",
            method: 'get'
        })
    },
    //get all courses via course id (数据回显)
    getCourseInfoId(id){
        return request({
            url:'/eduservice/course/getCourseInfo/'+id,
            method:'get'
        })
    },
    //update course and course description
    updateCourseInfo(courseInfo){
        return request({
            url:'/eduservice/course/updateCourseInfo',
            method:'post',
            data: courseInfo //因为backend用的是 @requestbody 所以要用Post method 和data来pass object
        })
    },
    //获得课程确认信息显示
    getPublishCourseInfo(id){
        return request({
            url:'/eduservice/course/getPublishCourseInfo/'+id,
            method:'get'
        })
    },
    publishCourse(id){
        return request({
            url:'/eduservice/course/publishCourse/'+id,
            method:'post'
        })
    },
    //TODO课程列表
    getListCourse(){
        return request({
            url:'/eduservice/course',
            method:'get'
        })
    },
    getCourseListPage(current,limit,courseQuery){
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`, //be careful: 这里是` rather than '
            method: 'post',
            //courseQuery，在backend是用RequestBody来 获取数据
            //data表示把Object 转换成 json 进行传递到接口里面
            data: courseQuery
        })
    },
    deleteCourseId(id){
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
        })
    },
    
}