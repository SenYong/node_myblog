import request from '@/config/request'

//获取指定数据
export function getSayList(page, num){
    return request({
        url: '/say/getSayList',
        method: 'post',
        data: {page, num}
    })
}

//说说详情
export function sayDetail(id){
    return request({
        url: '/say/sayDetail',
        method: 'post',
        data: {id}
    })
}

//用户评论
export function userComment(sc_pid, sc_name, sc_img, sc_content){
    return request({
        url: '/say/userComment',
        method: 'post',
        data: {sc_pid, sc_name, sc_img, sc_content}
    })
}

//获取用户评论
export function getSayComment(id){
    return request({
        url: '/say/getSayComment',
        method: 'post',
        data: {id}
    })
}