<template>
  <div class="view-container">
    <div class="h-50 f-w-b f-s-20">
      <div class="f-l ml-20">
        <span>本学期课程</span>
      </div>
      <div class="f-r mr-20 f-s-26">
        <span @click="addCourse($event)">
          <i class="fa fa-plus-circle"></i>
        </span>
      </div>
    </div>
    <div class="h-50 p-l-20">
      <span class="in-b mr-20 inline-filter-item" v-for="item in gradeList" :class="{'selected-blue':selectedGrade==item.name}" @click="selecteGrade(item)">{{item.name}}</span>
    </div>
    <div class="h-50 p-l-20">
      <span class="in-b mr-20 inline-filter-item" v-for="(item,index) in classTypes" :class="{'selected-blue':selectedType==item.name}" @click="selecteType(item)">{{item.name}}</span>
    </div>
    <div class="h-50 f-w-b f-s-20">
      <div class="f-l ml-20">
        <span class="scCourse-date-des">2018年9月3日——2018年9月13日</span>
      </div>
      <div class="f-r mr-20">
        <span>
          <i class="fa fa-ellipsis-h"></i>
        </span>
      </div>
    </div>
    <div class="scCourse-content-ct">
      <div class="class-item class-item-home" v-for="item in courseListWithFilter(selectedType)" @click="checkCourseInfo(item)">
        <div class="class-cover" :style="{backgroundImage:`url(${item.coverImg})`}">
          <div class="course-handler-ct">
            <div>
              <span class="course-handler-btn" @click="editCourse(item,$event)">
                <i class="fa fa-edit"></i>
              </span>
              <span class="course-handler-btn" @click="removeCourse(item,$event)">
                <i class="fa fa-trash"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="p-h-8">
          <div class="class-name">{{item.name}}</div>
          <div class="class-property">
            <div>
              <span class="" v-for="(itemg,index) in item.grades">{{itemg}}<span v-if="index!==item.grades.length-1">/</span></span>
              <span>年级</span>
              <span>|</span>
              <span class="">学时：{{item.numberOfLessons}}</span>
                <span>|</span>
              <span class="">学位：{{item.studentIds.length}}/{{item.maxNumberOfStudents}}</span>
            </div>
            <div>
              <span>周</span>
              <span v-for="(itemL,index) in item.lessonDays" class="">{{itemL|dayTransform}}<span v-if="index!==item.lessonDays.length-1">/</span></span>
               <span class="ml-10">{{item.lessonBeginTime|TimeHM}}</span>-<span class="">{{item.lessonEndTime|TimeHM}}</span>
            </div>
            <div>
              <span>授课教师：{{item.courseTeacher.realName}}</span>
            </div>
          </div>
          <div class="h-40 f-s-20">
            <div class="f-l f-w-b">
              <span class="scCourse-course-price">¥{{item.courseFee}}</span>
            </div>
            <div class="f-r">
              <span v-if="!item.enabled" class="scCourse-course-state-handle-btn" @click="setCourseSaleFlag(item,true,$event)">上架</span>
              <span v-if="item.enabled" class="scCourse-course-state-handle-btn bg-green" @click="setCourseSaleFlag(item,false,$event)">下架</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <div>
      <course-import :courseImportVisible.sync="stateObj.courseImportDialogVisible"></course-import>
      <sc-course-form :editCourseItem.sync="editCourseItem" :courseFormDialogTitle.sync="courseFormDialogTitle" :formModal="selectedType"></sc-course-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import courseImport from "../../components/courseImport";
