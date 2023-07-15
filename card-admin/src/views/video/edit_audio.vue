<template>
  <div class="cut_music">
    <div
      class="container"
      v-loading="loading"
      v-if="renderFlow"
      element-loading-text="加载中..."
    >
      <div class="music-name">
        {{ name }}
      </div>
      <div class="audio-content">
        <div class="wave-box mt-4" ref="waveBox" @mousedown.stop="getProgress">
          <div class="progress" :style="{ left: progress_left + 'px' }"></div>
          <div
            class="wave-wrap"
            :style="{ left: 0 + 'px', width: progress_left + 'px' }"
          ></div>
          <canvas class="wave-inner" ref="bg_canvas">
            <!-- <img
              src="https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1687843038778-f3012fd29f29c6f0.png"
            /> -->
          </canvas>
        </div>

        <div class="action d-flex mt-4 align-items-center">
          <div class="play-action">
            <el-button @click="togglePlay" type="text" size="large">
              <el-icon v-if="isPlaying" :size="32">
                <VideoPause />
              </el-icon>
              <el-icon v-if="!isPlaying" :size="32">
                <VideoPlay />
              </el-icon>
            </el-button>
          </div>
        </div>
      </div>

      <div class="volume-control mx-4">
        <el-slider
          class="t-w-full"
          v-model="volume"
          show-input
          status="success"
          @change="setVolume"
        />
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, onMounted, computed, nextTick, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import {
  Scissor,
  CaretBottom,
  VideoPause,
  VideoPlay,
} from "@element-plus/icons-vue";

import { useAudioWave } from "@/hook/useAudioWave";

const isMake = ref(false);
const editModel = ref({
  url: "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1687137676557-a0ec2b2304443877.mp3",
  name: "黄润枝 - 企业宣传片大气开场背景音乐 (Inst_) (V0).mp3",
  id: "55555",
  duration: 500,
  from: 0,
  to: 0,
});

const bg_canvas=ref()

const { init } = useAudioWave();

