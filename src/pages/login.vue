<template>
  <div class="content-wrapper">
    <header class="login-header aspect-ratio-2-1">
      <!-- 顶部导航 -->
      <nav-top></nav-top>
      <div class="content">
        <div class="left">
          <div class="logo"></div>
          <div class="des">
            永远相信明天将会发生
            <br>
            美好的事情！
          </div>
        </div>
        <div class="right">
          <div class="account-des">
           <span>
            一个账号，可使用于多个分支机构
            <br>
            教务/提醒/签到/约课/成绩分析
           </span>
          </div>
          <div class="form">
            <div class="switch">
              <div><span>机构登陆</span></div>
              <div><span>免费注册</span></div>
            </div>
            <div class="form-content">
                          <div class="login-form">
              <div class="form-item">
                <div class="item-name">账号</div>
                <input type="text" />
              </div>
              <div class="form-item">
                <div class="item-name">密码</div>
                <input type="password" />
              </div>
              <div class="form-item valid-code">
                <div class="item-name">验证码</div>
                <input type="text" />
                <span>获取验证码</span>
              </div>
              <div class="protocol">
                <el-checkbox>同意</el-checkbox>
                <span>《服务条款》</span>
                <router-link :to="{path:'/register/'}" tag="li">忘记密码？</router-link>
              </div>
              <div class="form-handle-btn">
                <span>马上注册</span>
              </div>
              <div class="switch-link">
                <router-link :to="{path:'/register/'}" tag="li">还没有易教云账号？立即注册>></router-link>
              </div>
              <div class="other-ways">
                <div class="des">
                  <span></span>
                  <span>您还可以通过以下方式直接登录</span>
                  <span></span>
                </div>
                <div class="ways">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <footer>
        <div class="website-copyright">
          <span>Copyright © 2017 YijiaoYun. 保留所有权利。</span>
        </div>
    </footer>
  </div>
</template>

<style lang="scss" src="../../static/sass/main.scss">
</style>
<style lang="scss" src="../../static/sass/login.scss">
</style>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import navTop from '../components/topNav'
export default {
  components: {
  navTop
  },
  data() {
    return {
      isNavFixed: false
    }
  },
  //Init Events&lifecycle ->
  beforeCreate() { },
  //Init injections&reactivity ->
  created() { },
  //create vm.$el and replace 'el' with it ->
  mounted() {
    var vm = this;
    window.addEventListener('scroll', vm.commom.throttle(scrollCallBack, 0, 0), false);
    function scrollCallBack(evt) {
      document.body.scrollTop > 20 ? vm.isNavFixed = true : vm.isNavFixed = false;
    }

    var endPointSwiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      paginationBulletRender: function(swiper, index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    });

    var feedBackSwiper = new Swiper('#clientFeedbackSwiper', {
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
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

  },
  watch: {

  },
  //computed
  computed: {

  }
}
</script>
