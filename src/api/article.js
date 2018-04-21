import request from '@/config/request.js';

export function getArtList(page, num){
    return request({
        url: '/art/getArtList',
        method: 'post',
        data: {page, num}
    })
}

export function getArtDetail(id){
    return request({
        url: '/art/artDetail',
        method: 'post',
        data: {id}
    })
}


export function userComment(ac_pid, ac_name, ac_img, ac_content){
    return request({
        url: '/art/userComment',
        method: 'post',
        data: {ac_pid, ac_name, ac_img, ac_content}
    })
}