import { FFmpeg } from "./ffmpeg";

// web worker example, initializing FFMPEG
addEventListener('message', async ({ data }) => {
  // ffmpeg-core.js, ffmpeg-core.worker.js and ffmpeg-core.wasm 
  let nameIn='test.mp4';
  console.log(data)
  // all under assets/ffmpeg -> make sure .wasm is single threaded version
  let arrayBuffer=data;;
  const settings = {
    log: false,
    corePath: '/assets/ffmpeg-core.js',
     logger: (msg:any) => {
      console.log("Log", msg)
    },
    progress: (msg:any) => {
      console.log("Progress", msg.ratio)
      postMessage({type:"progress", data: msg.ratio});
    }
  }

  console.log(data)
  // The log true is optional, shows ffmpeg logs in the console
  const ffmpeg = new FFmpeg(settings);

  // This loads up the ffmpeg.wasm files from a CDN
  console.log("load start")
  await ffmpeg.load();
  console.log("load end")




  postMessage({type:"result", data: arrayBuffer});
});