<template>
  <div class="page">
    <h2 class="my-2">制作视频</h2>

    <div class="main">
      <canvas id="builder" width="720" height="1280"></canvas>

      <!-- <img src="https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1650875372331-8eca54d098176049.png"/>
        <img src="https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1650876425881-568b6969380e5fdc.png"/>
        <canvas id="main" width="720" height="1280"></canvas>
        <canvas id="main2" width="720" height="1280"></canvas> -->
      <button @click="play" v-if="!playing">播放</button>
      <button @click="stop" v-else>暂停</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UseGl } from "@/composeables/gl";
import { UseBuilder } from "@/composeables/builder";
import { onMounted, ref } from "vue";

const dom = ref("main");

const handle = ref<any>(null);

const play = () => {
    render()
};

const { initGl } = UseGl(dom.value);
const { initBuilder,render,playing,pause,stop } = UseBuilder("builder");

onMounted(async () => {
  // handle.value=await initGl()
  initBuilder()
});
</script>

<style scoped>
#main,
#main2,
#phone,#builder {
  width: 200px;
  height: 360px;
  border: 1px solid red;
}
img {
  width: 200px;
}
</style>
