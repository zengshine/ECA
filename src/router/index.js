import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',//首页介绍
      name: 'home',
      component: resolve => require(['../pages/index.vue'], resolve)
    },
  ]
})
