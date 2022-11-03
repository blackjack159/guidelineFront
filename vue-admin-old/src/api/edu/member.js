import request from '@/utils/request'

export default{

    //1 User list (pagination with condition)
    // params 是从back end的controller哪来的
    getUserListPage(current,limit,userQuery){
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/educenter/member/pageUserCondition/${current}/${limit}`, //be careful: 这里是` rather than '
            method: 'post',
            //userQuery，在backend是用RequestBody来 获取数据
            //data表示把Object 转换成 json 进行传递到接口里面
            data: userQuery
        })
    },

    //ban or unban user
    banUser(memberId,isDisabled){
        return request({
            url: `/educenter/member/banUser/${memberId}/${isDisabled}`,
            method: 'get'
        })
    }
}
