import request from '@/utils/request' 

export default{
    //1、get hot course and teacher
    getIndexData(){
        return request({
            url: '/eduservice/indexfront/index',
            method: 'get'
          })
    }
}