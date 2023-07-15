<template>
  <div class="bgm_item">
    <canvas class="bgm-bg" ref="bgm_canvas"></canvas>
    <div class="controls">
      <el-button @click="play">播放</el-button>
      <div class="progress mx-4">
        <el-slider
          class="t-w-full"
          v-model="volume"
          show-input
          status="success"
          @change="setVolume"
        />
      </div>
      <el-button @click="pause">暂停</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createPlayer, Player } from "@/hook/audioPlayer";
import { onMounted, defineProps, defineExpose, ref, computed } from "vue";

const props = defineProps({
  url: String,
});

const bgm_canvas = ref();

const player = ref<Player>();

const volume = ref(32);

const pause = () => {
  player.value?.pause();
};

const progress = ref(0);

const play = () => {
  player.value?.play();
};

const progress_timer = ref();

const setVolume=(val:number)=>{
    player.value?.setVolume(val)
}

const create = () => {
  player.value = createPlayer(props.url ?? "", {
    volume: volume.value / 100,
  });
  player.value.onload = () => {
    drawWave(player.value?.getBuffer());
  };

  progress_timer.value = setInterval(() => {
    const val = player.value?.getProgress();
    progress.value = val ?? 0;
    if (progress.value >= 100) {
      clearInterval(progress_timer.value);
    }
  }, 500);
};

function drawWave(buffer: any) {
  // buffer.numberOfChannels返回音频的通道数量，1即为单声道，2代表双声道。这里我们只取一条通道的数据
  let data = [];
  let originData = buffer.getChannelData(0);
  // 存储所有的正数据
  let positives = [];
  // 存储所有的负数据
  let negatives = [];
  // 先每隔100条数据取1条
  for (let i = 0; i < originData.length; i += 100) {
    data.push(originData[i]);
  }
  // 再从data中每10条取一个最大值一个最小值
  for (let j = 0, len = Math.floor(data.length / 10); j < len; j++) {
    let temp = data.slice(j * 10, (j + 1) * 10);
    positives.push(Math.max.apply(null, temp));
    negatives.push(Math.min.apply(null, temp));
  }

  // 创建canvas上下文
  let canvas = bgm_canvas.value;
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    canvas.width = positives.length;
    let x = 0;
    let y = 100;
    let offset = 0;
    ctx.fillStyle = "#fa541c";
    ctx.beginPath();
    ctx.moveTo(x, y);
    // canvas高度200，横坐标在canvas中点100px的位置，横坐标上方绘制正数据，下方绘制负数据
    // 先从左往右绘制正数据
    // x + 0.5是为了解决canvas 1像素线条模糊的问题
    for (let k = 0; k < positives.length; k++) {
      ctx.lineTo(x + k + 0.5, y - 100 * positives[k]);
    }

    // 再从右往左绘制负数据
    for (let l = negatives.length - 1; l >= 0; l--) {
      ctx.lineTo(x + l + 0.5, y + 100 * Math.abs(negatives[l]));
    }
    // 填充图形
    ctx.fill();
  }
}

onMounted(() => {
  create();
});

defineExpose({
  create,
});
</script>

<style scoped>
.controls {
  display: flex;
}

.controls .progress {
  display: flex;
  width: 100%;
}
</style>
