<template>
  <div class="login">
    <el-row class="container">
      <el-col :span="6" class="action d-flex">
        <el-form
          :model="formParams"
          ref="form"
          class="form"
          :rules="rules"
          @submit.prevent="submit"
        >
          <h1 class="text-align py-1">充值后台</h1>
          <el-form-item label="账户" class="form-item" prop="account">
            <el-input v-model="formParams.email" type="text" />
          </el-form-item>
          <el-form-item label="密码" class="form-item" prop="password">
            <el-input v-model="formParams.password" type="password">
              <template #append>
                <el-icon :size="22">
                  <View />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button
              :loading="loading"
              type="primary"
              class="submit"
              native-type="submit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="18" class="content">
        <el-carousel indicator-position="outside" class="swiper" height="80%">
          <el-carousel-item v-for="banner in banners" :key="banner.name">
            <img class="swiper-img" :src="banner.url" />
          </el-carousel-item>
        </el-carousel>
        <span v-for="i in 10" :key="i" class="move item"></span>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { View } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import Card01 from "@/assets/image/card01.svg";
import Card02 from "@/assets/image/card02.svg";
import Card03 from "@/assets/image/card03.svg";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { login } from "@/api/common";
import type { IElForm } from "@/types/element-plus";
import { useStore } from "vuex";

const loading = ref(false);
const store = useStore();

const banners = reactive([
  {
    name: "card01.svg",
    url: Card01,
  },
  {
    name: "card03.svg",
    url: Card02,
  },
  {
    name: "card03.svg",
    url: Card03,
  },
]);
/**
 * 登录
 */
const formParams = reactive({
  email: "1322677864@qq.com",
  password: "123456",
});

const form = ref<IElForm | null>(null);
const rules = ref({
  email: [{ required: true, message: "请输入账号", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});
const router = useRouter();
const route = useRoute();

const submit = async () => {
  const vaild = await form.value?.validate();
  if (!vaild) {
    return false;
  }
  loading.value = true;
  const { data } = await login(formParams).finally(() => (loading.value = false));
  store.commit("setUser", {
    ...data.user,
  });

  store.commit("setToken", {
    token: data.token,
  })

  
  ElMessage.success("登陆成功");
  let redirectUrl = route.query.redirect||"/";
  if ( typeof redirectUrl !== "string") {
    redirectUrl = "/";
  }
  router.replace(redirectUrl);
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: $bg-light-rgb;
  overflow: hidden;
  .drag {
    width: 200px;
    height: 200px;
    background-color: red;
    cursor: e-resize;
  }
  .container {
    height: 100%;
    overflow: hidden;

    .action {
      height: 100%;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      .submit {
        width: 200px;
        margin: 0 auto;
      }

      .form {
        padding: 20px;
        background-color: #fff;
        width: 100%;
        padding-bottom: 1rem;
        .form-item {
          padding: 20px 0;
        }
      }

      align-items: center;
      padding: 20px;
    }

    .content {
      position: relative;
      padding: 30px;
      .swiper {
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        .swiper-img {
          width: 100%;
        }
      }
      :deep .el-carousel__container {
        height: 100% !important;
      }
      .item {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #409eff;
        opacity: 0.4;
        position: absolute;
        bottom: -300px;
        animation: square 10s infinite;
      }
      .move:nth-child(1) {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        left: 120px;
        animation-delay: 1s;
      }
      .move:nth-child(6) {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        left: 300px;
        animation-delay: 1.5s;
      }
      .move:nth-child(7) {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        right: 120px;
        animation-delay: 2s;
      }
      .move:nth-child(8) {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        left: 120px;
        animation-delay: 1.5s;
      }
      .move:nth-child(8) {
        width: 60px;
        height: 600px;
        border-radius: 50%;
        right: 120px;
      }
      .move:nth-child(8) {
        width: 110px;
        height: 110px;
        border-radius: 50px;
        right: 400px;
        animation-delay: 3s;
      }
      .move:nth-child(2) {
        width: 80px;
        height: 80px;
        border-radius: 50px;
        left: 600px;
        animation-delay: 4s;
      }
      .move:nth-child(3) {
        width: 120px;
        height: 120px;
        border-radius: 50px;
        left: 50px;
        animation-delay: 6s;
      }
      .move:nth-child(4) {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        right: 300px;
        animation-delay: 8s;
      }
      .move:nth-child(5) {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        right: 50px;
        animation-delay: 9s;
      }
    }
  }
}

@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2000px) rotate(600deg);
  }
}
</style>
