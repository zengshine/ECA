<template>
  <div class="content-wrapper">
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
        <span class="category-name" v-for="item in eduStageList" :class="{'class-filter-selected':(item=='小学'||item=='三年级')}">{{item}}</span>
      </div>
      <div class="filter-item">
        <span class="filter-category">学段：</span>
        <span class="category-name" v-for="item in gradeList" :class="{'class-filter-selected':(item=='小学'||item=='三年级')}">{{item}}</span>
      </div>
      <div class="course-add-btn" @click="openAddCourseDialog()">
        <i class="fa fa-plus-circle"></i>
      </div>
    </div>
    <div class="class-list">
      <div class="class-list-ct eca-content-section">
        <div class="class-item class-item-home" v-for="item in courseList" @click="classDetailDialogVisible=true">
          <div class="class-cover"></div>
          <div class="class-name">一年级跆拳道基础课程</div>
          <div class="class-property">
            <span class="pro-level">初级</span>
            <span class="pro-member-count">
              <i class="fa fa-user"></i>188</span>
          </div>
          <div class="member-des">跆拳道基本功练习，脚部韧性训练，耐力训练</div>
        </div>
      </div>
    </div>
    <!-- 模态框容器 -->
    <div>
      <el-dialog :open="onclassDetailDialogOpen()" class="eca-dialog-header" title="信息录入" :visible.sync="classDetailDialogVisible" width="1152px">
        <div slot="title">
          <div class="course-name">课程名称</div>
          <div class="course-property">
            <div class="course-property-item">
              <div>学习人数</div>
              <div>269</div>
            </div>
            <div class="course-property-item">
              <div>难度系数</div>
              <div>初级</div>
            </div>
            <div class="course-property-item">
              <div>课程学段</div>
              <div>一年级</div>
            </div>
            <div class="course-property-item">
              <div>综合评分</div>
              <div>10</div>
            </div>
          </div>
        </div>
        <div class="course-info-dialog-body f-clear">
          <div class="course-info-left f-l">
            <div>
              <span class="f-w-b">课程简介：</span>
              <span>所谓跆拳道，跆（TAE），意为以脚踢、摔撞；拳（KWON），以拳头打击；道（DO），是一种艺术方法。跆拳道是一种利用拳和脚的艺术方法。它是以脚法为主的功夫，其脚法占70%。跆拳道的套路共有24套；另外还有兵器、擒拿、摔锁、对拆自卫术及10余种基本功夫等。 跆拳道是经过东亚文化发展的一项朝鲜武术，以东方心灵为土壤，承继长久传统， 以"始于礼，终礼"的武道精神为基础。</span>
            </div>
            <div>
              <div>
                <div class="f-w-b course-section-title">章节</div>
                <div class="course-section-info" v-for="(item,index) in courseItem.sectionList">
                  <div>
                    <div>
                      <span class="f-w-b section-num">第{{index}}章</span>
                      <span class="section-info-name">{{item.sectionName}}</span>
                      <span class="f-r">
                        <i class="fa fa-caret-down"></i>
                      </span>
                    </div>
                    <div v-if="false">{{item.des}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="course-info-right f-r">
            <div class="mb-15 f-w-b">任课老师</div>
            <div class="course-instructor-profile mb-10">
              <img class="course-instructor-profile-picture mr-20" src="../../static/images/avatars/avatar-1.jpg"></img>
              <div class="course-instructor-profile-info">
                <div>
                  <span class="f-w-b profile-info-name mr-10">张三丰老师 </span>
                  <span class="f-s-10">张三丰(助教)</span>
                </div>
                <div>
                  <span class="label-blue mr-15 f-s-10">实名认证</span>
                  <span>
                    <i class="fa fa-map-marker"></i>珠海市香洲区</span>
                </div>
              </div>
            </div>
            <div class="mb-20">
              <span class="f-w-b">教师简介：</span>
              <span>从事跆拳道教学8年，有丰富的教学经验，课堂气氛活泼，教学有道。已出120多位优秀跆拳道学生</span>
            </div>
            <div class="mb-20">
              <span class="f-w-b">荣誉：</span>
              <span>跆拳道黑带8段，获得第三届珠海跆拳道比赛第一名，全国跆拳道赛事优秀奖</span>
            </div>
            <!-- 轮播 -->
            <div class="course-info-carousel">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">Slide 1</div>
                  <div class="swiper-slide">Slide 2</div>
                  <div class="swiper-slide">Slide 3</div>
                  <div class="swiper-slide">Slide 4</div>
                  <div class="swiper-slide">Slide 5</div>
                  <div class="swiper-slide">Slide 6</div>
                  <div class="swiper-slide">Slide 7</div>
                  <div class="swiper-slide">Slide 8</div>
                  <div class="swiper-slide">Slide 9</div>
                  <div class="swiper-slide">Slide 10</div>
                </div>
                <!-- Add Arrows -->
                <div class="swiper-pagination"></div>
                <!-- <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div> -->
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="classDetailDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="classDetailDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog class="eca-dialog-header addCourse-dialog" title="信息录入" :visible.sync="addCourseDialogVisible" width="1152px">
        <div class="dialog-body f-clear addCourse-dialog-body">
          <div class="add-course-left f-l h-p-100">
            <div class="class-item class-item-addCourseDialog mg-center" v-for="item in [1]" @click="true">
              <div class="class-cover"></div>
              <div class="course-info-detail-ct">
                <div class="class-name">一年级跆拳道基础课程</div>
                <div class="class-property">
                  <span class="pro-level">初级</span>
                  <span class="pro-member-count">
                    <i class="fa fa-user"></i>188</span>
                </div>
                <div class="member-des">跆拳道基本功练习，脚部韧性训练，耐力训练</div>
              </div>
            </div>
            <div class="add-item-car course-entering-add mt-15 f-s-16">
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
                        <el-checkbox-button v-for="item in gradeList" :label="item"></el-checkbox-button>
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
                  <el-form-item label="封面" prop="desc">
                    <div>
                      <el-upload action="http://118.89.59.151:8089/web/course/file/command/upload" list-type="picture-card" :http-request="uploadCover" :on-success="handleCoverSuccessUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </div>
                  </el-form-item>
                  <br>
                  <el-form-item label="轮播图片" prop="desc">
                    <div>
                      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
                  <div v-for="(sectionItem,sIndex) in toAddCourseItem.sectionList" class="border-1-gray section-add-item-ct mt-15">
                    <div class="ps-rel">
                      <span class="f-w-b v-a-m">第{{sIndex+1}}章</span>
                      <el-input class="section-name-input-ct v-a-m ml-15" size="small" placeholder="请输入章节标题" v-model="courseForm.name"></el-input>
                      <span class="segment-add-ct" @click="addSectionSegment(sectionItem)">
                        <i class="fa fa-plus-circle"></i>
                      </span>
                    </div>
                    <div v-for="(segmentItem,seIndex) in sectionItem.segmentList" class="ps-rel mt-10">
                      <span class="segment-num">{{sIndex+1}}-{{seIndex+1}}</span>
                      <el-input class="segment-name-input-ct v-a-m ml-55" size="small" placeholder="请输入小节标题" v-model="courseForm.name"></el-input>
                      <span class="segment-add-ct">
                        <i class="fa fa-minus-circle"></i>
                      </span>
                    </div>
                  </div>
                  <div class="add-item-car course-section-add mt-15" @click="addCourseSection()">
                    <i class="fa fa-plus"></i>
                  </div>
                </div>
                <!-- 任课老师 -->
                <div v-show="courseEnteringFormPart=='courseInstructor'">
                  <el-form-item label="教师姓名" prop="courseTeacher">
                    <el-input v-model="courseForm.courseTeacher1"></el-input>
                  </el-form-item>
                  <el-form-item class="real-Name-authenticated" label=" ">
                    <span>教师实名认证</span>
                    <el-switch v-model="courseForm.courseTeacher1"></el-switch>
                  </el-form-item>
                  <br>
                  <el-form-item label="助教" prop="courseTeacher">
                    <el-input v-model="courseForm.courseTeacher1"></el-input>
                    <!-- <span><i class="fa fa-minus-circle"></i>添加助教</span>
                    <div>
                      <el-input v-model="courseForm.name"></el-input>
                      <span><i class="fa fa-minus-circle"></i></span>
                    </div> -->
                  </el-form-item>
                  <br>
                  <el-form-item label="教师所在地" prop="courseTeacher">
                    <el-cascader :options="options" v-model="selectedOptions3"></el-cascader>
                  </el-form-item>
                  <br>
                  <el-form-item label="教师简介" prop="courseTeacher" style="width:500px;">
                    <el-input type="textarea" :rows="3" v-model="courseForm.desc"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="教师荣耀" prop="courseTeacher" style="width:500px;">
                    <el-input type="textarea" :rows="3" v-model="courseForm.desc"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="教师头像" prop="courseTeacher">
                    <div>
                      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
          <el-button type="primary" @click="saveAddedCourse">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style>

</style>
<style lang="scss" src="../../static/sass/main.scss">

</style>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      courseList: [],
      eduStageList: ["小学", "初中", "高中"],
      gradeList: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
      levelList: ["初级", "中级", "高级"],
      courseEnteringFormPart: "courseInstructor",
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
      classInfoSwiper: {},
      classDetailDialogVisible: false,
      addCourseDialogVisible: false,
      //form dataModal
      courseForm: {
        area: "string",
        name: "string",
        grades: [1],
        degreeOfDifficulty: "string",
        numberOfStudentsFromPastToNow: 0,
        score: 0,
        introduction: "string",
        coverImg: "string",
        description: "string",
        courseChapters: [
          {
            sequenceNumber: 0,
            title: "string",
            description: "string"
          }
        ],
        courseTeacher: {
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
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  //Init Events&lifecycle ->
  beforeCreate() {},
  //Init injections&reactivity ->
  created() {},
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    // var endPointSwiper = new Swiper('.swiper-container', {
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true,
    //   paginationBulletRender: function(swiper, index, className) {
    //     return '<span class="' + className + '">' + (index + 1) + '</span>';
    //   }
    // });
    // var feedBackSwiper = new Swiper('#clientFeedbackSwiper', {
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true
    // });
    function calDomWH() {
      vm.commom.calDomHeight(
        ".class-list",
        0,
        ".content-wrapper",
        ".eca-header",
        ".class-filter"
      );
    }
    function loadCourse() {
      vm.$axios
        .get("/web/course/course/query/list/all")
        .then(res => {
          vm.courseList = res.data;
        })
        .catch(function(err) {
          console.log(`loadCourse:${err}`);
        });
    }
    loadCourse();
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
    onclassDetailDialogOpen: function() {
      var vm = this;
      setTimeout(function() {
        vm.classInfoSwiper = new Swiper(".swiper-container", {
          paginationClickable: true,
          navigationClickable: true,
          pagination: ".swiper-pagination",
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      }, 100);
    },
    openAddCourseDialog: function() {
      var vm = this;
      vm.addCourseDialogVisible = true;
    },
    handleRemove: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    switchEnteringFormPart: function() {
      var vm = this;
      vm.courseEnteringFormPart = arguments[0];
    },
    addCourseSection: function() {
      var vm = this;
      vm.toAddCourseItem.sectionList.push({ segmentList: [] });
    },
    addSectionSegment: function(section) {
      var vm = this;
      section.segmentList.push({});
    },
    handleCoverSuccessUpload: function(response, file, fileList) {
      var vm = this;
      debugger;
      vm.courseItem.coverImg = response;
    },
    imgUploadRequest: function(imgType, url, form) {
      var vm = this;
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      vm.$axios
        .post(url, form, config)
        .then(res => {
          console.log(res.data);
        })
        .catch(function(err) {
          alert("图片上传失败");
          console.log(err);
        });
    },
    uploadCover: function() {
      debugger;
      var vm = this;
      var param = arguments[0];
      var fileObj = param.file;
      // 接收上传文件的后台地址
      var url = param.action;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", fileObj);
      vm.imgUploadRequest("cover", url, form);
    },
    saveAddedCourse: function() {
      var vm = this;
      vm.$axios
        .post("/web/course/course/command/create", vm.courseForm)
        .then(res => {
          console.log(res.data);
        })
        .catch(function(err) {
          alert("新增课程失败");
          console.log(err);
        });
    }
  },
  watch: {},
  //computed
  computed: {}
};
</script>
