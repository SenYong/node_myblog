import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "./assets/css/buju.css"
import "./assets/css/iconfont.css"
import "./assets/scss/common.scss"
import "./style/style.css";
import "./style/animation.css";
import "./style/lrtk.css";
import { pageTo, timestampToTime } from './common/common.js'
Vue.prototype.pageTo = pageTo
Vue.prototype.timestampToTime = timestampToTime

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



/*
vue 获取:
this.$store.state.xxx
this.$store.dispatch
this.$store.commit
 */