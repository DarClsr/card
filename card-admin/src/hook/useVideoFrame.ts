import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import {ref,computed} from 'vue'

export const useVideoFrame = () => {

  const image_count = ref(30); // 目标输出图片数量

  const config = {
    fps: 1,
    w: 720,
    h: 1280,
    scale: 0.3,
    framePath: "/frames/image%06.jpg",
  };

  const frame_List=ref<any[]>([])

  const frame_width=ref(180)

  const scale=ref(9/16)

  const frame_loading=ref(false)

  const frame_height=computed(()=>{
    return frame_width.value/(scale.value)
  })

  const frame_progress=ref(0)

  const video_duration=ref(0)

  const ffmpeg = createFFmpeg({
    mainName: 'main',
    log:false,
    progress:(pro:any)=>{
      if(pro.time){
        frame_progress.value=Number((pro.time/video_duration.value).toFixed(2))
        const progress= document.querySelector(".frame_progress")
        console.log(frame_progress.value,progress,";;;;;")
        if(progress){
          progress.innerHTML=frame_progress.value+ "%";
        }
      }
    },
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
  });

  const loadFmmpeg =  () => {
    ffmpeg.load()
  }

  const getFrame = async (url: string) => {
    frame_loading.value=true;
    if(!ffmpeg.isLoaded()){
      await ffmpeg.load();
    }
    await ffmpeg.FS("writeFile", "test.mp4", await fetchFile(url));
    const duration = video_duration.value;
    ffmpeg.FS("mkdir", "frames");
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-qscale:v",
      "1",
      "-vf",
      `fps=${image_count.value/duration},scale=${frame_width.value}:${frame_height.value}`,
      "/frames/image%03d.jpg"
    );

    console.log(frame_progress.value,"progress")


    const files = ffmpeg.FS("readdir", "frames");
    const image_files=files.filter(v=>v.indexOf('jpg')>-1)
    const frameDuration = duration / image_files.length;
    for (let i in image_files) {
      const file=image_files[i]
        console.log(file)
        const img_data = await ffmpeg.FS("readFile", `/frames/${file}`);
        let url= URL.createObjectURL(new Blob([img_data], { type: 'image/jpeg' }))
        const frameTime = Number(i) * frameDuration;
        console.log(`Frame ${i + 1} - Time: ${frameTime.toFixed(2)} seconds`);
        frame_List.value.push({
          url,
          frameTime,
          
        })
    }

    frame_loading.value=false;;

    ffmpeg.exit()
  };

  let video_url =
  "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/6458b2832eb7ef7534ec425f.mp4";

  
  const getFrameByBuffer = async (buffer:Uint8Array,count:number,duration:number) => {
    frame_loading.value=true;
    console.log(1,buffer)
    await ffmpeg.FS("writeFile",`test-${count}.mp4`, buffer);
    console.log(2)
    ffmpeg.FS("mkdir", `frames-${count}`);
    await ffmpeg.run(
      "-i",
      `test-${count}.mp4`,
      "-qscale:v",
      "1",
      "-vf",
      `fps=${image_count.value/duration},scale=${frame_width.value}:${frame_height.value}`,
      `/frames-${count}/image%03d.jpg`
    );


    const files = ffmpeg.FS("readdir",`frames-${count}`);
    const image_files=files.filter(v=>v.indexOf('jpg')>-1)
    const frameDuration = duration / image_files.length;
    for (let i in image_files) {
      const file=image_files[i]
        const img_data = await ffmpeg.FS("readFile", `frames-${count}/${file}`);
        let url= URL.createObjectURL(new Blob([img_data], { type: 'image/jpeg' }))
        const frameTime = Number(i) * frameDuration;
        console.log(`Frame ${i + 1} - Time: ${frameTime.toFixed(2)} seconds`);
        frame_List.value.push({
          url,
          frameTime,
        })
    }
    frame_loading.value=false;

    ffmpeg.exit()
  };

  const getVideoBuffer=async (url:string)=>{
    if(!ffmpeg.isLoaded()){
      await ffmpeg.load();
    }

    const tsest_data=await fetchFile(url)
    console.log({
      tsest_data
    })
    const response:any = await fetch(url);
    const totalSize = response.headers.get('Content-Length');
    const reader = response.body.getReader();
    let receivedSize = 0;
    let count=0;
    let startTime = 0;
    while (true) {
      const { done, value } = await reader.read();
      console.log({
        value,
        receivedSize,
        totalSize
      })

      if (done) {
        break;
      }
      count+=1;
      receivedSize += (value as Uint8Array).length;
      const segmentSize = value.length;
      const diff_time=(video_duration.value * (segmentSize/Number(totalSize))) 

      const endTime=diff_time+startTime

      console.log({
        startTime,
        diff_time,
        endTime
      })

      startTime = endTime;
      await getFrameByBuffer(value,count,Number(diff_time.toFixed(2)) )
      break;
      // 处理分段数据，例如将其存储到缓存或进行进一步处理
      // ...
    }

  }

  return {
    ffmpeg,
    getFrame,
    config,
    loadFmmpeg,
    frame_List,
    video_duration,
    image_count,
    getVideoBuffer,
    frame_loading,
    frame_progress
  }
};
