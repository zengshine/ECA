<template>
  <div class="view-container">
    <div class="h-50 f-w-b f-s-20">
      <div class="f-l ml-20">
        <span>课程库</span>
      </div>
      <div class="f-r mr-20 f-s-26">
        <span>
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
          <div class="class-name">{{item.name}}</div>
          <div class="class-property">
            <span class="pro-level">{{item.degreeOfDifficulty}}</span>
            <span class="pro-member-count">
              <i class="fa fa-user"></i>{{item.numberOfStudentsFromPastToNow}}</span>
          </div>
          <div class="member-des home-course-des">{{item.introduction}}</div>
        </div>
    </div>
        <!-- 模态框容器 -->
    <div>
      <el-dialog @open="onclassDetailDialogOpen" class="eca-dialog-header" title="信息录入" v-if="classDetailDialogVisible" :visible.sync="classDetailDialogVisible" width="1152px">
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
          <el-button @click="classDetailDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="classDetailDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog @close="onAddCourseDialogClose" class="eca-dialog-header addCourse-dialog" v-if="addCourseDialogVisible" :title="courseDialogTitle" :visible.sync="addCourseDialogVisible" width="1152px">
        <div class="dialog-body f-clear addCourse-dialog-body">
          <div class="add-course-left f-l h-p-100">
            <div class="class-item class-item-addCourseDialog mg-center" v-for="item in [1]">
              <div class="class-cover" :style="{backgroundImage:`url(${courseForm.coverImg})`}"></div>
              <div class="course-info-detail-ct">
                <div class="class-name">{{courseForm.name||"课程名称"}}</div>
                <div class="class-property">
                  <span class="pro-level">{{courseForm.degreeOfDifficulty||'难度'}}</span>
                  <span class="pro-member-count">
                    <i class="fa fa-user"></i>{{courseForm.numberOfStudentsFromPastToNow||0}}</span>
                </div>
                <div class="member-des">{{courseForm.description||'简介'}}</div>
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
            </div>

            <div class="course-entering-form p-l-15">
              <el-form :model="courseForm" :rules="rules" :inline="true" ref="courseForm" size="medium" label-width="100px" label-position="top" class="demo-courseForm">
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
                  <el-form-item label="学习人数" prop="numberOfStudentsFromPastToNow" style="width:132px;">
                    <el-input-number v-model="courseForm.numberOfStudentsFromPastToNow" controls-position="right"></el-input-number>
                  </el-form-item>
                  <el-form-item label="综合评分" prop="score" style="width:132px;">
                    <el-input-number v-model="courseForm.score" controls-position="right"></el-input-number>
                  </el-form-item>
                  <br>
                  <el-form-item label="封面介绍" prop="introduction" style="width:500px;">
                    <el-input type="textarea" :rows="3" v-model="courseForm.introduction"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="课程简介" prop="description" style="width:500px;">
                    <el-input type="textarea" :rows="3" v-model="courseForm.description"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="封面" prop="coverImg">
                    <div>
                      <el-upload action="/web/course/file/command/upload" :data="{url:courseForm.coverImg,property:'coverImg'}" :file-list="getFileList([courseForm.coverImg],'coverImg','string')" list-type="picture-card" :http-request="uploadCover" ref="coverImg" :before-remove="handleBeforeRemove(courseForm.coverImg)" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
                      <el-upload action="/web/course/file/command/upload" :data="{url:courseForm.imgs,property:'imgs'}" :file-list="getFileList(courseForm.imgs,'imgs','array')" list-type="picture-card" :http-request="uploadBanners" ref="imgs" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
                  <el-form-item label="教师所在地" prop="courseTeacher.city1">
                    <el-input  v-model="courseForm.courseTeacher.city"></el-input>
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
                      <el-upload action="/web/course/file/command/upload" :file-list="getFileList([courseForm.courseTeacher.profilePhoto],'courseTeacher.profilePhoto','string')" list-type="picture-card" :http-request="uploadProfilePic" ref="profilePhoto" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
          <el-button @click="addCourseDialogVisible = false">取 消</el-button>
          <el-button v-if="courseDialogTitle=='课程录入'" type="primary" @click="saveAddedCourse('post',requestUrl.addCourse)">录 入</el-button>
          <el-button v-if="courseDialogTitle=='课程编辑'" type="primary" @click="saveAddedCourse('put',requestUrl.editCourse)">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Swiper from "swiper";
