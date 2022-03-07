<template>
  <div class="side-bar">
    <div class="header">
      <!-- <img class="logo" src="~@assets/images/bg1.jpg" alt="logo"> -->
      <span :class="['title', isCollapse ? 'hidden' : '']">VUEADMIN</span>
    </div>
    <el-menu
      class="my-menu"
      :collapse="isCollapse"
      collapse-transition
      :default-active="$route.path"
      router
      unique-opened>
      <menu-item v-for="menu in menus" :model="menu" :key="menu.path">

      </menu-item>
    </el-menu>
  </div>
</template>

<script>
import menus from '@constants/menu'
import MenuItem from './MenuItem'
import Cookies from 'js-cookie'

export default {
  name: 'side-bar',
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  data () {
    return {
      menus,
      isSuper: Cookies.get('isSuper')
    }
  },
  created () {
  },
  components: {
    MenuItem
  },
  methods: {
    isFolder (model) {
      return model.children && model.children.length
    },
    hasAuth (nav) {
      return (nav.super === false || (nav.super === true && this.isSuper === 'true'))
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "~@assets/scss/variables.scss";
.side-bar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #002140;
  color: #fff;

  .header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      width: 45px;
      margin: 0 10px;
    }
    .title {
      margin-right: 10px;
      font-size: 18px;
      font-weight: 600;
    }
    .title.hidden {
      display: none;
    }
  }
  .footer {
    color: $menu-font-color;
    .footer-item {
      display: flex;
      padding: 15px 0;
      justify-content: center;
      align-items: center;

      .fa-user-circle-o {
        font-size: 20px;
        margin: 0 8px;
      }
    }
    .footer-item:hover {
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>
