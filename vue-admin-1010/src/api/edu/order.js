import request from '@/utils/request'

export default{

    //1 Order list (pagination with condition)
    // params 是从back end的controller哪来的
    getOrderListPage(current,limit,commentQuery){
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/eduorder/order/pageOrderCondition/${current}/${limit}`, //be careful: 这里是` rather than '
            method: 'post',
            data: commentQuery
        })
    },
    //get teacher according to id
    getOrderInfo(id) {
        return request({
            url: `/eduorder/order/getOrderById/${id}`,
            method: 'get'
        })
    },
    //update banner
    updateOrder(comment){
        return request({
            url: `/eduorder/order/updateOrderInfo`,
            method: 'post',
            data: comment
        })
    }
}
