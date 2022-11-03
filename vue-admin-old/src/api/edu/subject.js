import request from '@/utils/request' //axios and interceptor encapsulated

export default{
    //1. get subject tree
    getSubjectList(){
        return request({
            url: '/eduservice/edu-subject/getAllSubject',
            method: 'get'
        })
    }
    
}