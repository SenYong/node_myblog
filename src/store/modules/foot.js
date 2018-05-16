import {newArtComment, getSayImg} from '@/api/common'

const foot = {
    state: {
       newArt: [],
       sayImg: []
    },
    mutations: {
        SET_ARTCOMMENT: (state, newArt) => {
            state.newArt = newArt
        },
        SET_IMG: (state, sayImg) => {
            state.sayImg = sayImg
        }
    },
    actions: {
        getArtComment({commit}){
            return new Promise((resolve, reject) => {
               newArtComment().then(res => {
                  if(res.code == 0){
                     commit('SET_ARTCOMMENT', res.data);
                  }
                  resolve();
               }).catch(err => {
                  reject(err);
               }) 
            })
        },
        getsayImg({commit}){
            return new Promise((resolve, reject) => {
                console.log(res)
                getSayImg().then(res => {
                    if(res.code == 0){
                       commit('SET_IMG', res.data);
                    }
                }).catch(err => {
                    reject(err);
                })
            })
        }
    } 
}


export default foot