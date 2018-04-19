import request from '../config/request.js'

export function getArticle(page,num){
    console.log(page)
    console.log(num)
    return request({
        url: "/index/getArticle",
        method: 'post',
        data: { page, num }
    })
}