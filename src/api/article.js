import request from '@/config/request.js';

// 获取指定数据
export function getArtList(page, num){
    return request({
        url: '/art/getArtList',
        method: 'post',
        data: {page, num}
    })
}

// 详情
export function getArtDetail(id){
    return request({
        url: '/art/artDetail',
        method: 'post',
        data: {id}
    })
}


// 用户评论
export function userComment(ac_pid, ac_name, ac_img, ac_content){
    return request({
        url: '/art/userComment',
        method: 'post',
        data: {ac_pid, ac_name, ac_img, ac_content}
    })
}

//获取用户评论
export function getArtComment(id){
    return request({
       url: '/art/getArtComment',
       method: 'post',
       data: {id}
    })
}