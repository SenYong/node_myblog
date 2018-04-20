import { getArt, getLog, getSay, artRanking, getInfo} from '@/api/common'

const right = {
    state: {
        art: [],
        log: [],
        say: [],
        rank: [],
        info: {}
    },
    mutations: {
        SET_ART: (state, art) => {
            state.art = art;
        },
        SET_LOG: (state, log) => {
            state.log = log;
        },
        SET_SAY: (state, say) => {
            state.say = say;
        },
        SET_RANK: (state, rank) => {
            state.rank = rank;
        },
        SET_INFO: (state, info) => {
            state.info = info;
        }
    },

    actions: {
        newArt({commit}){
           return new Promise((resolve, reject) => {
              getArt().then(res => {
                 if(res.code == 0){
                    commit('SET_ART', res.data);
                 }
                 resolve();
              }).catch(error => {
                 reject(error);
              })
           }) 
        },

        newLog({commit}){
            return new Promise((resolve, reject) => {
                getLog().then(res => {
                    if(res.code == 0){
                        commit('SET_LOG', res.data);
                    }
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },

        newSay({commit}){
            return new Promise((resolve, reject) => {
                getSay().then(res => {
                    if(res.code == 0){
                        commit('SET_SAY', res.data);
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },

        rank({commit}){
            return new Promise((resolve, reject) => {
               artRanking().then(res => {
                  if(res.code == 0){
                      commit('SET_RANK', res.data);
                  }
                  resolve();
               }).catch(error => {
                  reject(error);
               }) 
            })
        },

        getinfo({commit}){
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    if(res.code == 0){
                       commit('SET_INFO', res.data[0]) 
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default right