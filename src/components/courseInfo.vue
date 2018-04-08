<template>
<div v-if="stateObj.courseInfoDialogVisible">
      <el-dialog @open="onclassDetailDialogOpen" class="eca-dialog-header" title="课程信息" :visible.sync="stateObj.courseInfoDialogVisible" width="1152px">
        <div slot="title">
          <div class="course-name">{{checkedCourseItem.name||'课程名称'}}</div>
          <div class="course-property">
            <div class="course-property-item">
              <div>学习人数</div>
              <div>{{checkedCourseItem.numberOfStudentsFromPastToNow}}</div>
            </div>
            <div class="course-property-item">
              <div>难度系数</div>
              <div>{{checkedCourseItem.degreeOfDifficulty}}</div>
            </div>
            <div class="course-property-item">
              <div>课程学段</div>
              <div>{{checkedCourseItem.area}}</div>
            </div>
            <div class="course-property-item">
              <div>综合评分</div>
              <div>{{checkedCourseItem.score}}</div>
            </div>
          </div>
        </div>
        <div class="course-info-dialog-body f-clear">
          <div class="course-info-left f-l">
            <div>
              <span class="f-w-b">课程简介：</span>
              <span>{{checkedCourseItem.numberOfStudentsFromPastToNow}}</span>
            </div>
            <div>
              <div>
                <div class="f-w-b course-section-title">章节</div>
                <div class="course-section-info" v-for="(item,index) in checkedCourseItem.courseChapters">
                  <div>
                    <div>
                      <span class="f-w-b section-num">第{{index+1}}章</span>
                      <span class="f-w-b section-info-name">{{item.title}}</span>
                      <span class="f-r hidden" @click="toggleSegmentVisible(item)">
                        <i class="fa fa-caret-down"></i>
                      </span>
                    </div>
                    <div class="course-check-segmentInfo-ct" v-if="true">
                         <div v-for="(segmentItem,sIndex) in item.courseSections">
                           <span>{{index+1}}-{{sIndex+1}}：{{segmentItem.title}}</span>
                         </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="course-info-right f-r">
            <div class="mb-15 f-w-b">任课老师</div>
            <div class="course-instructor-profile mb-10">
              <img class="course-instructor-profile-picture mr-20" :src="checkedCourseItem.courseTeacher.profilePhoto"></img>
              <div class="course-instructor-profile-info">
                <div>
                  <span class="f-w-b profile-info-name mr-10">{{checkedCourseItem.courseTeacher.realName}} </span>
                  <span class="f-s-10">{{checkedCourseItem.courseTeacher.assistantName}}(助教)</span>
                </div>
                <div>
                  <span v-show="checkedCourseItem.courseTeacher.realNameAuthenticationPassed" class="label-blue mr-15 f-s-10">实名认证</span>
                  <span>
                    <i class="fa fa-map-marker" style="margin-right:5px;"></i>{{checkedCourseItem.courseTeacher.city}}</span>
                </div>
              </div>
            </div>
            <div class="mb-20">
              <span class="f-w-b">教师简介：</span>
              <span>{{checkedCourseItem.courseTeacher.introduction}}</span>
            </div>
            <div class="mb-20">
              <span class="f-w-b">荣誉：</span>
              <span>{{checkedCourseItem.courseTeacher.honours}}</span>
            </div>
            <!-- 轮播 -->
            <div class="course-info-carousel">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="imgsrc in checkedCourseItem.imgs" :style="{backgroundImage:`url(${imgsrc})`}"></div>
                </div>
                <!-- Add Arrows -->
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="stateObj.courseInfoDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="classDetailDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Swiper from "swiper"
export default {
  components: {

  },
  data() {
    return {
     classInfoSwiper:{}
    }
  },
  props:{
    checkedCourseItem:Object
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
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
    onclassDetailDialogOpen(){
      console.log("open")
    }
  },
  //computed
  computed: {
    ...mapState(['stateObj'])
  },
  watch: {
    'stateObj.courseInfoDialogVisible':{
      handler:function(nVal){
      var vm=this
      if(nVal){
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
      }
    },
    deep:true
    }
  },
  filter:{ }
}
</script>
