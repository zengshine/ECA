<template>
  <div class="">
    <el-dialog @close="" class="eca-dialog-header" v-if="stateObj.courseImportDialogVisible" title="课程导入" :visible.sync="stateObj.courseImportDialogVisible" width="1025px">
      <div class="dialog-body dialog-body-750 f-clear">
        <div class="">
          <div class="h-50 p-l-20">
            <span class="in-b mr-20 inline-filter-item" v-for="item in gradeList" :class="{'selected-blue':selectedGrade==item.name}" @click="selecteGrade(item)">{{item.name}}</span>
          </div>
          <div class="h-50 p-l-20">
            <span class="in-b mr-20 inline-filter-item" v-for="(item,index) in classTypes" :class="{'selected-blue':selectedType==item.name}" @click="selecteType(item)">{{item.name}}</span>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="stateObj.courseImportDialogVisible = false">取 消</el-button>
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
      gradeList: [{ name: "一年级" }, { name: "二年级" }, { name: "三年级" }, { name: "四年级" }, { name: "五年级" }, { name: "六年级" }, { name: "七年级" }, { name: "八年级" }, { name: "九年级" },],
      classTypes: [{ name: "本校课程" }, { name: "第三方课程" }],
      searchFilter: {
        area: "小学",
        grade: 1
      },
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
    selectSingleCourse(course,evt){
      var vm=this
      evt.stopPropagation()
      vm.selectedCourse=JSON.parse(JSON.stringify(course))
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
      vueBus.$emit('importCourseSelected',vm.selectedCourse)
      vm.selectCourse={}
      vm.stateObj.courseImportDialogVisible=false
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
  },
  watch: {
  },
  filter: {}
}
</script>
