import request from '@/utils/request'

export default{

    //1 Banner list (pagination with condition)
    // params 是从back end的controller哪来的
    getCommentListPage(current,limit,commentQuery){
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/eduservice/edu-comment/pageCommentCondition/${current}/${limit}`, //be careful: 这里是` rather than '
            method: 'post',
            data: commentQuery
        })
    },
    deleteCommentId(id){
        return request({
            url: `/eduservice/edu-comment/deleteCommentById/${id}`,
            method: 'delete'
        })
    },
    //get teacher according to id
    getCommentInfo(id) {
        return request({
            url: `/eduservice/edu-comment/getCommentById/${id}`,
            method: 'get'
        })
    },
    //update banner
    updateComment(comment){
        return request({
            url: `/eduservice/edu-comment/updateCommentInfo`,
            method: 'post',
            data: comment
        })
    }
}
