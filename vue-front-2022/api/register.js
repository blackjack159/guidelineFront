import request from '@/utils/request' 

export default{
    //1、get sms code via phone number
    sendCode(phone,email){
        return request({
            url: `/msmservice/msm/send/${phone}/${email}`,
            method: 'get'
          })
    },

    //register
    registerMember(formItem){
        return request({
            url: `/educenter/member/register`,
            method: 'post',
            data: formItem
          })
    },

    //reset password
    resetPassword(mobile,email,code,password){
        return request({
            url: `/educenter/member/resetPassword/${mobile}/${email}/${code}/${password}`,
            method: 'get'
          })
    },
}