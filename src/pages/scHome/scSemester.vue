<template>
  <div class="view-container">
    <div class="h-50 f-w-b f-s-20">
      <div class="f-l ml-20">
        <span>课程库</span>
      </div>
      <div class="f-r mr-20 f-s-26">
        <!-- 新增模板 -->
        <span v-if="selectedType!=='第三方课程'" @click="addCourse">
          <i class="fa fa-plus-circle"></i>
        </span>
        <!-- 第三方导入模板 -->
        <span v-if="selectedType=='第三方课程'" @click="importCourse">
          <i class="fa fa-plus-circle"></i>
        </span>
      </div>
    </div>
    <div class="h-50 p-l-20">
      <span class="in-b mr-20 inline-filter-item" v-for="item in filterGradeList" :class="{'selected-blue':selectedGrade==item.name}" @click="selecteGrade(item)">{{item.name}}</span>
    </div>
    <div class="h-50 p-l-20">
      <span class="in-b mr-20 inline-filter-item" v-for="(item,index) in classTypes" :class="{'selected-blue':selectedType==item.name}" @click="selecteType(item)">{{item.name}}</span>
    </div>
    <div class="scSemester-content-ct">
        <div class="class-item class-item-home" v-for="item in courseListWithFilter(selectedType)" @click="checkCourseInfo(item)">
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
            <div class="class-name p-h-8">{{item.name}}</div>
          <div class="class-property">
            <span class="pro-level">{{item.degreeOfDifficulty}}</span>
            <span class="pro-member-count">
              <i class="fa fa-user"></i>{{item.numberOfStudentsFromPastToNow}}</span>
          </div>
          <div class="member-des home-course-des">{{item.introduction}}</div>
          </div>
        </div>
    </div>
        <!-- 模态框容器 -->
    <div>
      <course-info :checkedCourseItem="selectedCourseItem"></course-info>
      <course-form :editCourseItem.sync="editCourseItem" :courseFormDialogTitle.sync="courseFormDialogTitle" formModel="importModel"></course-form>
       <course-import :courseImportVisible.sync="stateObj.courseImportDialogVisible"></course-import>
      <course-template-import></course-template-import>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import courseTemplateImport from '../../components/courseTemplateImport'
import courseImport from '../../components/courseImport'
import courseInfo from '../../components/courseInfo'
import courseForm from '../../components/courseForm'
import Swiper from "swiper"
export default {
  components: {
    courseTemplateImport,
    courseImport,
    courseInfo,
    courseForm
  },
  data() {
    return {
      loading: false,
      radio: "",
      selectedGrade: '二年级',
      selectedType: '第三方课程',
      filterGradeList: [{ name: "一年级" }, { name: "二年级" }, { name: "三年级" }, { name: "四年级" }, { name: "五年级" }, { name: "六年级" }, { name: "七年级" }, { name: "八年级" }, { name: "九年级" },],
      classTypes: [{ name: "本校课程" }, { name: "第三方课程" }],
      searchFilter: {
        area: "小学",
        grade: 1
      },
      courseList: [],
      selectedCourseItem:{},
      editCourseItem:{},
      courseFormDialogTitle:"",
    }
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this
    vueBus.$on('importCourseTemplateSuccess',function(){
      vm.loadCourse()
    })
    vm.loadCourse()
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
    selecteGrade(grade) {
      var vm = this
      vm.selectedGrade = grade.name
    },
    selecteType(type) {
      var vm = this
      vm.selectedType = type.name
    },
    notifyTR: function() {
      this.$notify({
        title: "提示",
        message: arguments[0],
        position: "top-right",
        type: arguments[1]
      });
    },
    importCourse(){
      var vm=this
      vm.stateObj.courseTemplateImportDialogVisible=true
    },
    checkCourseInfo(item) {
      var vm = this
      vm.selectedCourseItem = item
      vm.stateObj.courseInfoDialogVisible = true
    },
    removeCourseFromLocalList: function (item) {
      var vm = this;
      var itemIndex = vm.courseList.indexOf(item);
      vm.courseList.splice(itemIndex, 1);
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
    loadCourse: function () {
      var vm = this;
      vm.loading = true;
      vm.$axios
        .post(vm.requestUrl.queryCourseTemplateByFilter, vm.searchFilter)
        .then(res => {
          vm.courseList = res.data;
          vm.loading = false;
        })
        .catch(function (err) {
          vm.loading = false;
          console.log(`loadCourse:${err}`);
        });
    },
  },
  //computed
   computed: {
    ...mapState(['stateObj','requestUrl']),
    courseListWithFilter:function(type){
      var vm=this
      return function(type){
        if(type=='第三方课程'){
          return vm.courseList.filter((course)=>{
          return course.sourceId!=null
          })
        }else{
        return vm.courseList.filter((course)=>{
          return course.sourceId==null
          })
      }
      }
    },
    gradeList: function() {
      var vm = this
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
  },
  watch: {},
  filter: {}
}
</script>
