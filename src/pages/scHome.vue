

<template>
  <div class="content-wrapper" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="eca-header f-clear">
      <div class="eca-title ml-30">
        <div class="eca-logo">
        </div>
        <div>
          <span class="eca-name-cn">第二课堂</span>
          <br>
          <span class="eca-name-en">SecondSugar</span>
        </div>
      </div>
      <div class="eca-location f-r mr-30">
        <div class="user-profile-pic"></div>
        <span>李老师</span>
        <span>
          <i class="fa fa-caret-down"></i>
        </span>
      </div>
    </div>
    <div class="index-body">
      <div class="index-left-nav">
        <left-nav :navlist="leftMenuList" nav-path="/scData" leftNavLogoUrl="leftNavLogoUrl"></left-nav>
      </div>
      <div class="index-Content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import leftNav from "../components/leftNav";

export default {
  components: {
    leftNav
  },
  data() {
    return {
      loading: false,
      leftMenuList: [
        { name: "数据窗口", iconClass: "workWindows", path: "/scData" },
        { name: "课程管理", iconClass: "tsFiles", path: "/scCourse" },
        { name: "课库管理", iconClass: "courseManage", path: "/scSemester"},
      ],
      leftNavLogoUrl:""
    };
  },
  //Init Events&lifecycle ->
  beforeCreate() {},
  //Init injections&reactivity ->
  created() {},
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    vm.$router.push(vm.leftMenuList[0].path);
  },
  //when data changes
  beforeUpdate() {},
  //Virtual DOM re-render and patch
  updated() {},
  //when vm.$destroy() is called
  beforeDestroy() {},
  //Teardown watchers,child components and event listenrs
  destroyed() {},
  //method
  methods: {},
  watch: {},
  //computed
  computed: {}
};
</script>
