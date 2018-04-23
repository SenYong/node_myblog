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
          path: '/journalInfo',
          component: (resolve) => { require(['../view/journalInfo'], resolve)},
          meta: [3]
        },
        {
          path: '/say',
          component: (resolve) => { require(['../view/say'], resolve)},
          meta: [4]
        },
        {
          path: '/sayInfo',
          component: (resolve) => { require(['../view/sayInfo'], resolve)},
          meta: [4]
        },
        {
          path: '/board',
          component: (resolve) => { require(['../view/board'], resolve)},
          meta: [5]
        }
    ]
})

export default router
