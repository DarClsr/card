<template>
  <el-menu
    router
    class="menu"
    background-color="transparent"
    text-color="#525f7f"
    active-text-color="#16192c"
    :collapse="isCollapse"
  >
    <!-- <el-menu-item index="/" class="home menu-item">
      <el-icon size="36"><house /></el-icon>
      <div class="menu-text">
        <span>首页</span>
      </div>
    </el-menu-item>
    <el-sub-menu index="/card" class="sub-menu-item">
      <template #title>
        <el-icon size="36"><postcard /></el-icon>
        <span>充值卡</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/card_list">充值卡列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->
    <!-- <el-sub-menu index="/shop" class="sub-menu-item">
      <template #title>
        <el-icon size="36"><postcard /></el-icon>
        <span>店铺</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/shop_list">店铺列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="/role" class="sub-menu-item">
      <template #title>
        <el-icon size="36"><postcard /></el-icon>
        <span>人员</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user_list">用户列表</el-menu-item>
        <el-menu-item index="/admin_list">管理员列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="/video" class="sub-menu-item">
      <template #title>
        <el-icon size="36"><VideoCameraFilled /></el-icon>
        <span>视频</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/video_make">制作视频</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="/game" class="sub-menu-item">
      <template #title>
        <el-icon size="36"><VideoCameraFilled /></el-icon>
        <span>游戏</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/game_list">游戏列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->

    <!-- <el-sub-menu index="/menu" class="sub-menu-item">
      <template #title>
        <el-icon size="36"><postcard /></el-icon>
        <span>菜单</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/menu">菜单列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->


    <RouteMenus  :menus="menus"/>

    
  </el-menu>
</template>

<script lang="ts" setup>
import { defineProps,computed } from "vue";
import { House, Postcard,VideoCameraFilled } from "@element-plus/icons-vue";
import RouteMenus from "./routeMenus.vue"
import store from "@/store";

defineProps({
  isCollapse: Boolean,
});
const menus=computed(()=>{
  return store.state.menus;
})
</script>

<style lang="scss">
.menu:not(.el-menu--collapse) {
  width: 250px;
}

// .el-menu--collapse{
//   width:104px !important;
// }

.menu {
  background: red;
  border: 0 !important;
}

.menu-item {
  display: flex;
  padding: 10px;
  .menu-text {
    font-weight: 500;
    font-size: 26x;
    margin-left: 50px;
  }
}

::deep.el-menu {
  border: 0;
}

.sub-menu-item {
  .el-sub-menu__title{
    span{
      margin-left:50px;
    }
  }
}
</style>
