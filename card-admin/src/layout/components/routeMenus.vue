<template>
  <!-- 如果存在子路由 -->
  <template v-for="(item,j) in (menus as any)">
    <template v-if="item.children && item.children.length">
      <el-sub-menu :index="j" :title="item.name || '未命名'" class="menu-item">
        <template #title>
          <el-icon size="36">
            <component :is="MenuIcon(item)" />
          </el-icon>
          <span class="menu-text">{{ item.name }}</span>
        </template>
        <el-menu-item-group v-if="item.children && item.children.length">
          <!-- 递归 -->
          <RouteMenus :menus="item.children" />
        </el-menu-item-group>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item class="" :key="item.name" @click="router.push(item.path)">
        <el-icon size="36">
          <component :is="MenuIcon(item)" />
        </el-icon>
        <span class="nav-text"> {{ item?.name || "" }} </span>
      </el-menu-item>
    </template>
  </template>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, computed } from "vue";

import { useRouter, type RouteRecordRaw, useRoute } from "vue-router";
import {
  House,
  Lock,
  Menu,
  Postcard,
  UserFilled,
  VideoCameraFilled,
} from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const MenuIcons = reactive<any>({
  home: House,
  menu: Menu,
  user:UserFilled,
  role:Lock
});

const props = defineProps({
  menus: Array,
});

interface RouteMenusProps {
  route: RouteRecordRaw;
}
const {} = toRefs(props);
const getRoute = (routes: [], item: any) => {
  let route:any=null;
  routes.forEach((r: any) => {
    if (r?.children?.length) {
      const child_r = getRoute(r.children, item);
      route=child_r
    }
    if (r.path == item.path && r.meta.type == item.type) {
      route = r;
    }
  });
  return route;
};

const MenuIcon = computed(() => {
  return (item: any) => {
    return  MenuIcons[item.icon]
  };
});
</script>

<style scope lang="scss">
.menu {
  border: 0 !important;
}

.menu-item {
  display: flex;
  padding: 10px;
  flex-direction: column;
}

.menu-text {
  font-weight: 500;
  font-size: 26x;
  margin-left: 50px;
}
</style>
