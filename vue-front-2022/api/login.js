import request from '@/utils/request' 

export default{
    //login method
    submitLogin(userInfo){
        return request({
            url: `/educenter/member/login`,
            method: 'post',
            data: userInfo
          })
    },

    //get token of user
    getLoginUserInfo(){
        return request({
            url: `/educenter/member/getMemberInfo`,
            method: 'get'
          })
    }
}