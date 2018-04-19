import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/buju.css"
import "./assets/css/iconfont.css"
import "./assets/scss/common.scss"
import "./style/style.css";
import "./style/animation.css";
import "./style/lrtk.css";
import { pageTo, timestampToTime } from './api/common.js'
Vue.prototype.pageTo = pageTo
Vue.prototype.timestampToTime = timestampToTime

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
