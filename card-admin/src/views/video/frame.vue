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
            @loadedmetadata="getVideoDuration"
          ></video>
        </div>
  
        <div class="video_frame" ref="videoFrame">
          <div class="frame_progress" >
            <el-progress :percentage="frame_progress" />
          </div>
          <div class="imgs d-flex" v-loading="frame_loading">
            <img
              :style="{ width: img_w + 'px' }"
              v-for="item in frame_List"
              :key="item.frameTime"
              :src="item.url"
            />
            <div
              class="axis"
              @mousedown.prevent="startDrag('right', $event)"
              :style="{
                left: Axis.x + 'px',
              }"
              v-if="frame_List.length"
            >
              <div class="axis-content">
                <div class="time-desc">{{ moveTime }}</div>
              </div>
            </div>
          </div>
  
          <div class="time-line">
            <div class="time">{{ formatTime(0) }}</div>
            <div class="time">{{ formatTime(video_duration) }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, nextTick, onMounted, ref } from "vue";
  import { useVideoFrame } from "@/hook/useFrame";
  
  const dom = ref("main");
  
  let url =
    "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/6458b2832eb7ef7534ec425f.mp4";
  
  const {
    config,
    getFrame,
    loadFmmpeg,
    frame_List,
    video_duration,
    image_count,
    frame_loading,
    frame_progress,
    loadVideoUrl
  } = useVideoFrame();
  
  const handle = ref<any>(null);
  
  const play = () => {};
  
  const bgVideo = ref<HTMLVideoElement>();
  const videoFrame = ref<HTMLDivElement>();
  
  const getVideoDuration = () => {
    if (bgVideo.value) {
      video_duration.value = bgVideo.value.duration;
      loadVideoUrl(url);
    }
  };
  
  const img_w = ref(0);
  
  const setImageSize = () => {
    const total_width = videoFrame.value?.offsetWidth ?? 0;
    img_w.value = total_width / image_count.value;
  };
  
  const startDrag = (element: string, event: any) => {
    event.preventDefault();
    isDragging.value = true;
    startX.value = event.clientX;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };
  
  const Axis = ref({
    x: 0,
  });
  
  const drag_width = ref(2);
  
  const isDragging = ref(false);
  
  const startX = ref(0);
  
  const drag = (event: any) => {
    if (!isDragging.value) return;
    const offsetX = event.clientX - startX.value;
    const old_x = Axis.value.x;
    const max_x = document.querySelector(".video_frame")?.clientWidth ?? 500;
    let left_x = offsetX + old_x;
    if (left_x >= max_x - drag_width.value) {
      left_x = max_x - drag_width.value;
    }
  
    if (left_x < 0) {
      left_x = 0;
    }
  
    Axis.value.x = left_x;
    startX.value = event.clientX;
  };
  
  const moveTime = computed(() => {
    const NAX_WIDTH = document.querySelector(".video_frame")?.clientWidth ?? 500;
    let progress = Number((Axis.value.x / NAX_WIDTH).toFixed(2));
    const cur_time = Number((video_duration.value * progress).toFixed(2));
    return formatTime(Number(cur_time) || 0);
  });
  
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds =Math.floor( seconds % 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  const setframe = () => {
    const NAX_WIDTH = document.querySelector(".video_frame")?.clientWidth ?? 500;
  
    let progress = Number((Axis.value.x / NAX_WIDTH).toFixed(2));
    if (progress > 1) {
      progress = 1;
    }
  
    if (progress < 0) {
      progress = 0;
    }
  
    const cur_time = Number((video_duration.value * progress).toFixed(2));
    if (bgVideo.value) {
      bgVideo.value.currentTime = cur_time;
    }
  };
  
  const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener("mousemove", drag);
    setframe();
    document.removeEventListener("mouseup", stopDrag);
  };
  onMounted(async () => {
    // handle.value=await initGl()
    window.addEventListener("resize", () => {
      setImageSize();
    });
    loadFmmpeg();
    nextTick(() => {
      setImageSize();
    });
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
  