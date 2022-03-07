<template>
  <div class="header-menu">
    <div class="collapse-control">
      <i @click="toggleCollapse" :class="['fa', `${isCollapse ? 'fa-indent' : 'fa-outdent'}`]"></i>
    </div>
    <div class="right-menu">
      <el-dropdown class="user-panel" trigger="hover">
        <span class="el-dropdown-link userinfo-inner">{{sysUserName}}<img class="user-avatar" :src="this.sysUserAvatar" alt="头像" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item class="danger" divided @click.native="logout">Log Out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-menu',
  props: {},
  data () {
    return {
      collapsed:false,
      sysUserName: null,
      isCollapse: false,
      sysUserAvatar: null
    }
  },
  created () {},
  components: {},
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('toggle-collapse')
    },
    async logout () {
      try {
        await this.$confirm('确认退出吗?', {
          title: 'Reminder',
          type: 'warning',
          confirmButtonText: 'sure',
          cancelButtonText: 'cancel'
        })
        sessionStorage.removeItem('user')
        window.location = `/login`
      } catch (e) {}
    }
  },
  computed: {},
  mounted() {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || ''
      this.sysUserAvatar = user.avatar || ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@assets/scss/variables.scss";
.header-menu {
  position: relative;
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,21,41,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .collapse-control {
    padding-left: 20px;

    .fa {
      -webkit-text-stroke: 1px #fff;
      color: #001529;
      font-size: 18px;
    }
    .fa:hover {
      cursor: pointer;
      color: $primary;
    }
  }
  .right-menu {
    padding-right: 20px;
    .user-panel {
      text-align: right;
			padding-right: 35px;
			float: right;
      .userinfo-inner {
					cursor: pointer;
          display: flex;
          align-items: center;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
      .user-avatar {
        width: 35px;
        height: 35px;
        border-radius: 20px;
      }
      .user-avatar:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
