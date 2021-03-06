// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueBus from 'vue-bus'
import store from './store'
import ElementUI from 'element-ui'
import router from './router'
import App from './App'
import commom from '../static/js/commom'
import perfectScrollBar from 'perfect-scrollbar'

import '../mock/index'

//require('../static/js/swiper.min')
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../static/font-awesome/css/font-awesome.min.css'
import '../static/css/swiper.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

window.Vue=Vue
window.vueBus=new Vue()
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(ElementUI)
Vue.use(VueBus)
Vue.use(VueRouter, axios, commom)
Vue.prototype.$axios = axios
Vue.prototype.commom = commom
Vue.prototype.perfectScrollBar=perfectScrollBar

window.globalData={
   courseFormModal:{
     schoolCourseModel:'schoolCourseModel',
     thirdCourseModal:'thirdCourseModel',
   },
   courseType:{
     school:'本校课程',
     institution:'第三方课程'
   }
}

Vue.filter('dayTransform',function(val){
  if(val!==0&&!val){
    return
  }else{
    //var dayList=[{name:"星期一",value:1},{name:"星期二",value:2},{name:"星期三",value:3},{name:"星期四",value:4},{name:"星期五",value:5},{name:"星期六",value:6},{name:"星期天",value:7},]
    var dayList=[{name:"一",value:1},{name:"二",value:2},{name:"三",value:3},{name:"四",value:4},{name:"五",value:5},{name:"六",value:6},{name:"日",value:7},]
    var day=dayList.find(day=>{
      return day.value=val
    })
    if(day){
      return day.name
    }else{
      return
    }
  }
})
Vue.filter('TimeHM',function(val){
  if(val){
    try{
     return new Date(val).Format("h:m")
    }catch(ex){
     return val
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
