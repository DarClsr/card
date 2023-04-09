<template>
 <div id="search">
 <el-input v-model="search" placeholder="请输入搜索内容">
   <template #append>
        <el-button class="action" ype="primary" :icon="Search"></el-button>
      </template>
 </el-input>
 </div>
</template>

<script lang="ts" setup>
 import {ref} from "vue"
import { Search } from "@element-plus/icons-vue";

 const search=ref("");
</script>

<style lang="scss" scoped>
#search{
    height: 60px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .action{
        background-color:var(--el-color-primary) ;
        color: #fff;
        box-shadow: 0 2px 6px 0 rgb(81 86 190 / 50%);
    }
}
</style>