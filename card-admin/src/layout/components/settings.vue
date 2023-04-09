<template>
  <div id="settings" class="d-flex align-item-center">
    <div class="theme setting-item d-flex align-center justify-content-center mx-4"></div>
    <div
      class="message setting-item d-flex align-item-center justify-content-center mx-4"
    >
      <el-icon size="36"><bell /></el-icon>
    </div>
    <div class="screen setting-item d-flex align-item-center justify-content-center mx-4" @click="toggleFullScreen">
      <el-icon size="36"><full-screen /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FullScreen, Bell } from "@element-plus/icons-vue";

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style lang="scss">
#settings {
  margin-left: auto;
  height: 60px;
  .setting-item {
    // color: $body-color;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background 0.2s ease-in-out;
  }
  .setting-item:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
