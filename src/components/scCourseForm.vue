<template>
  <div v-if="stateObj.scCourseImportDialogVisible">
    <el-dialog @open="onCourseFormDialogOpen" class="eca-dialog-header addCourse-dialog" :title="courseFormDialogTitle" :visible.sync="stateObj.scCourseImportDialogVisible" width="1152px">
      <div class="dialog-body f-clear addCourse-dialog-body">
        <div class="add-course-left f-l h-p-100">
          <div class="class-item class-item-addCourseDialog mg-center" v-for="item in [courseForm]">
            <div class="class-cover" :style="{backgroundImage:`url(${courseForm.coverImg})`}"></div>
            <div class="course-info-detail-ct">
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
          </div>
        </div>
            </div>
          </div>
          <div class="add-item-car course-entering-add mt-15 f-s-16 hidden">
            <i class="fa fa-plus"></i>
          </div>
        </div>
        <div class="add-course-right f-r h-p-100">
          <div class="tag-switch-bar height-50">
            <span class="tag-selected" @click="switchEnteringFormPart('courseContent')">课程内容</span>
            <span @click="switchEnteringFormPart('courseSection')">课程章节</span>
            <span @click="switchEnteringFormPart('courseInstructor')">任课老师</span>
            <span @click="switchEnteringFormPart('courseFee')">课程费用</span>
          </div>

          <div class="course-entering-form p-l-15">
            <el-form :model="courseForm" :rules="rules" :inline="true" ref="courseForm" size="medium" label-width="100px" label-position="top" class="demo-courseForm">
              <!-- 课程费用 -->
              <div v-show="courseEnteringFormPart=='courseFee'">
                <el-form-item label="课时" prop="numberOfLessons">
                   <el-input-number v-model="courseForm.numberOfLessons" controls-position="right"></el-input-number>
                </el-form-item>
                <br>
                <el-form-item label="预支教务费用" prop="advancePayment">
                   <el-input-number v-model="courseForm.advancePayment" controls-position="right"></el-input-number>
                </el-form-item>
                <br>
                <el-form-item label="课程学费" prop="courseFee">
                   <el-input-number v-model="courseForm.courseFee" controls-position="right"></el-input-number>
                </el-form-item>
                <br>
                <el-form-item label="其它费用" prop="extraFee">
                   <el-input-number v-model="courseForm.extraFee" controls-position="right"></el-input-number>
                </el-form-item>
                <br>
                <el-form-item label="其他费用备注" prop="extraFeeExplain" style="width:500px;">
                  <el-input type="textarea" :rows="3" v-model="courseForm.extraFeeExplain"></el-input>
                </el-form-item>
              </div>
              <!-- 课程内容 -->
              <div v-show="courseEnteringFormPart=='courseContent'">
                <el-form-item label="课程名称" prop="name">
                  <el-input placeholder="请输入课程名称" v-model="courseForm.name"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="学段" prop="area">
                  <div>
                    <el-radio-group v-model="courseForm.area">
                      <el-radio-button v-for="item in eduStageList" :label="item"></el-radio-button>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <br>
                <el-form-item label="年级" prop="grades">
                  <div>
                    <el-checkbox-group v-model="courseForm.grades">
                      <el-checkbox-button v-for="item in gradeList(courseForm.area)" :label="item.value">{{item.name}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
                <br>
                <el-form-item label="难度" prop="degreeOfDifficulty">
                  <div>
                    <el-radio-group v-model="courseForm.degreeOfDifficulty">
                      <el-radio-button v-for="item in levelList" :label="item"></el-radio-button>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item label="课时" prop="numberOfLessons" style="width:132px;">
                  <el-input-number :min=1 v-model="courseForm.numberOfLessons" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="学位" prop="maxNumberOfStudents" style="width:132px;">
                  <el-input-number :min=1 v-model="courseForm.maxNumberOfStudents" controls-position="right"></el-input-number>
                </el-form-item>
                <br>
                <el-form-item label="开始时间" prop="lessonBeginTime">
                  <div>
                    <el-time-picker v-model="courseForm.lessonBeginTime"  align="right"  unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择开始时间">
                    </el-time-picker>
                  </div>
                </el-form-item>
                <el-form-item label="结束时间" prop="lessonEndTime">
                  <div>
                    <el-time-picker v-model="courseForm.lessonEndTime"  align="right"  unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择结束时间">
                    </el-time-picker>
                  </div>
                </el-form-item>
                <br>
                <el-form-item label="时间" prop="lessonDays">
                  <div>
                    <el-checkbox-group v-model="courseForm.lessonDays">
                      <el-checkbox-button v-for="item in dayList" :label="item.value">{{item.name}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
                <br>
               <el-form-item label="上课地点" prop="name">
                  <el-input placeholder="请输上课地点" v-model="courseForm.lessonLocation"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="课程简介" prop="introduction" style="width:500px;">
                  <el-input type="textarea" :rows="3" v-model="courseForm.introduction"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="封面" prop="coverImg">
                  <div>
                    <el-upload :action="requestUrl.fileUpload" :data="{url:courseForm.coverImg,property:'coverImg'}" :file-list="getFileList([courseForm.coverImg],'coverImg','string')" list-type="picture-card" :http-request="uploadCover" ref="coverImg" :before-remove="handleBeforeRemove(courseForm.coverImg)" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="courseForm.coverImg" alt="">
                    </el-dialog>
                  </div>
                </el-form-item>
                <br>
                <el-form-item label="轮播图片" prop="imgs">
                  <div>
                    <el-upload :action="requestUrl.fileUpload" :data="{url:courseForm.imgs,property:'imgs'}" :file-list="getFileList(courseForm.imgs,'imgs','array')" list-type="picture-card" :http-request="uploadBanners" ref="imgs" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </div>
                </el-form-item>
              </div>
              <!-- 课程章节 -->
              <div v-show="courseEnteringFormPart=='courseSection'">
                <div class="f-w-b height-50">章节</div>
                <el-form-item v-for="(sectionItem,sIndex) in courseForm.courseChapters" :prop="'courseChapters.'+sIndex+'.title'" class="border-1-gray" style="width:100%;vertical-align:middle" :rules="{required: true, message: '章节名不能为空', trigger: 'blur'}">
                  <div class="section-add-item-ct">
                    <span class="course-section-remove" @click="removeCourseSection(sectionItem)">
                      <i class="fa fa-minus-circle"></i>
                    </span>
                    <div class="ps-rel" style="margin-bottom:6px;">
                      <span class="f-w-b v-a-m">第{{sIndex+1}}章</span>
                      <el-input class="section-name-input-ct v-a-m ml-15" size="small" placeholder="请输入章节标题" v-model="sectionItem.title"></el-input>
                      <span class="segment-add-ct" @click="addSectionSegment(sIndex)">
                        <i class="fa fa-plus-circle"></i>
                      </span>
                    </div>
                    <el-form-item v-for="(segmentItem,seIndex) in sectionItem.courseSections" class="ps-rel mt-10 segment-item-add-ct .el-form-item__error" style="width:100%;margin-bottom:8px" :prop="'courseChapters.'+sIndex+'.courseSections.'+seIndex+'.title'" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
                      <span class="segment-num">{{sIndex+1}}-{{seIndex+1}}</span>
                      <el-input class="segment-name-input-ct v-a-m ml-55" size="small" placeholder="请输入小节标题" v-model="segmentItem.title"></el-input>
                      <span class="segment-add-ct" @click="removeSectionSegment(sIndex,segmentItem)">
                        <i class="fa fa-minus-circle"></i>
                      </span>
                    </el-form-item>
                  </div>
                </el-form-item>
                <div class="add-item-car course-section-add mt-15" @click="addCourseSection()">
                  <i class="fa fa-plus"></i>
                </div>
              </div>
              <!-- 任课老师 -->
              <div v-show="courseEnteringFormPart=='courseInstructor'">
                <el-form-item label="教师姓名" prop="courseTeacher.realName">
                  <el-input v-model="courseForm.courseTeacher.realName"></el-input>
                </el-form-item>
                <el-form-item class="real-Name-authenticated" prop="courseTeacher.realNameAuthenticationPassed" label=" ">
                  <span>教师实名认证</span>
                  <el-switch v-model="courseForm.courseTeacher.realNameAuthenticationPassed"></el-switch>
                </el-form-item>
                <br>
                <el-form-item label="助教" prop="courseTeacher.assistantName">
                  <el-input v-model="courseForm.courseTeacher.assistantName"></el-input>
                  <!-- <span><i class="fa fa-minus-circle"></i>添加助教</span>
                          <div>
                            <el-input v-model="courseForm.name"></el-input>
                            <span><i class="fa fa-minus-circle"></i></span>
                          </div> -->
                </el-form-item>
                <br>
                <el-form-item label="教师所在地" prop="courseTeacher.address.city">
                  <el-input v-model="courseForm.courseTeacher.address.city"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="教师简介" prop="courseTeacher.introduction" style="width:500px;">
                  <el-input type="textarea" :rows="3" v-model="courseForm.courseTeacher.introduction"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="教师荣耀" prop="courseTeacher.honours" style="width:500px;">
                  <el-input type="textarea" :rows="3" v-model="courseForm.courseTeacher.honours"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="教师头像" prop="courseTeacher.profilePhoto">
                  <div>
                    <el-upload :action="requestUrl.fileUpload" :file-list="getFileList([courseForm.courseTeacher.profilePhoto],'courseTeacher.profilePhoto','string')" list-type="picture-card" :http-request="uploadProfilePic" ref="profilePhoto" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stateObj.scCourseImportDialogVisible = false">取 消</el-button>
        <el-button v-if="courseFormDialogTitle=='新增课程'" type="primary" @click="showimportCourseDialog()">课库导入</el-button>
        <el-button v-if="courseFormDialogTitle=='新增课程'" type="success" @click="saveAddedCourse('post',requestUrl.addCourse)">录 入</el-button>
        <el-button v-if="courseFormDialogTitle=='课程编辑'" type="primary" @click="saveAddedCourse('put',requestUrl.updateCourse)">保 存</el-button>
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
      lessonTimePeriod:[],
      courseFormTitle: this.courseFormDialogTitle,
      courseList: [],
      eduStageList: ["小学", "初中", "高中"],
      uploadRefNames: ["coverImg", "profilePhoto", "imgs"],
      charpterItem: {
        sequenceNumber: 0,
        title: "",
        description: "",
        courseSections: []
      },
      searchFilter: {
        area: "小学",
        grade: 1
      },
      segmentItem: {
        title: ""
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
      levelList: ["初级", "中级", "高级"],
      dayList:[{name:"星期一",value:1},{name:"星期二",value:2},{name:"星期三",value:3},{name:"星期四",value:4},{name:"星期五",value:5},{name:"星期六",value:6},{name:"星期天",value:7},],
      courseEnteringFormPart: "courseContent",
      dialogImageUrl: "",
      dialogVisible: false,
      courseItem: {
        sectionList: [
        ]
      },
      toAddCourseItem: {
        sectionList: []
      },
      checkedCourseItem: {},
      classInfoSwiper: {},
      classDetailDialogVisible: false,
      addCourseDialogVisible: false,
      uploadImgTag: {},
      //form dataModal
      courseForm: {},
      courseFormTemplate: {
        sourceId: "",
        schoolId:"b41dde61-e99e-4e8a-af71-7b89efb92ddf",
        area: "",
        advancePayment: 0,
        courseFee: 0,
        name: "",
        grades: [],
        degreeOfDifficulty: "",
        numberOfStudentsFromPastToNow: 0,
        score: 0,
        introduction: "",
        coverImg: "",
        coverImgOnMobile: "",
        enabled: false,
        extraFee: 0,
        extraFeeExplain: "string",
        lessonBeginTime: "string",
        lessonEndTime: "string",
        lessonFee: 0,
        lessonLocation: "",
        lessonDays:[],
        maxNumberOfStudents: 0,
        numberOfLessons: 0,
        startDate: "2018-04-08T12:59:38.729Z",
        imgs: [],
        description: "",
        studentIds: [],
        studentInfos: [],
        courseChapters: [
          {
            sequenceNumber: 0,
            title: "",
            description: "",
            courseSections: []
          }
        ],
        courseTeacher: {
          realName: "",
          realNameAuthenticationPassed: false,
          assistantName: "",
          introduction: "",
          honours: "",
          profilePhoto: "",
          address: {
            city: "珠海",
            detail: "string",
            district: "string",
            province: "string"
          }
        }
      },

      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择学段", trigger: "change" }],
        lessonBeginTime:[{ required: true, message: "请选择课程时间段", trigger: "change" }],
        lessonLocation:[{ required: true, message: "请选择上课地点", trigger: "change" }],
        grades: [
          {
            type: "array",
            required: true,
            message: "请选择课程年级",
            trigger: "change"
          }
        ],
        imgs: [
          {
            type: "array",
            required: true,
            message: "请至少上传一张课程介绍图片",
            trigger: "change"
          }
        ],
        lessonDays:[
          {
            type:"array",
            required: true,
            message: "请选择课程上课时间",
            trigger: "change"
          }
        ],
        degreeOfDifficulty: [
          { required: true, message: "请选择课程难度", trigger: "change" }
        ],
        introduction: [
          { required: true, message: "请填写封面介绍", trigger: "change" }
        ],
        description: [
          { required: true, message: "请填写课程简介", trigger: "change" }
        ],
        coverImg: [
          { required: true, message: "请上传课程封面", trigger: "change" }
        ],
        "courseTeacher.realName": [
          { required: true, message: "请输入教师姓名", trigger: "blur" }
        ],
        "courseTeacher.assistantName": [
          { required: true, message: "请输入助教姓名", trigger: "blur" }
        ],
        "courseTeacher.introduction": [
          { required: true, message: "请输入教师简介", trigger: "blur" }
        ],
        "courseTeacher.honours": [
          { required: true, message: "请输入教师荣誉简介", trigger: "blur" }
        ],
        "courseTeacher.profilePhoto": [
          { required: true, message: "请上传教师头像", trigger: "change" }
        ],
        "courseTeacher.address.city": [
          {
            required: true,
            trigger: "blur"
          }
        ]
      }
    }
  },
  props: {
    courseFormDialogTitle: String,
    editCourseItem: Object,
    formModal: String
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this
    vueBus.$on('importCourseSelected',function(importCourse){
      vm.importCourseInfo(importCourse)
        if(vm.formModal==globalData.courseType.institution){
          vm.courseForm.sourceId=importCourse.id
        }else{
           vm.courseForm.sourceId=null
        }
    })
    vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(vm.courseFormTemplate)))
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
    notifyTR: function () {
      this.$notify({
        title: "提示",
        message: arguments[0],
        position: "top-right",
        type: arguments[1]
      });
    },
    showimportCourseDialog(){
      var vm=this
      vm.stateObj.courseImportDialogVisible=true
    },
    importCourseInfo(importCourse){
      var vm=this
      Object.keys(importCourse).forEach((key)=>{
        if(  vm.courseForm.hasOwnProperty(key)){
        if(importCourse[key]===null||importCourse[key]===undefined){

        }else{
        var keyType=Object.prototype.toString.call(importCourse[key]).slice(8,-1)
        if(keyType=='Object'||keyType=="Array"){
          vm.courseForm[key]=JSON.parse(JSON.stringify(importCourse[key]))
        }else{
         vm.courseForm[key]=importCourse[key]
        }
        }
        }
      })
    },

    onCourseFormDialogOpen() {
      var vm = this
      if (vm.courseFormDialogTitle == '课程编辑') {
        vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(vm.editCourseItem)))
      } else {
        vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(vm.courseFormTemplate)))
      }
    },
    getFileList: function (list, property, type) {
      var fileList = []
      list.forEach(function (item) {
        if (item) {
          fileList.push({ url: item, property: property, propertyType: type })
        }
      })
      return fileList
    },
    checkCourseInfo: function () {
      var vm = this;
      vm.classDetailDialogVisible = true;
      vm.checkedCourseItem = arguments[0];
      vm.$nextTick(function () {
        vm.classInfoSwiper = new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true
          }
        });
      });
    },
    toggleSegmentVisible: function (charptItem) {
      charptItem.segmentVisible = !charptItem.segmentVisible
    },
    editCourse: function () {
      var vm = this;
      arguments[1].stopPropagation();
      vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(arguments[0])));
      vm.addCourseDialogVisible = true;
      vm.courseDialogTitle = "课程编辑";
      vm.courseEnteringFormPart = "courseContent";
    },
    onAddCourseDialogClose: function () {
      var vm = this;
      vm.$refs["courseForm"].resetFields();
      vm.clearUploadFiles();
    },
    onclassDetailDialogOpen: function () {

    },
    openAddCourseDialog: function () {
      var vm = this;
      vm.addCourseDialogVisible = true;
      vm.courseDialogTitle = "课程录入";
      vm.courseEnteringFormPart = "courseContent";
      vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(vm.courseFormTemplate)));
    },
    selectSearchFilter: function (type, value) {
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

    handleBeforeRemove: function () { },

    getImgUrl: function (list, type) {
      if (type == "string") {
        return ""
      } else {
        var urlList = []
        list.forEach(item => { urlList.push(item.url) })
        return urlList
      }
    },

    handleRemove: function (file, fileList) {
      var vm = this;
      var url = file.url, property = file.property, propertyType = file.propertyType;
      var proList = property.split(".");
      vm.$axios
        .delete(vm.requestUrl.fileDelete, { params: { url: url } })
        .then(res => {
          var imgUrl = vm.getImgUrl(fileList, propertyType)
          switch (proList.length) {
            case 1:
              vm.courseForm[proList[0]] = imgUrl
              break;
            case 2:
              vm.courseForm[proList[0]][proList[1]] = imgUrl
              break;
            case 3:
              vm.courseForm[proList[0]][proList[1]][proList[2]] = imgUrl
              break;
            default:
              break;
          }
        })
        .catch(function (err) {
          vm.notifyTR("删除图片失败,请检查网络是否连通", "error");
          console.log(err);
        });
    },
    handlePictureCardPreview: function (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    switchEnteringFormPart: function () {
      var vm = this;
      vm.courseEnteringFormPart = arguments[0];
    },
    removeCourseFromLocalList: function (item) {
      var vm = this;
      var itemIndex = vm.courseList.indexOf(item);
      vm.courseList.splice(itemIndex, 1);
    },
    addCourseSection: function () {
      var vm = this;
      vm.courseForm.courseChapters.push(JSON.parse(JSON.stringify(vm.charpterItem)));
    },
    removeCourseSection: function (item) {
      var vm = this;
      var itemIndex = vm.courseForm.courseChapters.indexOf(item);
      vm.courseForm.courseChapters.splice(itemIndex, 1);
    },
    addSectionSegment: function (index) {
      var vm = this;
      vm.courseForm.courseChapters[index].courseSections.push(JSON.parse(JSON.stringify(vm.segmentItem)));
    },
    removeSectionSegment: function (index, item) {
      var vm = this;
      var itemIndex = vm.courseForm.courseChapters[
        index
      ].courseSections.indexOf(item);
      vm.courseForm.courseChapters[index].courseSections.splice(itemIndex, 1);
    },
    handleCoverSuccessUpload: function (response, file, fileList) {
      var vm = this;
      vm.courseItem.coverImg = response;
    },
    clearUploadFiles: function () {
      var vm = this;
      vm.uploadRefNames.forEach(function (ref) {
        vm.$refs[ref].clearFiles();
      });
    },
    imgUploadRequest: function (imgType, url, form) {
      var vm = this;
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      vm.$axios
        .post(url, form, config)
        .then(res => {
          switch (imgType) {
            case "coverImg":
              vm.courseForm["coverImg"] = res.data;
              break;
            case "imgs":
              vm.courseForm["imgs"].push(res.data);
              break;
            case "profilePhoto":
              vm.courseForm.courseTeacher["profilePhoto"] = res.data;
          }
        })
        .catch(function (err) {
          alert("图片上传失败");
          console.log(err);
        });
    },
    getImgFormdata: function () {
      var vm = this;
      var param = arguments[0];
      var fileObj = param.file;
      // 接收上传文件的后台地址
      var url = param.action;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", fileObj);
      return form;
    },
    uploadCover: function () {
      var vm = this;
      var form = vm.getImgFormdata(arguments[0]);
      vm.imgUploadRequest("coverImg", arguments[0].action, form);
    },
    uploadProfilePic: function () {
      var vm = this;
      var form = vm.getImgFormdata(arguments[0]);
      vm.imgUploadRequest("profilePhoto", arguments[0].action, form);
    },
    uploadBanners: function () {
      var vm = this;
      var form = vm.getImgFormdata(arguments[0]);
      vm.imgUploadRequest("imgs", arguments[0].action, form);
    },
    validateForm: function (formName) {
      var vm = this;
      var isValid = false;
      vm.$refs[formName].validate(valid => {
        isValid = valid;
      });
      return isValid;
    },
    saveAddedCourse: function (method, url) {
      var vm = this;
      var formName = "courseForm";

      if (vm.validateForm(formName)) {
        vm.$axios[method](url, vm.courseForm)
          .then(res => {
            vm.notifyTR("课程保存成功", "success");
            if (vm.courseDialogTitle == "新增课程") {
              vm.courseList.push(res.data);
            } else {
              vm.courseList.forEach(function (item, index) {
                if (item.id == res.data.id) {
                  vm.courseList.splice(index, 1, vm.courseForm)
                }
              });
            }
            vueBus.$emit('loadScCourse')
            vm.addCourseDialogVisible = false;
          })
          .catch(function (err) {
            vm.notifyTR("课程保存失败,请检查网络是否连通", "error");
            console.log(err);
          });
      } else {
        vm.$alert("请完整填写课程表单信息", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
  },
  //computed
  computed: {
    ...mapState([
      'stateObj', 'requestUrl'
    ]),
    gradeList: function () {
      var vm = this;
      return function (area) {
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
        return vm.gradeListOrigin.filter(function (item) {
          return item.value >= min && item.value <= max;
        });
      };
    }
  },
  watch: {
    courseFormDialogTitle: function (nVal) {
      var vm = this
      if (nVal) {
        vm.onCourseFormDialogOpen()
      }
    }
  },
  filter: {}
}
</script>
