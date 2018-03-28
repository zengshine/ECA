import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../pages/index.vue'], resolve)
    },
    {
      path:'/course',
      name:'courseManage',
      component: resolve => require(['../pages/courseManage.vue'], resolve)
    }
  ]
})
