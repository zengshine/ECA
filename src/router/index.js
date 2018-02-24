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
    {
      path: '/register',//登陆注册
      name: 'login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
      path: '/manage',//后台管理
      name: 'manage',
      component: resolve => require(['../pages/manage.vue'], resolve),
      children: [
        {
          path: '/infoInput', //信息录入
          component: resolve => require(['../pages/manage/infoInput.vue'], resolve),
        },
        {
          path: '/courseManage', //课程管理
          component: resolve => require(['../pages/manage/courseM.vue'], resolve),
        }
      ]
    }
  ]
})
