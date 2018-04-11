import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation'
import actions from './actions'

Vue.use(Vuex);

const state = {
  stateObj:{
    courseImportDialogVisible:false,
    courseFormDialogVisible:false,
    scCourseImportDialogVisible:false,
    courseTemplateImportDialogVisible:false,
    courseInfoDialogVisible:false
  },
  requestUrl: {
    addCourseTemplate: "/web/school/courseTemplate/command/create",
    editCourseTemplate: "/web/school/courseTemplate/command/update",
    removeCourseTemplate: "/web/school/courseTemplate/command/remove",
    queryCourseTemplateByFilter:"/web/school/courseTemplate/query/list_by_filter",
    addCourse:"/web/school/course/command/create",
    removeCourse:"/web/school/course/command/remove",
    updateCourse:"/web/school/course/command/update",
    queryCourse:"/web/school/course/query/list",
    fileUpload:"/web/school/file/command/upload",
    fileDelete:"/web/school/file/command/remove"
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
