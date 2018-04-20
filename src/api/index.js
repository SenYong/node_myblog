import request from '@/config/request.js'

export function getArticle(page,num){
    return request({
        url: "/art/getNum",
        method: 'post',
        data: { page, num }
    })
}