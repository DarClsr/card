<template>
  <div class="page">
    <h2 class="my-2">视频抽帧</h2>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const dom = ref("main");

const handle = ref<any>(null);

const play = () => {};

onMounted(async () => {
  // handle.value=await initGl()
});
</script>

<style scoped>
#main,
#main2,
#phone,
#builder {
  width: 200px;
  height: 360px;
  border: 1px solid red;
}
img {
  width: 200px;
}
</style>
