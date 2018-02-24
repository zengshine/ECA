<template>
  <div>
    <!-- 维度切换 -->
    <section class="dimension-switch-ct left-right-inline-layout solid-divider height-45 bg-white">
      <div class="left-part info-dimension ml-30">
        <div class="item selected">
          <span>学生</span>
        </div>
        <div class="item">
          <span>教师</span>
        </div>
        <div class="item">
          <span>管理</span>
        </div>
      </div>
      <div class="right-part">
      </div>
    </section>
    <!-- 列表容器 -->
    <section class="dimension-ct">
      <!-- 过滤容器 -->
      <section class="left-right-inline-layout filter-ct solid-divider height-65 bg-white">
        <div class="left-part dropdown-filter ml-15">
          <div class="item">
            <el-select v-model="value" placeholder="请选择年级" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="value" placeholder="请选择类型" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="value" placeholder="请选择状态" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-input placeholder="姓名/电话" size="small" prefix-icon="el-icon-search" v-model="value"></el-input>
          </div>
        </div>
        <div class="right-part count-info mr-30">
          <div class="self-btn" @click="infoFormVisible=true">
            <span>
              <i class="el-icon-circle-plus-outline"></i>
            </span>
          </div>
          <div style="display:none">
            <div class="item">
              <div class="number">775</div>
              <div class="des">
                <span>总人数</span>
              </div>
            </div>
            <div class="item">
              <div class="number">175</div>
              <div class="des">
                <span>在读人数</span>
              </div>
            </div>
            <div class="item">
              <div class="number">275</div>
              <div class="des">
                <span>结课人数</span>
              </div>
            </div>
            <div class="item">
              <div class="number">105</div>
              <div class="des">
                <span>试听人数</span>
              </div>
            </div>
            <div class="item">
              <div class="number">375</div>
              <div class="des">
                <span>流失人数</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 表格内容 -->
      <section class="table-ct bg-white">
        <el-table class="infoInput-table" :data="tableData" :height="tableHeight" @select="onSelectedTableRow" @row-click="handleRowSelected">
          <el-table-column type="selection" width="42">
          </el-table-column>
          <el-table-column label="姓名" width="98">
            <template class="table-checkbox" slot-scope="scope">
              <div class="table-column">
                <div class="name-img-ct">
                  <div>
                    <img class="profile-pic" src="../../../static/images/manage/男生-预微信头像.png" />
                    <img class="sex-pic" src="../../../static/images/manage/icon_性别男生.png">
                  </div>
                </div>
                <div class="name-info-ct">
                  <span class="top">{{scope.row.name}}</span>
                  <br>
                  <span class="bottom d-hidden">家长：刘先生</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" width="130">
            <template slot-scope="scope">
              <div>{{scope.row.tel}}</div>
            </template>
          </el-table-column>
          <el-table-column sortable label="年级" width="80">
            <template slot-scope="scope">
              <div>{{scope.row.grade}}</div>
            </template>
          </el-table-column>
          <el-table-column label="课程">
            <template slot-scope="scope">
              <div class="table-column">
                <span class="class-item" v-for="item in scope.row.classes">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                  <i class="fa fa-info-circle"></i>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="..." width="55">
            <template slot-scope="scope">
              <div @click="handleMore()">
                <i class="el-icon-more-outline"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <!-- 分页组件 -->
      <section class="pagination-ct bg-white border-radiu-bottom-5 height-60">
        <el-pagination class="mr-25" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </section>
    </section>
    <!-- 模态框容器 -->
    <section>
      <el-dialog title="信息录入" :visible.sync="infoFormVisible">
        <el-form class="infoInputForm" :model="infoForm" :inline="true" :label-width="formLabelWidth" size="mini" label-position="top">
          <el-form-item style="width:100%;" label="姓名">
            <el-input v-model="infoForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;" label="性别">
            <el-select v-model="infoForm.gender" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校">
            <el-select v-model="infoForm.gender" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级">
            <el-select v-model="infoForm.gender" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级">
            <el-select v-model="infoForm.gender" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <div class="contacts-ct" v-for="item in infoForm.contacts">
            <el-form-item label="联系人">
              <el-input v-model="item.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="关系">
              <el-select v-model="item.relation" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input v-model="item.telNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="主联系人" label-position="right">
              <el-switch v-model="infoForm.birthdayNotify" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <br>
            <div class="add-relationship">
              <span class="add-plus-circle">+</span>添加联系人</div>
            <br>
          </div>
          <br>
          <el-form-item label="生日">
            <el-date-picker v-model="infoForm.birthday" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="生日提醒">
            <el-switch v-model="infoForm.birthdayNotify" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <br>
          <el-form-item label="家庭地址">
            <el-input v-model="infoForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-select v-model="infoForm.gender" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市区">
            <el-select v-model="infoForm.gender" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item class="textarea-item" label="备注" width="100%">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="infoForm.marker">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      value: "",
      isNavFixed: false,
      options: [
        { value: 1, label: "option1" },
        { value: 2, label: "option1" },
        { value: 3, label: "option1" },
        { value: 4, label: "option1" },
        { value: 5, label: "option1" }
      ],
      tableData: [],
      tableHeight: 500,
      infoFormVisible: false,
      infoForm: {
        name: "",
        gender: "",
        school: "",
        grade: "",
        class: "",
        contacts: [{ name: "", relation: "", telNum: "" }],
        birthday: "",
        birthdayNotify: true,
        address: "",
        province: "",
        city: "",
        marker: ""
      },
      formLabelWidth: "80px"
    };
  },
  //Init Events&lifecycle ->
  beforeCreate() {},
  //Init injections&reactivity ->
  created() {},
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    //初始化数据
    (function() {
      vm.$axios
        .get("http://api/v1/data/typeList")
        .then(function(res) {
          console.log(res);
          vm.tableData = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    })();
    //初始化左侧菜单导航 lmps:left-menu-perfect-scrollbar
    const lmps = new vm.perfectScrollBar(".left-part-nav", {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
    //计算右侧内容框的宽度
    function calDomWH() {
      //30是内容外边距
      vm.tableHeight = vm.commom.calDomHeight(
        ".infoInput-table",
        35,
        ".managepage",
        ".pageHead",
        ".dimension-switch-ct",
        ".filter-ct",
        ".pagination-ct"
      )
    }
    calDomWH();
    window.onresize = function() {
      setTimeout(function() {
        calDomWH();
      }, 100);
      lmps.update();
    };
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
    handleSizeChange() {},
    handleCurrentChange() {},
    handleMore() {},
    onSelectedTableRow(row, event) {},
    handleRowSelected() {}
  },
  watch: {},
  //computed
  computed: {}
};
</script>
