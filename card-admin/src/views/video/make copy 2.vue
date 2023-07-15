<template>
  <div class="page make">
    <div class="container">
      <div class="video_play">
        <video
          :src="url"
          class="video"
          ref="bgVideo"
          :style="{
            width: config.w * config.scale + 'px',
            height: config.h * config.scale + 'px',
          }"
        ></video>
      </div>

      <div class="video_frame" ref="videoFrame">
        <div class="frame_progress">
          <!-- <el-progress :percentage="frame_progress" /> -->
        </div>
        <div class="imgs d-flex" v-loading="frame_loading">
          <img
            :style="{ width: img_w + 'px' }"
            v-for="item in frame_List"
            :key="item.frameTime"
            :src="item.url"
          />
          
        </div>

        <div class="time-line">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { useVideoFrame } from "@/hook/useVideoFrame";

const img_w=ref(50)

const dom = ref("main");

let url =
  "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/6458b2832eb7ef7534ec425f.mp4";

const { loadVideoUrl ,frame_List,config} = useVideoFrame();

onMounted(() => {
  loadVideoUrl(url);
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

.page {
  height: calc(100% - 46px);
}

.container {
  height: 100%;
}

.container .video_play {
  height: calc(100% - 150px);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.container .video_frame {
  height: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.make .time-line {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
}

.make .time-line .time {
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 10px;
}

.make .axis {
  position: absolute;
  left: 0;
  height: 69px;
  width: 12px;
  background: red;
  cursor: pointer;
}
.make .axis {
  position: absolute;
  left: 0;
  height: 100%;
  width: 2px;
  background: red;
}

.make .axis-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.make .imgs {
  position: relative;
  user-select: none;
}

.make .imgs img {
  position: relative;
  user-select: none;
}

.make .axis-content .time-desc {
  position: absolute;
  width: 54px;
  height: 24px;
  top: -24px;
  left: -28px;
  background-repeat: no-repeat;
  content: attr(data-value);
  color: #000;
  font-size: 11px;
  display: flex;
  align-items: flex-start;
  padding: 5px;
  justify-content: center;
  font-size: 12px;
  background: turquoise;
  z-index: 9999;
}
</style>
