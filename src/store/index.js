import Vue from 'vue'
import Vuex from 'vuex'
import right from './modules/right'
import foot from './modules/foot'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    right,
    foot
  },
  getters
})


export default store