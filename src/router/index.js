import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../pages/index.vue'], resolve),
      children:[
        {
          path:'/enrollment',
          name:'enrollment',
          component:resolve=>require(['../pages/index/enrollment.vue'],resolve)
        },
        {
          path:'/course',
          name:'course',
          component:resolve=>require(['../pages/index/course.vue'],resolve)
        },
        {
          path:'/user',
          name:'user',
          component:resolve=>require(['../pages/index/user.vue'],resolve)
        }
      ]
    },
    {
      path:'/coursepool',
      name:'coursePool',
      component: resolve => require(['../pages/coursePool.vue'], resolve)
    }
  ]
})
