import request from '@/utils/request' 

export default{
    //add to user's collection
    addToCollection(collection) {
        return request({
            url: `/eduservice/collect/addCollect`,
            method: 'post',
            data: collection
        })
    },
    //undo the collection in course detail page
    undoCollection(courseId){
        return request({
            url: '/eduservice/collect/'+courseId,
            method: 'delete'
        })
    },
    //get collection status in course detail page
    getCollectionStat(courseId){
        return request({
            url: `/eduservice/collect/getCollectStat/${courseId}`,
            method: 'post'
        })
    },
    //get course collection in user's collection page
    getCollectionList(){
        return request({
            url: `/eduservice/collect/getCollectList`,
            method: 'post'
        })
    },
    //get course collection in user's collection page
    searchCollect(collection){
        return request({
            url: `/eduservice/collect/searchCourse`,
            method: 'post',
            data: collection
        })
    }
}