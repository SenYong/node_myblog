import request from '@/config/request'

//获取指定数据
export function getLogList(page, num){
    return request({
        url: '/log/getLogList',
        method: 'post',
        data: {page, num}
    })
}


//获取详情
export function logDetail(id){
    return request({
        url: '/log/logDetail',
        method: 'post',
        data: {id}
    })
}

//用户评论
export function userComment(lc_pid, lc_name, lc_img, lc_content){
    return request({
        url: '/log/userComment',
        method: 'post',
        data: {lc_pid, lc_name, lc_img, lc_content}
    })
}

//获取用户评论
export function getLogComment(id){
    return request({
        url: '/log/getLogComment',
        method: 'post',
        data: {id}
    })
}
