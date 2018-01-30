<template>
  <div class="first">
    <div class="header">
      <div class="nav-bar">
        <a class="navbar-brand" href="#">
          <strong>MIN</strong>IMAL
        </a>
        <div class="sidebar-collapse">
          <a href="#">
            <i class="fa fa-bars"></i>
          </a>
        </div>
      </div>
      <div class="nav-title"></div>
    </div>
    <div class="container">
      <div class="menu">
        <a href="#" class="sidebar-toggle">Navigation </a>
        <ul class="nav">
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{'active': selectIndex === 0}" @click="changeTab(0)">
              <i class="fa fa-tint"></i> <span class="nav-text">个人中心</span><b class="fa fa-plus dropdown-plus"></b>
            </a>
            <transition name="slide">
              <ul class="dropdown-menu h5" v-show="selectIndex === 0">
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="/personal-data">
                    <i class="fa fa-caret-right"></i> 个人资料
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="/info-modify">
                    <i class="fa fa-caret-right"></i> 资料修改
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="/pdw-modify">
                    <i class="fa fa-caret-right"></i> 密码修改
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="/my-permission">
                    <i class="fa fa-caret-right"></i> 我的权限
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="/member-list">
                    <i class="fa fa-caret-right"></i> 用户列表
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{'active': selectIndex === 1}" @click="changeTab(1)" >
              <i class="fa fa-tachometer"></i> <span class="nav-text">权限管理</span><b class="fa fa-plus dropdown-plus"></b>
            </a>
            <transition name="slide">
              <ul class="dropdown-menu h4" v-show="selectIndex === 1">
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="role-list">
                    <i class="fa fa-caret-right"></i> 角色列表
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="role-allocation">
                    <i class="fa fa-caret-right"></i> 角色分配
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="permission-list">
                    <i class="fa fa-caret-right"></i> 权限列表
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="permission-allocation">
                    <i class="fa fa-caret-right"></i> 权限分配
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{'active': selectIndex === 2}"  @click="changeTab(2)">
              <i class="fa fa-pencil"></i> <span class="nav-text">字典设置</span><b class="fa fa-plus dropdown-plus"></b>
            </a>
            <transition name="slide">
              <ul class="dropdown-menu h1" v-show="selectIndex === 2">
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="dic-list">
                    <i class="fa fa-caret-right"></i> 字典设置
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{'active': selectIndex === 3}"  @click="changeTab(3)">
              <i class="fa fa-bar-chart-o"></i> <span class="nav-text">项目</span><b class="fa fa-plus dropdown-plus"></b>
            </a>
            <transition name="slide">
              <ul class="dropdown-menu h2" v-show="selectIndex === 3">
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="project-analyze">
                    <i class="fa fa-caret-right"></i> 项目分析
                  </router-link>
                </li>
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="project-list">
                    <i class="fa fa-caret-right"></i> 项目列表
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{'active': selectIndex === 4}"  @click="changeTab(4)">
              <i class="fa fa-desktop"></i> <span class="nav-text">人才</span><b class="fa fa-plus dropdown-plus"></b>
            </a>
            <transition name="slide">
              <ul class="dropdown-menu h1" v-show="selectIndex === 4">
                <li class="dropdown-item">
                  <router-link class="dropdown-link" to="talents-search">
                    <i class="fa fa-caret-right"></i> 人才检索
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import first from 'service/first'
import EventBus from 'utilities/event-bus'
export default {
  created () {
    first.get.bind(this)({}, (data) => {
      this.nickname = data.nickname
    }, (err) => {
      console.log(err)
//      this.$message.error(err)
    })
    // this.changeView('member-list')
  },
  data () {
    return {
      leftTop: {horizontal: 'left', vertical: 'top'},
      uniqueMenu: true,
      nickname: '',
      trigger: null,
      isShowMenu: true,
      drawerOpen: false,
      docked: false,
      selectIndex: 0
    }
  },
  methods: {
    changeTab(index) {
      this.selectIndex = index
    },
    logout () {
      first.logout.bind(this)({}, (data) => {
//        this.message({
//          type: 'success',
//          message: '退出登录'
//        })
      }, (err) => {
        console.log(err)
//        this.$message.error(err)
      })
      EventBus.backUrl = ''
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .first
    .header
      width: 100%
      height: 45px
      background: $color-background-d
      display: flex
      .nav-bar
        flex: 0 0 250px
        position: relative
        align-items: center
        display: flex
        padding: 0 15px
        .navbar-brand
          font-weight: 300
          font-size: 18px
          color: white
          padding: 0
          padding-left: 20px
          height: 45px
          line-height: 45px
          background: url(../assets/minimal-logo.png) no-repeat 0 16px
          flex: 1
          strong
            font-weight: bold
        .sidebar-collapse
            font-size: 18px
            color: #f2f2f2
            flex: 0 0 20px
            display: inline-block
      .nav-title
        flex: 1
    .container
      display: flex
      .menu
        flex: 0 0 250px
        .sidebar-toggle
          line-height: 45px
          padding: 0 15px
          font-size: 12px
          color: rgba(0,0,0,0.3)
          font-weight: 700
        .nav
          overflow: hidden
          .nav-item
            overflow: hidden
            .nav-link
              display: flex
              justify-content: space-between
              align-items: center
              text-align: left
              line-height: 40px
              padding: 0 15px
              font-size: 13px
              width: 100%
              font-weight: 700
              color: #fff
              .nav-text
                flex: 1
                padding-left: 10px
              i, b
                text-align: center
                flex: 0 0 10px
              &.active
                background: $color-background-d
                .dropdown-plus:before
                  content: "\f068"
          .dropdown-menu
            &.h1
              height: 30px
            &.h2
              height: 60px
            &.h3
              height: 90px
            &.h4
              height: 120px
            &.h5
              height: 150px
            &.slide-enter-active, &.slide-leave-active
              transition: all 0.5s
            &.slide-enter, &.slide-leave-to
              height: 0
            .dropdown-item
              .dropdown-link
                color: rgba(255,255,255,0.9)
                display: inline-block
                line-height: 30px
                padding: 0 30px
                font-size: 13px
                width: 100%
                font-weight: 500;
                position: relative
                &.router-link-active
                  color: #418bca
      .main
        flex: 1
</style>
