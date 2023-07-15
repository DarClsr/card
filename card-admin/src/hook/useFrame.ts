import { ref, computed } from "vue";
import VideoWorker from "./videoWorker?worker";
import FFmpegWorker from "./ffmpeg-worker?worker";
import PromiseWorker from "promise-worker";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export const useVideoFrame = () => {
  const video_worker = new VideoWorker();

  const promiseWorker = new PromiseWorker(video_worker);

  const image_count = ref(30); // 目标输出图片数量


  const config = {
    fps: 1,
    w: 720,
    h: 1280,
    scale: 0.3,
    framePath: "/frames/image%06.jpg",
  };

 
  const frame_List = ref<any[]>([]);

  const frame_width = ref(180);

  const scale = ref(9 / 16);

  const frame_loading = ref(false);

  const frame_height = computed(() => {
    return frame_width.value / scale.value;
  });

  const frame_progress = ref(0);

  const video_duration = ref(0);

  const ffmpeg = createFFmpeg({
    // mainName: 'main',
    log: true,
    progress: (pro: any) => {
      if (pro.time) {
        frame_progress.value =
          Number((pro.time / video_duration.value).toFixed(2)) * 100;
      }
    },
    // corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
  });

  const loadFmmpeg = () => {
    ffmpeg.load();
  };

  const getFrame = async (data: Uint8Array) => {
    frame_loading.value = true;
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    console.log(data, "5555555555");
    await ffmpeg.FS("writeFile", "test.mp4", new Uint8Array(data));
    const duration = video_duration.value;
    ffmpeg.FS("mkdir", "frames");
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-qscale:v",
      "1",
      "-vf",
      `fps=${image_count.value / duration},scale=${frame_width.value}:${
        frame_height.value
      }`,
      "/frames/image%03d.jpg"
    );

    console.log(frame_progress.value, "progress");

    const files = ffmpeg.FS("readdir", "frames");
    const image_files = files.filter((v) => v.indexOf("jpg") > -1);
    const frameDuration = duration / image_files.length;
    for (let i in image_files) {
      const file = image_files[i];
      const img_data = await ffmpeg.FS("readFile", `/frames/${file}`);
      let url = URL.createObjectURL(
        new Blob([img_data], { type: "image/jpeg" })
      );
      const frameTime = Number(i) * frameDuration;
      console.log(`Frame ${i + 1} - Time: ${frameTime.toFixed(2)} seconds`);
      frame_List.value.push({
        url,
        frameTime,
      });
    }

    frame_loading.value = false;

    ffmpeg.exit();
  };

  const ffmpeg_woker=new  FFmpegWorker()

  console.log({
    ffmpeg_woker
  })
  

  const loadVideoUrl = (url: string) => {
    frame_loading.value=true;
    promiseWorker
      .postMessage({
        url,
        type: "FETCH_VIDEO",
      })
      .then((data) => {
         ffmpeg_woker.postMessage({
            data
         })
      });
  };

  const changeFile = (val: string) => {
    console.log(val, "get buffer");
  };

  return {
    loadVideoUrl,
    frame_List,
    config,
    ffmpeg,
    getFrame,
    loadFmmpeg,
    video_duration,
    image_count,
    frame_loading,
    frame_progress,
  };
};