const volume = ref(30);
const props = defineProps({
  url: {
    type: String,
  },
  name: {
    type: String,
  },
  show_slot: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["confirm"]);

const maxFrom = computed(() => {
  return editModel.value.duration;
});

const audioCtx = new Audio();

const isPlaying = ref(false);

const loading = ref(false);

const togglePlay = () => {
  if (isPlaying.value) {
    audioCtx.pause();
    isPlaying.value = false;
  } else {
    audioCtx.play();
    isPlaying.value = true;
  }
};

const renderFlow = ref(true);

const getAudioCtx = (url: string) => {
  audioCtx.crossOrigin='anonymous'
  audioCtx.src = url;
  loading.value = true;
  audioCtx.onloadedmetadata = () => {
    loading.value = false;
    editModel.value.duration = audioCtx.duration;
    if (!editModel.value.to) {
      editModel.value.to = audioCtx.duration;
    }
    if (editModel.value.from) {
      audioCtx.currentTime = editModel.value.from;
    }
    setAxis(editModel.value.from, "left");
    setAxis(editModel.value.to, "right");
    progress.value = Axis.value.left / totalWidth();
    console.log(bg_canvas.value,'bgcanvas')
    init(url,bg_canvas.value,audioCtx)
  };

  audioCtx.onerror = () => {
    loading.value = false;
    ElMessage.error("音频加载失败,请重试");
  };
};

const Axis = ref({
  left: 0,
  right: 0,
  width: 0.1,
  distance: 20,
});

const isDragging = ref(false);
const startX = ref(0);
const dragElement = ref();

const getProgress = (event: any) => {
  event.stopPropagation();
  const clientX = event.clientX - 5;
  const { left } = waveBox.value.getBoundingClientRect();
  const cur_left = clientX - left;
  const p = cur_left / totalWidth();
  progress.value = p;

  console.log({
    cur_left,
    total: totalWidth(),
  });
  setAudioTime(p);
};

const totalWidth = () => {
  return waveBox.value?.offsetWidth;
};

const setAudioTime = (p) => {
  console.log({
    p,
  });
  audioCtx.currentTime = audioCtx.duration * p;
};

const setEditTime = (num, key) => {
  const pro = num / totalWidth();
  const diff_time = (audioCtx.duration * pro).toFixed(2);
  if (key == "from") {
    editModel.value[key] = Number(0 + diff_time);
  }

  if (key == "to") {
    editModel.value[key] = Number(audioCtx.duration - Number(diff_time));
  }
};

const waveBox = ref();

const setWave = (e) => {};

const stopDrag = () => {
  isDragging.value = false;
  progress.value = Axis.value.left / totalWidth();
  audioCtx.currentTime = Number(0 + editModel.value.from);
};

const wrapLeft = computed(() => {
  const left = Axis.value.left + Axis.value.width;
  return left < 0 ? 0 : left;
});

const wrapWidth = computed(() => {
  const w =
    totalWidth?.value -
    Axis.value.left -
    Axis.value.right -
    Axis.value.width * 2;
  return w < 0 ? 0 : w;
});

// 设置进度条
const progress = ref(0);
const setProgress = () => {
  const pro_num = (audioCtx.currentTime / audioCtx.duration).toFixed(5);
  progress.value = Number(pro_num);
};

// 通过输入框设置宽度

const setAxis = (val, key) => {
  const p = (val / audioCtx.duration).toFixed(2);
  const num = totalWidth() * Number(p);
  if (key == "left") {
    Axis.value[key] = num;
  } else {
    const r_w = totalWidth() - num;
    Axis.value[key] = r_w < 0 ? 0 : r_w;
  }
};

const progress_left = computed(() => {
  const num = totalWidth() * progress.value;
  return num;
});

audioCtx.addEventListener("timeupdate", setProgress);

// 提交保存信息

const confirmModel = () => {
  const diff_time = editModel.value.to - editModel.value.from;
  emits("confirm", {
    ...editModel.value,
    diff: diff_time,
  });
  isMake.value = false;
  isPlaying.value = true;
  editModel.value = {
    url: "",
    name: "",
    id: "",
    duration: 0,
    from: 0,
    to: 0,
  };
  audioCtx.pause();
  ElMessage.success("设置成功");
};

const close = () => {
  isMake.value = false;
  isPlaying.value = true;
  audioCtx.pause();
};

onMounted(() => {
  loading.value = true;
  nextTick(() => {
    getAudioCtx(props.url as string);
  });
  window.addEventListener("resize", () => {
    renderFlow.value = false;
    nextTick(() => {
      renderFlow.value = true;
    });
  });
});
</script>
  
  <style scoped lang="scss">
.cut_music {
  .wave-box {
    height: 105px;
    position: relative;
    user-select: none;
  }

  .music-name {
    text-align: center;
    padding: 15px;
  }

  .audio-content {
    display: flex;
    align-items: stretch;

    .action {
      width: 80px;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 105px;
      .play-action {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .wave-box {
      width: 100%;
    }
  }

  .wave-inner {
    height: 105px;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    background: white;
  }

  .volume-control {
    width: calc(100% - 80px);
    margin-top: 10px;
  }

  img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
    max-width: none;
    border: 0;
  }

  .bg-reflect {
    position: absolute;
    top: 105px;
    left: 0px;
    width: 100%;
    height: 40px;
    opacity: 0.8;
    transform: scaleY(-1);
  }

  .left_axis,
  .right_axis {
    position: absolute;
    top: -25px;
    bottom: 0;
    width: 1px;
    height: 130px;
    cursor: ew-resize;
    z-index: 2;
    .down {
      font-size: 32px;
      color: #546eff;
    }
    display: flex;
    justify-content: center;
  }

  .left_axis {
    left: 0;
  }

  .right_axis {
    right: 0;
  }

  .wave-wrap {
    width: 100px;
    background: #546eff;
    opacity: 0.6;
    position: absolute;
    height: 105px;
    z-index: 4;
  }

  .progress {
    width: 1px;
    background: red;
    opacity: 0.6;
    position: absolute;
    height: 105px;
    z-index: 9;
  }
}
</style>
  