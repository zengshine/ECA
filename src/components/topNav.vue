<template>
            <!-- 顶部导航 -->
      <nav id="topNavBar" :class="{'index-nav-fixed':isNavFixed}">
        <div class="logo"></div>
        <div class="section-nav">
          <ul @click="onSelectTab($event)">
            <router-link data-linkID="homeID" :to="{path:'/'}" tag="li">首页</router-link>
            <li data-linkID="productID">产品</li>
            <li data-linkID="featureID">功能</li>
            <li data-linkID="priceID">定价</li>
            <li data-linkID="FAQID">FAQ</li>
            <li class="divider">
              <span></span>
            </li>
            <!-- <li>登陆</li> -->
            <router-link :to="{path:'/register/'}" tag="li">登陆</router-link>
          </ul>
        </div>
      </nav>
</template>

<script>
export default {
  name: 'topNav',
  data() {
    return {
      isNavFixed: false,

    }
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    window.addEventListener('scroll', vm.commom.throttle(scrollCallBack, 0, 0), false);
    function scrollCallBack(evt) {
      document.body.scrollTop > 20 ? vm.isNavFixed = true : vm.isNavFixed = false;
    }
  },
  //when data changes
  beforeUpdate() { },
  //Virtual DOM re-render and patch
  updated() { },
  //when vm.$destroy() is called
  beforeDestroy() { },
  //Teardown watchers,child components and event listenrs
  destroyed() { },
  //method
  methods: {
   onSelectTab(evt){
    var linkID=evt.target.dataset.linkid;
    if(linkID){
      var offsettop=document.querySelector(`#${linkID}`).offsetTop;
      var navBarH=document.querySelector("#topNavBar").offsetHeight;
      document.body.scrollTop=offsettop-navBarH;
    }
   },
   scrollAnimate(offset,cur){

   }
  },
  watch: {

  },
  //computed
  computed: {

  }
}
</script>
