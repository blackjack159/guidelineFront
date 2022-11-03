import request from '@/utils/request'

export default{

    //1 Teacher list (pagination with condition)
    // params 是从back end的controller哪来的
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`, //be careful: 这里是` rather than '
            method: 'post',
            //teacherQuery，在backend是用RequestBody来 获取数据
            //data表示把Object 转换成 json 进行传递到接口里面
            data: teacherQuery
        })
    },
    deleteTeacherId(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
        })
    },
    //add teacher
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    //get teacher according to id
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    //update teacher
    updateTeacher(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }
}
