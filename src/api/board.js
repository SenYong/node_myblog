import request from '@/config/request.js'

//获取留言板评论
export function getBoardComment(){
    return request({
        url: '/board/getBoardComment',
        method: 'post'
    })
}

//用户评论
export function userComment(b_name, b_img, b_content){
    return request({
        url: '/board/userComment',
        method: 'post',
        data: {b_name, b_img, b_content}
    })
}