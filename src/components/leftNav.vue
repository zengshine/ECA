<template>
 <div class="left-nav-ct w-h-100">
       <div class="nav-logo" v-if="logoUrl">
         <img src="../../static/image/avatar.jpg" />
         <div class="nav-logo-name"><span>广州东山正培小学</span></div>
       </div>
        <div class="nav-item mt-20" :class="{'nav-item-selected':curLeftNavPath===item.path}" v-for="item in navlist" @click="onselectNavItem(item.path)">
          <div class="item-text-ct">{{item.name}}</div>
        </div>
 </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      curLeftNavPath:this.navPath,
      logoUrl:this.leftNavLogoUrl
    }
  },
  props:{
    navlist:{
      type:Array,
      default:[1,2,3]
    },
    navPath:String,
    leftNavLogoUrl:String
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    //vm.gotoAddress(leftNavLogoUrl)
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
    onselectNavItem(path){
     var vm=this;
      if(!path){
      return false;
     }
     vm.curLeftNavPath=path;
     vm.gotoAddress(path)
    },
    gotoAddress(path){
     var vm=this;
     vm.$router.push(path);
    }
  },
  //computed
  computed: { },
  watch: {
  },
  filter:{ }
}
</script>
