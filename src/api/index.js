import request from '../config/request.js'

export function getArticle(){
    return request({
        url: "/api/index",
        method: 'get',
    })
}