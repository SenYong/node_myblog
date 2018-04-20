import request from '@/config/request.js'

export function getArt(){
    return request({
        url: '/common/newArt',
        method: 'post'
    })
}

export function getLog(){
    return request({
        url: '/common/newLog',
        method: 'post'
    })
}

export function getSay(){
    return request({
        url: '/common/newSay',
        method: 'post'
    })
}

export function artRanking(){
    return request({
        url: '/common/artRanking',
        method: 'post'
    })
}

export function getInfo(){
    return request({
        url: '/common/getInfo',
        method: 'post'
    })
}

export function newArtComment(){
    return request({
        url: '/common/newArtComment',
        method: 'post'
    })
}

export function getSayImg(){
    return request({
        url: '/common/getSayImg',
        method: 'post'
    })
}