import scCourseForm from "../../components/scCourseForm";
export default {
  components: {
    courseImport,
    scCourseForm
  },
  data() {
    return {
      loading: false,
      courseImportVisible: false,
      radio: "",
      scCourseInfoVisible: false,
      selectedGrade: "二年级",
      selectedType: globalData.courseType.institution,
      gradeList: [
        { name: "一年级", value: 1 },
        { name: "二年级", value: 2 },
        { name: "三年级", value: 3 },
        { name: "四年级", value: 4 },
        { name: "五年级", value: 5 },
        { name: "六年级", value: 6 },
        { name: "七年级", value: 7 },
        { name: "八年级", value: 8 },
        { name: "九年级", value: 9 }
      ],
      classTypes: [{ name: globalData.courseType.school }, { name: globalData.courseType.institution }],
      searchFilter: {
        conditions: [
          {
            operator: "EQUALS",
            property: "grade",
            value: [4]
          }
        ],
        connect: "AND",
        sort: {
          orders: [
            {
              direction: "ASC",
              property: "id"
            }
          ]
        }
      },
      courseList: [],
      selectedCourseItem: {},
      editCourseItem: {},
      courseFormDialogTitle: ""
    };
  },
  //Init Events&lifecycle ->
  beforeCreate() {},
  //Init injections&reactivity ->
  created() {},
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    vueBus.$on('loadScCourse',function(){
      vm.loadCourse()
    })
    vm.loadCourse();
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
    selecteGrade(grade) {
      var vm = this;
      vm.selectedGrade = grade.name;
      vm.setFilter("grade", grade.value);
    },
    setFilter(property, value) {
      var vm = this;
      var condition = vm.searchFilter.conditions.find(condition => {
        return condition.property == property;
      });
      if (condition) {
        condition.value = value;
      }
      vm.loadCourse();
    },
    selecteType(type) {
      var vm = this;
      vm.selectedType = type.name;
    },
    showCourseImportDialog() {
      var vm = this;
      vm.stateObj.courseImportDialogVisible = true;
    },
    setCourseSaleFlag(course, flag, evt) {
      var vm = this;
      var params = JSON.parse(JSON.stringify(course));
      params.enabled = flag;
      vm.$axios
        .put(vm.requestUrl.updateCourse, params)
        .then(res => {
          course.enabled = flag;
          vm.notifyTR("success", flag ? "成功上架课程" : "成功下架课程");
          vm.loading = false;
        })
        .catch(function(err) {
          vm.loading = false;
          console.log(`loadCourse:${err}`);
        });
    },
    loadCourse: function() {
      var vm = this;
      vm.loading = true;
      vm.$axios
        .post(vm.requestUrl.queryCourse, vm.searchFilter)
        .then(res => {
          vm.courseList = res.data;
          vm.loading = false;
        })
        .catch(function(err) {
          vm.loading = false;
          console.log(`loadCourse:${err}`);
        });
    },
    removeCourseFromLocalList: function(item) {
      var vm = this;
      var itemIndex = vm.courseList.indexOf(item);
      vm.courseList.splice(itemIndex, 1);
    },
    checkCourseInfo(item) {
      var vm = this;
      vm.scCourseInfoVisible = true;
      vm.selectedCourseItem = item;
    },
    editCourse: function(course, evt) {
      var vm = this;
      evt.stopPropagation();
      vm.editCourseItem = Vue.util.extend(
        {},
        JSON.parse(JSON.stringify(course))
      );
      vm.$nextTick(function() {
        vm.courseFormDialogTitle = "课程编辑";
        vm.stateObj.scCourseImportDialogVisible = true;
      });
    },
    addCourse: function(evt) {
      var vm = this;
      evt.stopPropagation();
      vm.stateObj.scCourseImportDialogVisible = true;
      vm.courseFormDialogTitle = "新增课程";
    },
    removeCourse(course, evt) {
      var vm = this;
      evt.stopPropagation();
      vm.$axios
        .delete(vm.requestUrl.removeCourse, {
          data: { id: course.id }
        })
        .then(res => {
          vm.notifyTR("成功删除课程", "success");
          vm.removeCourseFromLocalList(arguments[0]);
        })
        .catch(function(err) {
          vm.notifyTR("删除课程失败,请检查网络是否连通", "error");
          console.log(err);
        });
    }
  },
  //computed
  computed: {
    ...mapState(["stateObj", "requestUrl"]),
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
  },
  watch: {
    searchFilter: {
      handler: function() {
        var vm = this;
        vm.loadCourse();
      },
      deep: true
    }
  },
  filter: {}
};
</script>
