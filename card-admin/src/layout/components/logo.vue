<template>
  <div class="logo">
    <img src="@/assets/logo.png"/>
    <span class="text" v-show="!isCollapse">card</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({
  isCollapse: Boolean,
});

</script>

<style lang="scss" scoped>
 .logo{
     display: flex;
     align-items: center;
     background-color: #fff;
     height: 60px;
     padding: 15px;
      transition: all 0.2s linear;
     img{
         width: 36px;
         height: 36px;
     }
     .text{
         font-weight: bold;
         font-weight: 28px;
         margin-left: 50px;
     }
 }
</style>