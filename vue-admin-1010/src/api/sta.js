import request from '@/utils/request' //axios and interceptor encapsulated

export default{
    //1.generate statistic data
    createStaData(day){
        return request({
            url: '/staservice/sta/registerCount/'+day,
            method: 'post'
        })
    },

    //obtain statistic data
    getDataSta(searchObj){
        return request({
            url: `/staservice/sta/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }

}