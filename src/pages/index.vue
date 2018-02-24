<template>
  <div class="content-wrapper">
  <div class="eca-header f-clear">
    <div class="eca-title ml-30">
      <div class="eca-logo">
      </div>
      <div>
        <span class="eca-name-cn">第二课堂课池</span>
        <br>
        <span class="eca-name-en">Secondsuga</span>
      </div>
    </div>
    <div class="eca-location f-r mr-30">
      <span class="city-name mr-15">珠海市</span>
      <span><i class="fa fa-caret-down"></i></span>
    </div>
  </div>
  <div class="class-filter eca-content-section">
   <div class="filter-item">
     <span class="filter-category">学段：</span>
     <span class="category-name" v-for="item in eduStageList" :class="{'class-filter-selected':(item=='小学'||item=='三年级')}">{{item}}</span>
   </div>
      <div class="filter-item">
     <span class="filter-category">学段：</span>
     <span class="category-name" v-for="item in gradeList" :class="{'class-filter-selected':(item=='小学'||item=='三年级')}">{{item}}</span>
   </div>
  </div>
  <div class="class-list">
    <div class="class-list-ct eca-content-section">
      <div class="class-item" v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,12,14,15]">
        <div class="class-cover"></div>
        <div class="class-name">一年级跆拳道基础课程</div>
        <div class="class-property">
          <span class="pro-level">初级</span>
          <span class="pro-member-count"><i class="fa fa-user"></i>188</span>
        </div>
        <div class="member-des">跆拳道基本功练习，脚部韧性训练，耐力训练</div>
      </div>
    </div>
  </div>
  </div>
</template>

<style>

</style>
<style lang="scss" src="../../static/sass/main.scss">

</style>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
     eduStageList:['小学','初中','高中'],
     gradeList:['一年级','二年级','三年级','四年级','五年级','六年级']
    }
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    // var endPointSwiper = new Swiper('.swiper-container', {
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true,
    //   paginationBulletRender: function(swiper, index, className) {
    //     return '<span class="' + className + '">' + (index + 1) + '</span>';
    //   }
    // });
    // var feedBackSwiper = new Swiper('#clientFeedbackSwiper', {
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true
    // });
    function calDomWH(){
      vm.commom.calDomHeight(
        ".class-list",
        0,
        ".content-wrapper",
        ".eca-header",
        ".class-filter"
      )
    }
    calDomWH()
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

  },
  watch: {

  },
  //computed
  computed: {

  }
}
</script>
