<template>
  <el-submenu v-if="isGroup(model) && hasAuth(model)" :index="model.path">
    <template slot="title">
      <i v-if="model.icon" :class="`fa fa-${model.icon}`"></i>
      <span slot="title">{{ model.label }}</span>
    </template>
    <menu-item
      v-for="nav in model.children"
      :model="nav"
      :key="nav.path"
    ></menu-item>
  </el-submenu>
  <el-menu-item v-else-if="hasAuth(model)" :index="model.path">
    <i v-if="model.icon" :class="`fa fa-${model.icon}`"></i>
    <span slot="title">{{ model.label }}</span>
  </el-menu-item>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "menu-item",
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isSuper: Cookies.get("isSuper"),
    };
  },
  methods: {
    isGroup(model) {
      return model.children && model.children.length;
    },
    hasAuth(nav) {
      return (
        nav.super === false || (nav.super === true && this.isSuper === "true")
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

