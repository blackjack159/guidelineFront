import request from '@/utils/request' 

export default{
    //get comment and pagination for certain course
    getPageList(page, limit, courseId) {
        return request({
            url: `/eduservice/edu-comment/getCommentPage/${page}/${limit}/${courseId}`,
            method: 'get',
        })
    },
    //add comment by user
    addComment(comment) {
        return request({
            url: `/eduservice/edu-comment/auth/addComment`,
            method: 'post',
            data: comment
        })
    }

}