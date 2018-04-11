<template>
  <div class="content-wrapper" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
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
        <span>
          <i class="fa fa-caret-down"></i>
        </span>
      </div>
    </div>
    <div class="class-filter eca-content-section">
      <div class="filter-item">
        <span class="filter-category">学段：</span>
        <span class="category-name" v-for="item in eduStageList" :class="{'class-filter-selected':(item==searchFilter.area)}" @click="selectSearchFilter('area',item)">{{item}}</span>
      </div>
      <div class="filter-item">
        <span class="filter-category">年级：</span>
        <span class="category-name" v-for="item in gradeList(searchFilter.area)" :class="{'class-filter-selected':(item.value==searchFilter.grade)}" @click="selectSearchFilter('grade',item.value)">{{item.name}}</span>
      </div>
      <div class="course-add-btn" @click="addCourse($event)">
        <i class="fa fa-plus-circle"></i>
      </div>
    </div>
    <div class="class-list">
      <div class="class-list-ct eca-content-section">
        <div class="class-item class-item-home" v-for="item in courseList" @click="checkCourseInfo(item)">
          <div class="class-cover" :style="{backgroundImage:`url(${item.coverImg})`}">
            <div class="course-handler-ct">
              <div>
                <span class="course-handler-btn" @click="editCourse(item,$event)">
                  <i class="fa fa-edit"></i>
                </span>
                <span class="course-handler-btn" @click="deleteCourse(item,$event)">
                  <i class="fa fa-trash"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="p-h-8">
          <div class="class-name">{{item.name}}</div>
          <div class="class-property">
            <span class="pro-level">{{item.degreeOfDifficulty}}</span>
            <span class="pro-member-count">
              <i class="fa fa-user"></i>{{item.numberOfStudentsFromPastToNow}}</span>
          </div>
          <div class="member-des home-course-des">{{item.introduction}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框容器 -->
    <div>
     <course-info :checkedCourseItem="selectedCourseItem"></course-info>
      <course-form :editCourseItem.sync="editCourseItem" :courseFormDialogTitle.sync="courseFormDialogTitle"></course-form>
      <course-import></course-import>
    </div>
  </div>
</template>

<style lang="scss" src="../../static/sass/main.scss">

</style>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import courseImport from '../components/courseImport'
import courseInfo from '../components/courseInfo'
import courseForm from '../components/courseForm'
export default {
  components: {
    courseImport,
    courseInfo,
    courseForm
  },
  data() {
    return{
      loading: false,
      courseList: [],
      courseFormDialogTitle:"",
      eduStageList: ["小学", "初中", "高中"],
      searchFilter: {
        area: "小学",
        grade: 1
      },
      gradeListOrigin: [
        { value: 1, name: "一年级" },
        { value: 2, name: "二年级" },
        { value: 3, name: "三年级" },
        { value: 4, name: "四年级" },
        { value: 5, name: "五年级" },
        { value: 6, name: "六年级" },
        { value: 7, name: "初一" },
        { value: 8, name: "初二" },
        { value: 9, name: "初三" },
        { value: 10, name: "高一" },
        { value: 11, name: "高二" },
        { value: 12, name: "高三" }
      ],
      selectedCourseItem:{},
      editCourseItem:{}
    }
  },
  //Init Events&lifecycle ->
  beforeCreate() {},
  //Init injections&reactivity ->
  created() {
    var vm = this;
  },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    function calDomWH() {
      vm.commom.calDomHeight(
        ".class-list",
        0,
        ".content-wrapper",
        ".eca-header",
        ".class-filter"
      );
    }
    vm.loadCourse();
    calDomWH();
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
    notifyTR: function() {
      this.$notify({
        title: "提示",
        message: arguments[0],
        position: "top-right",
        type: arguments[1]
      });
    },
    selectSearchFilter: function(type, value) {
      var vm = this;
      vm.searchFilter[type] = value;
      switch (value) {
        case "小学":
          vm.searchFilter["grade"] = 1;
          break;
        case "初中":
          vm.searchFilter["grade"] = 7;
          break;
        case "高中":
          vm.searchFilter["grade"] = 10;
          break;
      }
      vm.loadCourse();
    },
    removeCourseFromLocalList: function (item) {
      var vm = this;
      var itemIndex = vm.courseList.indexOf(item);
      vm.courseList.splice(itemIndex, 1);
    },
    checkCourseInfo(item) {
      var vm = this
      vm.selectedCourseItem = item
      vm.stateObj.courseInfoDialogVisible = true
    },
    addCourse: function(evt) {
      var vm = this;
      evt.stopPropagation()
      vm.stateObj.courseFormDialogVisible = true;
      vm.courseFormDialogTitle = "新增课程";
    },
    editCourse: function(course,evt) {
      var vm = this;
      evt.stopPropagation()
      vm.editCourseItem = Vue.util.extend({}, JSON.parse(JSON.stringify(course)));
      vm.courseFormDialogTitle = "课程编辑";
      vm.stateObj.courseFormDialogVisible = true;
    },
    deleteCourse: function() {
      var vm = this;
      var id = arguments[0].id;
      arguments[1].stopPropagation();
      vm.$axios
        .delete(vm.requestUrl.removeCourseTemplate, {
          data: { id: id }
        })
        .then(res => {
          vm.notifyTR("成功删除课程", "success");
          vm.removeCourseFromLocalList(arguments[0]);
        })
        .catch(function(err) {
          vm.notifyTR("删除课程失败,请检查网络是否连通", "error");
          console.log(err);
        });
    },
    loadCourse: function() {
      var vm = this;
      vm.loading = true;
      vm.$axios
        .post(vm.requestUrl.queryCourseTemplateByFilter, vm.searchFilter)
        .then(res => {
          vm.courseList = res.data;
          vm.loading = false;
        })
        .catch(function(err) {
          vm.loading = false;
          console.log(`loadCourse:${err}`);
        });
    }
  },
  watch: {},
  //computed
  computed: {
    ...mapState([
      'stateObj','requestUrl'
    ]),
    gradeList: function() {
      var vm = this;
      return function(area) {
        var min = 1,
          max = 6;
        var period = area;
        switch (period) {
          case "小学":
            min = 1;
            max = 6;
            break;
          case "初中":
            min = 7;
            max = 9;
            break;
          case "高中":
            min = 10;
            max = 12;
            break;
        }
        return vm.gradeListOrigin.filter(function(item) {
          return item.value >= min && item.value <= max;
        });
      };
    }
  }
};
</script>
