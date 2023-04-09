<template>
  <el-row justify="center" class="my-5 py-5 page">
    <el-col :md="8" :lg="6">
      <div class="text-center mb-5">
        <h1 class="display-1 fw-semibold">4<span class="text-primary mx-2">0</span>4</h1>
        <h4 class="text-uppercase">Sorry, page not found</h4>
        <div class="mt-5 text-center">
          <el-button type="primary" size="large" @click="goHome">返回首页</el-button>
        </div>

        <img src="@/assets/image/error-img.png" class="full-img" />>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';


const router=useRouter();

const goHome=()=>{
    router.replace("/")
}

</script>

<style lang="scss" scoped>


.page{
    overflow:hidden;
}
.display-1 {
  font-size: calc(1.725rem + 5.7vw);
  color: #495057;
}
.full-img{
  width: 100%;
  height: auto;  
}
</style>
