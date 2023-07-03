import { fetchFile } from "@ffmpeg/ffmpeg";
import { ref } from "vue";
import wasm from "./wasm/index.js";
import VideoEditor from "./viewmodels/VideoEditor"



export const useCutVideo = () => {
  // 选择视频文件并加载到视频元素中
  const loadVideoFile = async (url) => {
    const blob = await fetch(url).then((res) => res.blob());
    const file = new File([blob], "test.mp4");
    return file;
  };

  const videoFrameBuffer = ref<any>([]);

  const isReadFrameBusy = ref(false);
  const currentReadFrameVideoIndex = ref(0);

  const handlerDoing = (blobUrl, frame, vi) => {
    const key = JSON.stringify({
      videoIndex: vi,
      frame: frame,
    });
    const item={};
    item[key]=blobUrl
    videoFrameBuffer.value.push({
        blobUrl,
        frame
    });

    console.log(videoFrameBuffer.value.length)
  };

  const initParams = async (url) => {
    const videoFile = await loadVideoFile(url);
    return {
      worker: new Worker("./readFrame-lib/readFrameWorker.js"),
      videoFile,
      outputWidth: 200,
      outputHeight: 200,
      readFrameList: '0,200,300,600,900,2500',
      isReadFrameBusy: isReadFrameBusy,
      currentReadFrameVideoIndex: currentReadFrameVideoIndex,
      callback: handlerDoing,
    };
  };

  // 提取视频的序列帧
  const extractFrames = async (params) => {
    console.log(params);
    wasm.readFrame(params);
  };

  return {
    loadVideoFile,
    extractFrames,
    initParams,
    videoFrameBuffer
  };
};
