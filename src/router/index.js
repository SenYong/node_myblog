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
        },
        {
          path: '/abouts',
          component: (resolve) => { require(['../view/abouts'], resolve)},
          meta: [1]
        },
        {
          path: '/article',
          component: (resolve) => { require(['../view/article'], resolve)},
          meta: [2]
        },
        {
          path: '/artInfo',
          component: (resolve) => { require(['../view/artInfo'], resolve)},
          meta: [2]
        },
        {
          path: '/journal',
          component: (resolve) => { require(['../view/journal'], resolve)},
          meta: [3]
        },
        {
          path: '/say',
          component: (resolve) => { require(['../view/say'], resolve)},
          meta: [4]
        }
    ]
})

export default router
