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
      <div class="class-item class-item-home" v-for="item in courseList" @click="checkCourseInfo(item)">
        <div class="class-cover" :style="{backgroundImage:`url(${item.coverImg})`}">
          <div class="course-handler-ct">
            <div>
              <span class="course-handler-btn" @click="editCourse(item,$event)">
                <i class="fa fa-edit"></i>
              </span>
              <!-- <span class="course-handler-btn" @click="addCourse($event)">
                <i class="fa fa-trash"></i>
              </span> -->
            </div>
          </div>
        </div>
        <div class="p-h-5">
          <div class="class-name">{{item.name}}</div>
          <div class="class-property">
            <div>
              <span class="pro-level">{{item.degreeOfDifficulty}}</span>
              <span class="pro-member-count">
                <i class="fa fa-user"></i>
                {{item.numberOfStudentsFromPastToNow}}
              </span>
              <span class="ml-10">周一 16:00-17:00</span>
            </div>
            <div>
              <span>授课教师：张轩</span>
            </div>
          </div>
          <div class="h-40 f-s-20">
            <div class="f-l f-w-b">
              <span class="scCourse-course-price">¥500</span>
            </div>
            <div class="f-r">
              <span class="scCourse-course-state-handle-btn">下架</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <div>
      <course-import :courseImportVisible.sync="stateObj.courseImportDialogVisible"></course-import>
      <sc-course-form :editCourseItem.sync="editCourseItem" :courseFormDialogTitle.sync="courseFormDialogTitle"></sc-course-form>
      <el-dialog @close="" class="eca-dialog-header" v-if="scCourseInfoVisible" title="课程信息" :visible.sync="scCourseInfoVisible" width="1025px">
        <div class="dialog-body sc-course-info-dialog-body f-clear p-vh-20">
          <div class="p-v-30">
            <div class="f-clear">
              <div class="f-l">
                <div class="sc-course-info-cover-ct mr-15" :style="{backgroundImage:`url(${selectedCourseItem.coverImg})`}">

                </div>
              </div>

              <div class="f-l">
                <div>
                  <div class="f-w-b f-s-18 h-30">
                    <span class="mr-15">本校课程1</span>
                    <span>
                      <i class="fa fa-edit"></i>
                    </span>
                  </div>
                  <div>一年级 | 学时15 | 学位</div>
                  <div>周一至周五 16:00-17:00</div>
                  <div>上课时间：9月15|上课地点：教学楼A栋</div>
                </div>
              </div>
            </div>
            <div class="h-40 f-s- f-clear">
              <div class="f-l f-w-b f-s-18">
                <span>课程费用：</span>
                <span class="scCourse-course-price">¥500</span>
              </div>
              <div class="f-r">
                <span class="scCourse-course-state-handle-btn">下架</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <table class="enrollment-table w-p-100">
                <tr class="thead">
                  <th class="w-p-10">
                    <el-checkbox v-model="radio" label="2">姓名</el-checkbox>
                  </th>
                  <th class="w-p-10">
                    <span class="mr-5">性别</span>
                    <i class="fa fa-caret-down"></i>
                  </th>
                  <th class="w-p-10">班级</th>
                  <th class="w-p-50">电话</th>
                  <th class="w-p-10">
                    <i class="el-icon-more-outline"></i>
                  </th>
                </tr>
                <tr class="tbody" v-for="itme in [1,2,3,4,5,6,7]">
                  <td style="">
                    <el-checkbox v-model="radio" label="2">李欣欣</el-checkbox>
                  </td>
                  <td>女生</td>
                  <td>一年（3）班</td>
                  <td>13885678988</td>
                  <td>
                    <i class="el-icon-more-outline"></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCourseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="">录 入</el-button>
          <el-button type="primary" @click="">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import courseImport from '../../components/courseImport'
import scCourseForm from '../../components/scCourseForm'
export default {
  components: {
   courseImport,
   scCourseForm,
  },
  data() {
    return {
      loading: false,
      courseImportVisible:false,
      radio: "",
      scCourseInfoVisible: false,
      selectedGrade: '二年级',
      selectedType: '第三方课程',
      gradeList: [{ name: "一年级" }, { name: "二年级" }, { name: "三年级" }, { name: "四年级" }, { name: "五年级" }, { name: "六年级" }, { name: "七年级" }, { name: "八年级" }, { name: "九年级" },],
      classTypes: [{ name: "本校课程" }, { name: "第三方课程" }],
      searchFilter: {
        area: "小学",
        grade: 1
      },
      courseList: [],
      selectedCourseItem: {},
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
    showCourseImportDialog(){
      var vm=this
      vm.stateObj.courseImportDialogVisible=true
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
    checkCourseInfo(item) {
      var vm = this
      vm.scCourseInfoVisible = true
      vm.selectedCourseItem = item
    },
    editCourse: function(course,evt) {
      var vm = this;
      evt.stopPropagation()
      vm.editCourseItem = Vue.util.extend({}, JSON.parse(JSON.stringify(course)));
      vm.$nextTick(function(){
      vm.courseFormDialogTitle = "课程编辑";
      vm.stateObj.scCourseImportDialogVisible = true;
      })
    },
    addCourse: function(evt) {
      var vm = this;
      evt.stopPropagation()
      vm.stateObj.scCourseImportDialogVisible = true;
      vm.courseFormDialogTitle = "新增课程";
    },
  },
  //computed
  computed: {
      ...mapState([
      'stateObj','requestUrl'
    ]),
  },
  watch: {},
  filter: {}
}
</script>
