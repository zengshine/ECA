<template>
  <div class="view-container">
    <div class="h-50 f-w-b f-s-20">
      <div class="f-l ml-20">
        <span>本学期数据</span>
      </div>
      <div class="f-r mr-20 f-s-26">
        <span>
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
              <span class="course-handler-btn">
                <i class="fa fa-edit"></i>
              </span>
              <span class="course-handler-btn">
                <i class="fa fa-trash"></i>
              </span>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      loading: false,
      radio: "",
      selectedGrade: '二年级',
      selectedType: '第三方课程',
      gradeList: [{ name: "一年级" }, { name: "二年级" }, { name: "三年级" }, { name: "四年级" }, { name: "五年级" }, { name: "六年级" }, { name: "七年级" }, { name: "八年级" }, { name: "九年级" },],
      classTypes: [{ name: "本校课程" }, { name: "第三方课程" }],
      searchFilter: {
        area: "小学",
        grade: 1
      },
      courseList: [],
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
notifyTR: function() {
      this.$notify({
        title: "提示",
        message: arguments[0],
        position: "top-right",
        type: arguments[1]
      });
    },
    getFileList:function(list,property,type){
      var fileList=[]
       list.forEach(function(item){
         if(item){
          fileList.push({url:item,property:property,propertyType:type})
         }
       })
       return fileList
    },
    checkCourseInfo: function() {
      var vm = this;
      vm.classDetailDialogVisible = true;
      vm.checkedCourseItem = arguments[0];
      vm.$nextTick(function() {
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
    toggleSegmentVisible:function(charptItem){
        charptItem.segmentVisible=!charptItem.segmentVisible
    },
    editCourse: function() {
      var vm = this;
      arguments[1].stopPropagation();
      vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(arguments[0])));
      vm.addCourseDialogVisible = true;
      vm.courseDialogTitle = "课程编辑";
      vm.courseEnteringFormPart = "courseContent";
    },
    onAddCourseDialogClose: function() {
      var vm = this;
      vm.$refs["courseForm"].resetFields();
      vm.clearUploadFiles();
    },
    onclassDetailDialogOpen: function() {

    },
    openAddCourseDialog: function() {
      var vm = this;
      vm.addCourseDialogVisible = true;
      vm.courseDialogTitle = "课程录入";
      vm.courseEnteringFormPart = "courseContent";
      vm.courseForm = Vue.util.extend({}, JSON.parse(JSON.stringify(vm.courseFormTemplate)));
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
    handleBeforeRemove: function() {},
    getImgUrl:function(list,type){
      if(type=="string"){
        return ""
      }else{
        var urlList=[]
        list.forEach(item=>{urlList.push(item.url)})
        return urlList
      }
    },

    handleRemove: function(file, fileList) {
      var vm = this;
      var url = file.url,property=file.property,propertyType=file.propertyType;
      var proList = property.split(".");
      vm.$axios
        .delete("/web/course/file/command/remove", { params: { url: url } })
        .then(res => {
          var imgUrl=vm.getImgUrl(fileList,propertyType)
          switch (proList.length) {
            case 1:
               vm.courseForm[proList[0]]= imgUrl
              break;
            case 2:
              vm.courseForm[proList[0]][proList[1]]=imgUrl
              break;
            case 3:
              vm.courseForm[proList[0]][proList[1]][proList[2]]=imgUrl
              break;
            default:
              break;
          }
        })
        .catch(function(err) {
          vm.notifyTR("删除图片失败,请检查网络是否连通", "error");
          console.log(err);
        });
    },
    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    switchEnteringFormPart: function() {
      var vm = this;
      vm.courseEnteringFormPart = arguments[0];
    },
    removeCourseFromLocalList: function(item) {
      var vm = this;
      var itemIndex = vm.courseList.indexOf(item);
      vm.courseList.splice(itemIndex, 1);
    },
    addCourseSection: function() {
      var vm = this;
      vm.courseForm.courseChapters.push(JSON.parse(JSON.stringify(vm.charpterItem)));
    },
    removeCourseSection: function(item) {
      var vm = this;
      var itemIndex = vm.courseForm.courseChapters.indexOf(item);
      vm.courseForm.courseChapters.splice(itemIndex, 1);
    },
    addSectionSegment: function(index) {
      var vm = this;
      vm.courseForm.courseChapters[index].courseSections.push(JSON.parse(JSON.stringify(vm.segmentItem)));
    },
    removeSectionSegment: function(index, item) {
      var vm = this;
      var itemIndex = vm.courseForm.courseChapters[
        index
      ].courseSections.indexOf(item);
      vm.courseForm.courseChapters[index].courseSections.splice(itemIndex, 1);
    },
    handleCoverSuccessUpload: function(response, file, fileList) {
      var vm = this;
      vm.courseItem.coverImg = response;
    },
    clearUploadFiles: function() {
      var vm = this;
      vm.uploadRefNames.forEach(function(ref) {
        vm.$refs[ref].clearFiles();
      });
    },
    imgUploadRequest: function(imgType, url, form) {
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
        .catch(function(err) {
          alert("图片上传失败");
          console.log(err);
        });
    },
    getImgFormdata: function() {
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
    uploadCover: function() {
      var vm = this;
      var form = vm.getImgFormdata(arguments[0]);
      vm.imgUploadRequest("coverImg", arguments[0].action, form);
    },
    uploadProfilePic: function() {
      var vm = this;
      var form = vm.getImgFormdata(arguments[0]);
      vm.imgUploadRequest("profilePhoto", arguments[0].action, form);
    },
    uploadBanners: function() {
      var vm = this;
      var form = vm.getImgFormdata(arguments[0]);
      vm.imgUploadRequest("imgs", arguments[0].action, form);
    },
    validateForm: function(formName) {
      var vm = this;
      var isValid = false;
      vm.$refs[formName].validate(valid => {
        isValid = valid;
      });
      return isValid;
    },
    saveAddedCourse: function(method, url) {
      var vm = this;
      var formName = "courseForm";
      if (vm.validateForm(formName)) {
        vm.$axios[method](url, vm.courseForm)
          .then(res => {
            vm.notifyTR("课程保存成功", "success");
            if (vm.courseDialogTitle == "课程录入") {
              vm.courseList.push(res.data);
            } else {
              vm.courseList.forEach(function(item, index) {
                if (item.id == res.data.id) {
                  vm.courseList.splice(index, 1, vm.courseForm)
                }
              });
            }
            vm.addCourseDialogVisible = false;
          })
          .catch(function(err) {
            vm.notifyTR("课程保存失败,请检查网络是否连通", "error");
            console.log(err);
          });
      } else {
        vm.$alert("请完整填写课程表单信息", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    deleteCourse: function() {
      var vm = this;
      var id = arguments[0].id;
      arguments[1].stopPropagation();
      vm.$axios
        .delete("/web/course/course/command/remove?id=" + id)
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
        .post("/web/course/course/query/list", vm.searchFilter)
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
  //computed
  computed: {},
  watch: {},
  filter: {}
}
</script>
