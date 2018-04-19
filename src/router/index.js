import Vue from "vue"
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
          path: '/',
          component: (resolve) => { require(['../view/index'], resolve) },
          meta: [0]
        },
        {
          path: '/index',
          component: (resolve) => { require(['../view/index'], resolve) },
          meta: [0]
        }
    ]
})

export default router
