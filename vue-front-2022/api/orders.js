import request from '@/utils/request' 

export default{
    //generate order
    createOrders(courseId){
        return request({
            url: '/eduorder/order/createOrder/'+courseId,
            method: 'post'
          })
    },
    //check order detail based on order id
    getOrdersInfo(id){
        return request({
            url: '/eduorder/order/getOrderInfo/'+id,
            method: 'get'
        })
    },
    //generate qr code
    createNative(orderNo){
        return request({
            url:'/eduorder/paylog/createNative/'+orderNo,
            method: 'get'
        })
    },
    //check order status method
    queryPayStatus(orderNo){
        return request({
            url:'/eduorder/paylog/queryPayStatus/'+orderNo,
            method: 'get'
        })
    },

    //update buy count
    updateBuyCount(courseId){
        return request({
            url:'/eduorder/order/updateBuyCount/'+courseId,
            method:'get'
        })
    }
}