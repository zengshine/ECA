<template>
  <div class="">
    <el-dialog @close="" class="eca-dialog-header" v-if="stateObj.courseTemplateImportDialogVisible" title="课程导入" :visible.sync="stateObj.courseTemplateImportDialogVisible" width="1025px">
      <div class="dialog-body dialog-body-750 f-clear">

    <div class="">
      <div class="h-50 p-l-20">
        <span class="filter-category">学段：</span>
        <span class="in-b mr-20 inline-filter-item" v-for="item in eduStageList" :class="{'class-filter-selected':(item==searchFilter.area)}" @click="selectSearchFilter('area',item)">{{item}}</span>
      </div>
      <div class="h-50 p-l-20">
        <span class="filter-category">年级：</span>
        <span class="in-b mr-20 inline-filter-item" v-for="item in gradeList(searchFilter.area)" :class="{'class-filter-selected':(item.value==searchFilter.grade)}" @click="selectSearchFilter('grade',item.value)">{{item.name}}</span>
      </div>
    </div>
        <div class="import-course-list-ct p-h-20">
        <div class="class-item class-item-home" v-for="item in courseList">
          <div class="class-cover" :style="{backgroundImage:`url(${item.coverImg})`}">
            <div class="course-handler-ct">
              <div>
                <!-- <span class="course-handler-btn" @click="editCourse(item,$event)">
                  <i class="fa fa-edit"></i>
                </span>
                <span class="course-handler-btn" @click="deleteCourse(item,$event)">
                  <i class="fa fa-trash"></i>
                </span> -->
                <!-- <span v-if="!selectedCourseList.indexOf(item.id)" class="course-selected-btn" @click="selectedCourse(item,$event)">
                  <i class="fa fa-check-circle"></i>
                </span> -->
              </div>
              <div>
              </div>
            </div>
             <span :class="{'selected-green':selectedCourse.id==item.id}" class="course-selected-flag" @click="selectSingleCourse(item,$event)">
                  <i class="fa fa-check-circle"></i>
             </span>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="stateObj.courseTemplateImportDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="importCourse()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      selectedGrade: '二年级',
      selectedType: 1,
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
      courseList: [],
      selectedCourseList:[],
      selectedCourse:{}
    }
  },
  props: {

  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    vm.loadCourse();
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
    selecteGrade(grade) {
      var vm = this
      vm.selectedGrade = grade.name
    },
    selecteType(type) {
      var vm = this
      vm.selectedType = type.name
    },
        notifyTR: function () {
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
    selectSingleCourse(course,evt){
      var vm=this
      evt.stopPropagation()
      vm.selectedCourse=JSON.parse(JSON.stringify(course))
      vm.selectedCourse.sourceId=course.id
      vm.selectedCourse.schoolId=course.id
    },
    selectCourse(course,evt){
      var vm=this
      evt.stopPropagation()
      if(vm.selectedCourseList.indexOf(course.id)<=-1){
       vm.selectedCourseList.push(course.id)
      }else{
       vm.selectedCourseList.splice(vm.selectedCourseList.indexOf(course.id),1)
      }
    },
    importCourse(){
      var vm=this
       vm.$axios.post(vm.requestUrl.addCourseTemplate, vm.selectedCourse)
          .then(res => {
            vm.notifyTR("课程导入成功", "success");
            vueBus.$emit('importCourseTemplateSuccess')
            vm.stateObj.courseTemplateImportDialogVisible=false
          })
          .catch(function (err) {
            vm.notifyTR("课程保存失败,请检查网络是否连通", "error");
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
  },
  watch: {
  },
  filter: {}
}
</script>
