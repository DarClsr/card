<template>
  <div class="dubbing">
    <div class="bgms">
      <el-carousel
        :interval="0"
        :autoplay="false"
        height="200px"
        indicator-position="none"
      >
        <el-carousel-item v-for="item in bgms" :key="item.url">
           <editAudio :url="item.url" :name="item.name" />
          <!-- <AudioItem :url="item.url" /> -->
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AudioItem from "./audioItem.vue";
import editAudio from "./edit_audio.vue";


const bgms = ref([
  {
    url:"https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1683862218740-7537b15ead8bf6db.mp3",
    // url: "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1677573640000-0111b306664f987e.mp3",
    name: "音乐01",
  },
]);

const subtitles = ref([]);
</script>

<style scoped>
.dubbing {
  padding: 0 10px;
}

.bgms {
}

.dubbing :deep(.el-carousel__indicators) {
  display: none;
}

.dubbing :deep(.el-carousel__arrow) {
  display: none !important;
}
</style>
