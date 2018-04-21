import request from '@/config/request.js'

export function getArticle(page,num){
    return request({
        url: "/art/getArtList",
        method: 'post',
        data: { page, num }
    })
}