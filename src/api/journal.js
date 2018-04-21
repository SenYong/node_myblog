import request from '@/config/request'

export function getLogList(page, num){
    return request({
        url: '/log/getLogList',
        method: 'post',
        data: {page, num}
    })
}