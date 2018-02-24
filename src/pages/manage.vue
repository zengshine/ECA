<template>
  <div class="content-wrapper managepage">
    <section class="left-part-nav">
      <div class="collapse-btn">
        <div class="collapse-icon-ct"></div>
      </div>
      <section class="logo">
        <div class="img-ct"></div>
        <br>
        <div class="name-ct">Element样例测试中心</div>
      </section>
      <section class="menu-ct">
        <div class="menu-item" :class="{'selected':curLeftNavPath===item.path}" v-for="item in leftMenuList" @click="onSelectLeftNavItem(item.path)">
          <div class="item-select-decorate"></div>
          <div class="item-icon-ct" :class="[item.iconClass]">
          </div>
          <div class="item-text-ct">{{item.name}}</div>
        </div>
      </section>
      <section class="page-tip-ct">
        <div class="manage-page-tips hidden">
          <span class="tips-close-btn">
            <i class="el-icon-error"></i>
          </span>
          <div class="page-tips-text">
            <span>温馨提示：<br> 您的账户资料审核期 即将到期，请于2017 年11月28日前重新提 交审核资料，以免影 响正常使用！
            </span>
          </div>
          <div class="page-tips-btn">
            <span>马上提交</span>
          </div>
        </div>
        <div class="page-version">
          <span>VERSION1.0</span>
        </div>
      </section>
    </section>
    <section class="right-part-content">
      <section class="left-right-inline-layout shadow-divider height-50 bg-white ps-rel pageHead">
        <div class="left-part"></div>
        <div class="right-part">
          <div class="right-part-item">
            <span>
              <i class="fa fa-search-plus"></i>
            </span>
          </div>
          <div class="right-part-item">
            <span>
              <i class="fa fa-commenting-o"></i>
            </span>
          </div>
          <div class="right-part-item">
            <span class="manage-bell-count">15</span>
            <span>
              <span>
                <i class="fa fa-bell-o"></i>
              </span>
            </span>
          </div>
          <div class="right-part-item user-info">
            <span>hello,Mrs C</span>
            <img src="../../static/images/avatars/avatar-1.jpg">
          </div>
          <div class="right-part-item">
            <span>
              <span>
                <i class="fa fa-sign-out"></i>
              </span>
            </span>
          </div>
        </div>
      </section>
       <router-view></router-view>
    </section>
  </div>
</template>

<style lang="scss" src="../../static/sass/main.scss">

</style>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      value: "",
      isNavFixed: false,
      leftMenuList: [
        { name: "工作窗口", iconClass: "workWindows",path:'' },
        { name: "师生管理", iconClass: "tsFiles",path:'/infoInput' },
        { name: "课程管理", iconClass: "courseManage",path:'/courseManage' },
        { name: "班级管理", iconClass: "classManage",path:'' },
        { name: "服务商店", iconClass: "serviceStore",path:'' }
      ],
      infoFormVisible: false,
      curLeftNavPath:'/infoInput'
    };
  },
  //Init Events&lifecycle ->
  beforeCreate() {},
  //Init injections&reactivity ->
  created() {},
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    //初始化数据
    (function() {
      vm.$axios
        .get("http://api/v1/data/typeList")
        .then(function(res) {
          console.log(res);
          vm.tableData = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    })();
    //初始化左侧菜单导航 lmps:left-menu-perfect-scrollbar
    const lmps = new vm.perfectScrollBar(".left-part-nav", {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
    //计算右侧内容框的宽度
    function calDomWH() {
      var pageW =
        document.body.clientWidth || document.documentElement.clientWidth;
      var pageH =
        document.body.clientHeight || document.documentElement.clientHeight;
      vm.tableHeight = pageH - (50 + 50 + 60 + 50 + 30) + "";
      var rightPartW = pageW - 250;
      document.querySelector(".managepage .right-part-content").style.width =
        rightPartW + "px";
      //document.querySelector(".left-part-nav").style.height=pageH+'px';
    }
    calDomWH();
    window.onresize = function() {
      calDomWH();
      lmps.update();
    };
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
  methods: {
    onSelectLeftNavItem(path){
      if(!path){
      return false;
     }
     var vm=this;
     vm.curLeftNavPath=path;
     vm.gotoAddress(path)
    },
    gotoAddress(path){
     var vm=this;
     vm.$router.push(path);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleMore() {},
    onSelectedTableRow(row, event) {},
    handleRowSelected() {}
  },
  watch: {},
  //computed
  computed: {}
};
</script>