export default {
  components: {
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
       requestUrl: {
        addCourse: "/web/course/course/command/create",
        editCourse: "/web/course/course/command/update"
      },
      courseList: [],
      eduStageList: ["小学", "初中", "高中"],
      uploadRefNames: ["coverImg", "profilePhoto", "imgs"],
      charpterItem: {
        sequenceNumber: 0,
        title: "",
        description: "",
        courseSections: []
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
      courseEnteringFormPart: "courseContent",
      dialogImageUrl: "",
      dialogVisible: false,
      courseItem: {
        sectionList: [
          {
            sectionName: "课程介绍",
            des:
              '所谓跆拳道，跆（TAE），意为以脚踢、摔撞；拳（KWON），以拳头打击；道（DO），是一种艺术方法。跆拳道是一种利用拳和脚的艺术方法。它是以脚法为主的功夫，其脚法占70%。跆拳道的套路共有24套；另外还有兵器、擒拿、摔锁、对拆自卫术及10余种基本功夫等。 跆拳道是经过东亚文化发展的一项朝鲜武术，以东方心灵为土壤，承继长久传统， 以"始于礼，终礼"的武道精神为基础。'
          },
          {
            sectionName: "课程介绍",
            des:
              '所谓跆拳道，跆（TAE），意为以脚踢、摔撞；拳（KWON），以拳头打击；道（DO），是一种艺术方法。跆拳道是一种利用拳和脚的艺术方法。它是以脚法为主的功夫，其脚法占70%。跆拳道的套路共有24套；另外还有兵器、擒拿、摔锁、对拆自卫术及10余种基本功夫等。 跆拳道是经过东亚文化发展的一项朝鲜武术，以东方心灵为土壤，承继长久传统， 以"始于礼，终礼"的武道精神为基础。'
          },
          {
            sectionName: "课程介绍",
            des:
              '所谓跆拳道，跆（TAE），意为以脚踢、摔撞；拳（KWON），以拳头打击；道（DO），是一种艺术方法。跆拳道是一种利用拳和脚的艺术方法。它是以脚法为主的功夫，其脚法占70%。跆拳道的套路共有24套；另外还有兵器、擒拿、摔锁、对拆自卫术及10余种基本功夫等。 跆拳道是经过东亚文化发展的一项朝鲜武术，以东方心灵为土壤，承继长久传统， 以"始于礼，终礼"的武道精神为基础。'
          },
          {
            sectionName: "课程介绍",
            des:
              '所谓跆拳道，跆（TAE），意为以脚踢、摔撞；拳（KWON），以拳头打击；道（DO），是一种艺术方法。跆拳道是一种利用拳和脚的艺术方法。它是以脚法为主的功夫，其脚法占70%。跆拳道的套路共有24套；另外还有兵器、擒拿、摔锁、对拆自卫术及10余种基本功夫等。 跆拳道是经过东亚文化发展的一项朝鲜武术，以东方心灵为土壤，承继长久传统， 以"始于礼，终礼"的武道精神为基础。'
          },
          {
            sectionName: "课程介绍",
            des:
              '所谓跆拳道，跆（TAE），意为以脚踢、摔撞；拳（KWON），以拳头打击；道（DO），是一种艺术方法。跆拳道是一种利用拳和脚的艺术方法。它是以脚法为主的功夫，其脚法占70%。跆拳道的套路共有24套；另外还有兵器、擒拿、摔锁、对拆自卫术及10余种基本功夫等。 跆拳道是经过东亚文化发展的一项朝鲜武术，以东方心灵为土壤，承继长久传统， 以"始于礼，终礼"的武道精神为基础。'
          }
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
        area: "",
        name: "",
        grades: [],
        degreeOfDifficulty: "",
        numberOfStudentsFromPastToNow: 0,
        score: 0,
        introduction: "",
        coverImg: "",
        imgs: [],
        description: "",
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
          city: [],
          introduction: "",
          honours: "",
          profilePhoto: "",
          address: {
            city: "string",
            detail: "string",
            district: "string",
            province: "string"
          }
        }
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      selectedOptions3: ["zujian", "data", "tag"],
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择学段", trigger: "change" }],
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
        "courseTeacher.city": [
          {
            type: "array",
            required: true,
            message: "请选择教师所在城市",
            trigger: "change"
          }
        ]
      }
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
   computed: {
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
  watch: {},
  filter: {}
}
</script>
