<template>
<div>
<div class="h-60 f-w-b">
<div class="f-l ml-30 content-type-filter-ct">
<span class="mr-50" :class="{'content-type-selected':contentType=='courseEnrollment'}" @click="switchContentType('courseEnrollment')">本校课程</span>
<span class="mr-10" :class="{'content-type-selected':contentType=='refoundApply'}" @click="switchContentType('refoundApply')">外校课程</span>
</div>
<div class="f-r mr-30">
<span class="mr-10">金峰小学</span>
<span> <i class="fa fa-caret-down"></i></span>
</div>
</div>
<div v-if="contentType=='courseEnrollment'">
  <table class="enrollment-table w-p-100">
    <tr class="thead">
      <th class="w-p-10"><el-checkbox v-model="radio" label="2">课程名称</el-checkbox></th>
      <th class="w-p-10"><span class="mr-5">类型</span></th>
      <th class="w-p-10">指导老师</th>
      <th class="w-p-10">学时</th>
      <th class="w-p-10">学位</th>
      <th class="w-p-40">更多信息</th>
      <th class="w-p-10"><i class="el-icon-more-outline"></i></th>
    </tr>
    <tr class="tbody" v-for="itme in courseEnrollment">
      <td style=""><el-checkbox v-model="radio" label="2">舞蹈</el-checkbox></td>
      <td class="">本校</td>
      <td>张欣欣</td>
      <td class="">15</td>
      <td class="">20-30</td>
      <td class=""><span class="mr-5">更多信息</span><i class="fa fa-caret-down"></i></td>
      <td><i class="el-icon-more-outline"></i></td>
    </tr>
  </table>
</div>
<div v-if="contentType=='refoundApply'">
  <table class="enrollment-table w-p-100">
    <tr class="thead">
      <th class="w-p-10"><el-checkbox v-model="radio" label="2">课程名称</el-checkbox></th>
      <th class="w-p-10"><span class="mr-5">类型</span></th>
      <th class="w-p-10">指导老师</th>
      <th class="w-p-10">学时</th>
      <th class="w-p-10">学位</th>
      <th class="w-p-40">更多信息</th>
      <th class="w-p-10"><i class="el-icon-more-outline"></i></th>
    </tr>
    <tr class="tbody" v-for="itme in courseEnrollment">
      <td style=""><el-checkbox v-model="radio" label="2">舞蹈</el-checkbox></td>
      <td>外校</td>
      <td>张欣欣</td>
      <td >15</td>
      <td >20-30</td>
      <td><span class="mr-5">更多信息</span><i class="fa fa-caret-down"></i></td>
      <td><i class="el-icon-more-outline"></i></td>
    </tr>
  </table>
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
      courseEnrollment:[1,2,3,4,5],
      radio:"",
      contentType:"courseEnrollment"
    }
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
    switchContentType(type){
      this.contentType=type
    }
  },
  //computed
  computed: { },
  watch: { },
  filter:{ }
}
</script>
