import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/css/buju.css"
import "./assets/css/iconfont.css"
import "./assets/scss/common.scss"
import "./style/style.css";
import "./style/animation.css";
import "./style/lrtk.css";
import { emoji } from '@/common/emoji.js'
import { pageTo, timestampToTime } from './common/common.js'
Vue.use(ElementUI)
Vue.prototype.pageTo = pageTo
Vue.prototype.timestampToTime = timestampToTime
Vue.prototype.emoji = emoji

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