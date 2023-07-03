import { inject, onMounted, ref } from "vue";
import wasm from "./wasm/index.js";
import VideoEditor from "./viewmodels/VideoEditor"
import Store from "./store"
import Mapping from "./map";



export const useCutVideo = () => {
  // 选择视频文件并加载到视频元素中
  const loadVideoFile = async (url:string) => {
    const blob = await fetch(url).then((res) => res.blob());
    const file = new File([blob], "test.mp4");
    return file;
  };

  const videoFrameBuffer = ref<any>([]);

  const currentReadFrameVideoIndex = ref(0);

  // 核心数据
const coreData = inject(Store.coreData);

// 时间轴的宽度
const timeLineContainer_width = inject(Store.timeLineContainer_width);

// 时间轴滚动轴左偏移量
const timeLineOffsetLeft = inject(Store.timeLineOffsetLeft);

// 帧宽度：决定了时间轴的比例
const frameWidth = inject(Store.frameWidth);

// 当前格子宽度
const gridWidth = inject(Store.gridWidth);

// 格子内帧数
const gridFrame = inject(Store.gridFrame);

// 每组格子内的帧数
const groupGridFrame = inject(Store.groupGridFrame);

// 时间轴宽度：用户能看见的宽度
const timeLine_width = inject(Store.timeLine_width);

// 时间刻度总宽度：包含用户看不见的宽度
const timescale_width = inject(Store.timescale_width);

// 当前预览器加载的视频 URL
const currentVideoUrl = inject(Store.currentVideoUrl);

// 素材的最大帧数
const maxFrameOfMaterial = inject(Store.maxFrameOfMaterial);

// 最大帧宽度
const maxFrameWidth = inject(Store.maxFrameWidth);

// 最小帧宽度
const minFrameWidth = inject(Store.minFrameWidth);

// 合适的帧宽度
const fitFrameWidth = inject(Store.fitFrameWidth);

// 当前段落级焦点
const currentSectionIndex = inject(Store.currentSectionIndex);

// 视频选择器 input type=file
const videoInputElement = ref(null);

const currentFile=inject(Store.currentFile)

// 读帧的 Worker
const readFrameWorker = inject(Store.readFrameWorker);

// 临时存放视频帧的列表
const videoFrameList = inject(Store.videoFrameList);

  const handlerDoing = (blobUrl:any, frame:any, vi:number) => {
    const key = JSON.stringify({
      videoIndex: vi,
      frame: frame,
    });
    const item:any={};
    item[key]=blobUrl
    videoFrameBuffer.value.push({
        blobUrl,
        frame
    });

    console.log(videoFrameBuffer.value.length)
  };

  const initParams = async (url:string) => {
    const videoFile = await loadVideoFile(url);
    VideoEditor.addVideoOnCurrentSection(
      [videoFile],
      currentVideoUrl,
      coreData,
      frameWidth,
      fitFrameWidth,
      currentSectionIndex,
      videoInputElement
    );
  
    console.log({
      videoFile
    })
  
    currentFile.value = videoFile
  };

  // 提取视频的序列帧
  const extractFrames = async (params) => {
    console.log(params);
    wasm.readFrame(params);
  };

  onMounted(()=>{
    timeLineContainer_width.value = Mapping.calcTimeLineContainerWidth(
      document.body.clientWidth
    );
  })

  return {
    loadVideoFile,
    extractFrames,
    initParams,
    videoFrameBuffer
  };
};
