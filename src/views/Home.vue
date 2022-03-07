<template>
	<el-container>
    <el-aside width="auto">
      <side-bar :is-collapse="isCollapse"></side-bar>
    </el-aside>
    <div class="maintainer">
      <header-menu :is-collpase="isCollapse" @toggle-collapse="isCollapse = !isCollapse"></header-menu>
      <router-view class="container"></router-view>
      <!-- <div class="power">Copyright © </div> -->
    </div>
  </el-container>
</template>

<script>
import SideBar from './common/SideBar'
import HeaderMenu from './common/HeaderMenu'

export default {
  name: 'Frame',
  data () {
    return {
      isCollapse: false
    }
  },
  created () {
  },
  components: {
    SideBar,
    HeaderMenu
  }
}
</script>
<style lang="scss" scoped>
.maintainer {
  flex: 1;
  min-width: 1000px;
  height: 100vh;
  overflow-y: auto;

  .container {
    min-height: calc(100% - 134px);
  }
  .power {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
