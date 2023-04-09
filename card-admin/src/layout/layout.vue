<template>
  <el-container id="layout" class="bg-gray-100">
    <el-aside>
      <Logo :isCollapse="isCollapse" />
      <app-menu :isCollapse="isCollapse"></app-menu>
    </el-aside>
    <el-container>
      <el-header>
        <toggle-btn :isCollapse="isCollapse" @toggle="setCollapse"></toggle-btn>
        <search />
        <settings /> <user />
      </el-header>
      <el-main>
        <bread-crumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import AppMenu from "./components/menu.vue";
import ToggleBtn from "./components/toogleBtn.vue";
import Logo from "./components/logo.vue";
import Search from "./components/search.vue";
import Settings from "./components/settings.vue";
import User from "./components/user.vue";
import BreadCrumb from "./components/breadcrumb.vue";
const isCollapse = ref(false);
const setCollapse = (value: boolean) => {
  isCollapse.value = value;
};
</script>

<style lang="scss" scoped>
#layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .el-header {
    // color: $body-color;
    line-height: 60px;
    // box-shadow: $layout-shadow;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .el-footer {
    line-height: 60px;
  }

  .el-aside {
    // color: $body-color;
    text-align: center;
    width: auto;
    // background-color: $sidebar-bg;
    // box-shadow: $layout-shadow;
  }

  .el-main {
    color: var(--el-text-color-primary);
    text-align: center;
    box-sizing: border-box;
    background-color: #f0f0f0;
  }
}
</style>
