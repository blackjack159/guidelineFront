import request from '@/utils/request'

export default{

    //1 Banner list (pagination with condition)
    // params 是从back end的controller哪来的
    getBannerListPage(current,limit,bannerQuery){
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/educms/banneradmin/pageBannerCondition/${current}/${limit}`, //be careful: 这里是` rather than '
            method: 'post',
            data: bannerQuery
        })
    },
    deleteBannerId(id){
        return request({
            url: `/educms/banneradmin/deleteBannerById/${id}`,
            method: 'delete'
        })
    },
    //add teacher
    addBanner(banner){
        return request({
            url: `/educms/banneradmin/addBanner`,
            method: 'post',
            data: banner
        })
    },
    //get teacher according to id
    getBannerInfo(id) {
        return request({
            url: `/educms/banneradmin/getBannerById/${id}`,
            method: 'get'
        })
    },
    //update banner
    updateBanner(banner){
        return request({
            url: `/educms/banneradmin/updateBanner`,
            method: 'post',
            data: banner
        })
    }
}
