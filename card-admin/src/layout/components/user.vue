<template>
  <el-dropdown trigger="click">
    <div class="user d-flex align-item-center">
      <el-avatar
        :size="50"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <span class="text">{{ store.state.user?.email }}</span>
      <el-icon class="down"><arrow-down /></el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { logout } from "@/api/common";
import { useRouter } from "vue-router";

const store = useStore();

const router = useRouter();

const exit = async () => {
  ElMessageBox.confirm("是否退出登录", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      console.log("logout");
      try {
        await logout();
        ElMessage.success("退出成功");
        store.commit("setUser", null);
        router.push("/login");
      } catch (e) {
        console.log(e)
      }
    })
    .catch(() => {
      ElMessage.info("取消退出");
    });
};
</script>

<style lang="scss">
.user {
  height: 60px;
  padding: 0 20px;
  background: rgba(233, 233, 239, 0.5);
  .text {
    margin-left: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  .down {
    margin-left: 20px;
  }
}
</style>
