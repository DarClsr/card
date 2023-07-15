<template>
    <div class="cut_music">
      <div class="" v-if="show_slot">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="截取音乐片段"
          placement="top"
        >
          <el-button
            type="warning"
            class="mx-2"
            :icon="Scissor"
            @click="isMake = true"
            circle
            plain
          />
        </el-tooltip>
      </div>
      <el-drawer
        ref="drawerRef"
        v-model="isMake"
        title="裁剪音频"
        size="50%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        custom-class="demo-drawer"
        @close="close"
      >
        <div
          class="container"
          v-loading="loading"
          v-if="renderFlow"
          element-loading-text="加载中..."
        >
          <div class="music-name">
            {{ editModel.name }}
          </div>
  
          <div class="wave-box mt-4" ref="waveBox" @mousedown.stop="getProgress">
            <div class="progress" :style="{ left: progress_left + 'px' }"></div>
            <div
              class="left_axis"
              :style="{ left: Axis.left + 'px' }"
              @mousedown.prevent="startDrag('left', $event)"
            >
              <el-icon class="down"><CaretBottom /></el-icon>
            </div>
            <div
              class="right_axis"
              :style="{ right: Axis.right + 'px' }"
              @mousedown.prevent="startDrag('right', $event)"
            >
              <el-icon class="down"><CaretBottom /></el-icon>
            </div>
            <div
              class="wave-wrap"
              :style="{ left: wrapLeft + 'px', width: wrapWidth + 'px' }"
            ></div>
            <div class="wave-inner">
              <img
                src="https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1687843038778-f3012fd29f29c6f0.png"
              />
            </div>
            <div class="scroll"></div>
            <!-- <div class="bg-reflect">
              <img
                src="https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1687843038778-f3012fd29f29c6f0.png"
              />
            </div> -->
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
            <div class="mx-4 d-flex align-items-center">
              开始：
              <el-input-number
                v-model="editModel.from"
                :precision="2"
                :step="0.1"
                :min="0"
                :max="maxFrom"
                class="mx-2"
                @change="(val) => setAxis(val, 'left')"
              />
            </div>
  
            <div class="d-flex mx-4 align-items-center">
              结束:
              <el-input-number
                v-model="editModel.to"
                :precision="2"
                :step="0.1"
                :min="0"
                :max="maxFrom"
                class="mx-2"
                @change="(val) => setAxis(val, 'right')"
              />
            </div>
  
            <div class="submit ms-auto">
              <el-button type="primary" @click="confirmModel">保存</el-button>
            </div>
          </div>
        </div>
      </el-drawer>
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
  
  const isMake = ref(false);
  const editModel = ref({
    url: "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1687137676557-a0ec2b2304443877.mp3",
    name: "黄润枝 - 企业宣传片大气开场背景音乐 (Inst_) (V0).mp3",
    id: "55555",
    duration: 500,
    from: 0,
    to: 0,
  });
  const props = defineProps({
    url: {
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
  
  const showEdit = (data) => {
    editModel.value = {
      ...data,
      from: data.from || 0,
      to: data.to || data.duration,
    };
  
    nextTick(() => {
      isMake.value = true;
    });
  
    getAudioCtx(data.url);
  };
  
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
  
  const getAudioCtx = (url) => {
    audioCtx.src = url;
    loading.value = true;
    audioCtx.onloadedmetadata = () => {
      loading.value = false;
      editModel.value.duration = audioCtx.duration;
      if (!editModel.value.to) {
        editModel.value.to = audioCtx.duration;
      }
      if(editModel.value.from){
        audioCtx.currentTime=editModel.value.from;
      }
      setAxis(editModel.value.from, "left");
      setAxis(editModel.value.to, "right");
      progress.value = Axis.value.left / totalWidth.value;
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
  
  const getProgress = (event) => {
    event.stopPropagation();
    const clientX = event.clientX - 5;
    if (isDragging.value) {
      return false;
    }
    const { left } = waveBox.value.getBoundingClientRect();
    const cur_left = clientX - left;
    const p = cur_left / totalWidth.value;
    progress.value = p;
    setAudioTime(p);
  };
  
  const setAudioTime = (p) => {
    audioCtx.currentTime = audioCtx.duration * p;
  };
  
  const startDrag = (element, event) => {
    event.preventDefault();
    isDragging.value = true;
    dragElement.value = element;
    startX.value = event.clientX;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };
  
  const drag = (event) => {
    if (!isDragging.value) return;
    const offsetX = event.clientX - startX.value;
    const old_x = Axis.value[dragElement.value];
    let startLeft: any = Axis.value.left;
    const min_x = 0;
    let max_x = totalWidth.value - Axis.value.width - Axis.value.distance;
    let left_x = offsetX + old_x;
    let right_x = old_x - offsetX;
    if (dragElement.value == "left") {
      max_x =
        totalWidth.value -
        Axis.value.right -
        Axis.value.width * 2 -
        Axis.value.distance;
      if (left_x < min_x) {
        left_x = min_x;
      }
      if (left_x > max_x) {
        left_x = max_x;
      }
      Axis.value.left = left_x;
      // console.log({
      //   max_x,
      //   left_x,
      // });
      setEditTime(left_x, "from");
    }
  
    if (dragElement.value == "right") {
      max_x =
        totalWidth.value -
        Axis.value.left -
        Axis.value.width * 2 -
        Axis.value.distance;
      if (right_x < min_x) {
        right_x = min_x;
      }
      if (right_x > max_x) {
        right_x = max_x;
      }
  
      Axis.value.right = right_x;
      setEditTime(left_x, "to");
    }
  
    startX.value = event.clientX;
  };
  
  const setEditTime = (num, key) => {
    const pro = num / totalWidth.value;
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
  
  const totalWidth = computed(() => {
    return waveBox.value?.offsetWidth;
  });
  
  const stopDrag = () => {
    isDragging.value = false;
    progress.value = Axis.value.left / totalWidth.value;
  
    audioCtx.currentTime = Number(0 + editModel.value.from);
  
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
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
    const num = totalWidth.value * Number(p);
    if (key == "left") {
      Axis.value[key] = num;
    } else {
      const r_w = totalWidth.value - num;
      Axis.value[key] = r_w < 0 ? 0 : r_w;
    }
  };
  
  const progress_left = computed(() => {
    const num = totalWidth.value * progress.value;
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
    isPlaying.value=true;
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
  
  const close =()=>{
    isMake.value = false;
    isPlaying.value=true;
    audioCtx.pause();
  }
  
  onMounted(() => {
    loading.value = true;
    window.addEventListener("resize", () => {
      renderFlow.value = false;
      nextTick(() => {
        renderFlow.value = true;
      });
    });
  });
  
  defineExpose({
    showEdit,
  });
  </script>
  
  <style scoped lang="scss">
  .cut_music {
    .wave-box {
      height: 105px;
      position: relative;
      user-select: none;
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
  