import request from '@/config/request'

export function getSayList(page, num){
    return request({
        url: '/say/getSayList',
        method: 'post',
        data: {page, num}
    })
}

export function getSayComment(id){
    return request({
        url: '/say/getSayComment',
        method: 'post',
        data: {id}
    })
}