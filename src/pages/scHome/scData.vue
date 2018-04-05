<template>
<div>
 <div class="h-50 f-w-b f-s-20">
<div class="f-l ml-20">
<span>本学期课程</span>
</div>
<div class="f-r mr-20 f-s-26">
<span><i class="fa fa-plus-circle"></i></span>
</div>
</div>
<div class="h-50 p-l-20">
 <span class="in-b mr-20 inline-filter-item" v-for="item in gradeList"
  :class="{'selected-blue':selectedGrade==item.name}" @click="selecteGrade(item)">{{item.name}}</span>
</div>
<div class="h-50 p-l-20">
 <span class="in-b mr-20 inline-filter-item" v-for="(item,index) in classList"
  :class="{'selected-blue':selectedClass==(index+1)}" @click="selecteClass(index)">（{{index+1}}）班</span>
</div>
<div>
  <table class="enrollment-table w-p-100">
    <tr class="thead">
      <th class="w-p-10"><el-checkbox v-model="radio" label="2">姓名</el-checkbox></th>
      <th class="w-p-10"><span class="mr-5">性别</span><i class="fa fa-caret-down"></i></th>
      <th class="w-p-10">电话</th>
      <th class="w-p-50">科目</th>
      <th class="w-p-10"><i class="el-icon-more-outline"></i></th>
    </tr>
    <tr class="tbody" v-for="itme in dataList">
      <td style=""><el-checkbox v-model="radio" label="2">李欣欣</el-checkbox></td>
      <td class="c-danger">女生</td>
      <td>13887088588</td>
      <td class="c-danger">书法，小提琴，画画</td>
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
       radio:"",
     selectedGrade:'二年级',
     selectedClass:1,
     gradeList:[{name:"一年级"},{name:"二年级"},{name:"三年级"},{name:"四年级"},{name:"五年级"},{name:"六年级"},{name:"七年级"},{name:"八年级"},{name:"九年级"},],
     classList:[{name:"1"},{name:"2"},{name:"3"}],
     dataList:[1,2,3,4,5]
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
    selecteGrade(grade){
      var vm=this
      vm.selectedGrade=grade.name
    },
    selecteClass(classNum){
      var vm=this
      vm.selectedClass=classNum+1
    },
  },
  //computed
  computed: { },
  watch: { },
  filter:{ }
}
</script>
