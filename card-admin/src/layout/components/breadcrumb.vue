<template>
 <el-breadcrumb :separator-icon="ArrowRight" class="menu">
    <el-breadcrumb-item v-for="(item,index) in routes" :key="item.path+index" :to="{ path: item.path }">
    {{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
 import { computed } from "vue";
import {useRouter} from "vue-router";
import { ArrowRight } from '@element-plus/icons-vue'
 const router=useRouter();
const routes=computed(()=>{
    return router.currentRoute.value.matched.filter(item=>item.meta.title)
})

</script>

<style lang="scss" scoped>
.menu{
  background-color: #fff;
  padding: 1rem;
  width: 100%;
}

</style>