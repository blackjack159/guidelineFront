import request from '@/utils/request' //axios + interceptor

export default{
    //1、get banner list for swiper
    getBannerList(){
        return request({
            url: '/educms/bannerfront/getAllBanner',
            method: 'get'
          })
    }
}