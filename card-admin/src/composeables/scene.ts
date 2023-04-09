import { ref } from "vue";

import { useMedia } from "./media";
import { calculateImage } from "@/utils/calc";

interface IScene {
  media?: any;
  top_cover?: any;
  bottom_cover?: any;
  text?: string;
  c?: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
}

export const useScene = (width = 720, height = 1280) => {
  const w = ref(width);
  const h = ref(height);
  const scene = ref<IScene>({});
  const sceneCtx = ref<CanvasRenderingContext2D | null>(null);

  const { loadMedia } = useMedia();

  const createScene = async (item: any, index: number) => {
    const c: HTMLCanvasElement = document.createElement("canvas");
    const ctx = c.getContext("2d") as CanvasRenderingContext2D;
    scene.value={
      ...scene.value,
      ...item,
    }
    c.width = w.value;
    c.height = h.value;
    const url = item.image || item.video;
    if (url) {
      scene.value.media = await loadMedia(url);
    }
    if (item.top) {
      scene.value.top_cover = await loadMedia(item.top);
    }
    if (item.bottom) {
      scene.value.bottom_cover = await loadMedia(item.bottom);
    }
    scene.value.text = item.text;
    scene.value.c = c;
    scene.value.ctx = ctx;
    sceneCtx.value = ctx;
    await renderScene(sceneCtx.value, item);
    return scene;
  };

  const playSceneitem=(from=0,to=0)=>{

  }

 

  const getProgress = (item: any, duration: number) => {
    return duration / item.end;
  };

  const renderScene = async (
    ctx: any,
    item: any,
    duration: number = 0
  ) => {
    ctx.clearRect(0, 0, w.value, h.value);
    const local = calculateImage(
      scene.value.media.w,
      scene.value.media.h,
      w.value,
      480
    );
    ctx.filter = "blur(30px)";

    // ctx.drawImage(mediaFrame, 0, 0, mw, mh, 0, top, fw, fh);
    ctx.drawImage(scene.value.media.effect, 0, 0, w.value, h.value);
    ctx.filter = "none";

    // 分成三块区域
    if (scene.value.top_cover) {
      ctx.drawImage(scene.value.top_cover.effect, 0, 0, w.value, 400);
    }

    if (scene.value.bottom_cover) {
      ctx.drawImage(scene.value.bottom_cover.effect, 0, 880, w.value, 400);
    }

    // 中间480 上下各400
    if (scene.value.media.type == "image") {
      // ctx.save();
      // const progress = getProgress(item,duration);
      // const rate = progress * 0.8;
      // const scale = 1 + rate;
      // ctx.transform(
      //   scale,
      //   0,
      //   0,
      //   scale,
      //   (-w.value * rate) / 2,
      //   (-h.value * rate) / 2
      // );
      ctx.drawImage(
        scene.value.media.effect,
        local.px,
        local.py + 400,
        local.pw,
        local.ph
      );
      // ctx.restore();
    }
    if (scene.value.media.type == "video") {
      ctx.drawImage(
        scene.value.media.effect,
        local.px,
        local.py + 400,
        local.pw,
        local.ph
      );
      //   document.body.appendChild( item.media.media_dom)
    }

    ctx.font = "42px Microsoft YaHei";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = item.color || "red";
    ctx.fillText(item.text, w.value / 2, 50);
    ctx.fillText(duration, w.value / 2, 150);
  };

  const playScene =  (item: any,duration:number) => {
    const ctx:any=item.ctx;
    scene.value=item
    renderScene(ctx, item,duration);
  };

  return {
    createScene,
    scene,
    playScene 
  };
};
