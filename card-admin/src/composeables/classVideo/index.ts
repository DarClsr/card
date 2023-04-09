import { Scene } from "./Scene";
import { Video } from "./Video";
import { fabric } from 'fabric';

export interface ParamsJson {
  w: number;
  h: number;
  scene: Array<SceneJson>;
}

export interface SceneJson {
  w: number;
  h: number;
  bg: string;
  layer: Layer[];
  duration: number;
}

export interface Layer {
  w: number;
  h: number;
  type: string;
  t?: string;
  url?: string;
  from?: number;
  to?: number;
  duration?: number;
  position: position;
  bg?: string;
}

export interface position {
  top: number;
  right: number;
  bottom: number;
  left: number;
}


export default class ClassVideo {

  public w: number | undefined;

  public h: number | undefined;

  public canvas: HTMLCanvasElement | undefined;

  public content: CanvasRenderingContext2D | undefined | null;

  public sceneArr: Array<Scene> = [];

  public currentTime: number = 1;

  public fps: number = 25;

  public speed: number = 1;

  public timer: number = 0;

  constructor() {}

  //解析并初始化Canvas
  public async init(params: ParamsJson) {
    //设置canvas大小
    this.w = params?.w;
    this.h = params?.h;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.content = this.canvas.getContext("2d");
    this.canvas.style.width = 200+ 'px'
    this.canvas.style.height = 360 + 'px'
    await this.initScene(params.scene)
  }

  public async initScene(params: SceneJson[]) {
    const a = await Promise.all(
      params.map(async (item: SceneJson) => this.initContent(item))
    )
    //优先加载
    this.sceneArr.push(
      ...a
    )
    // if (this.sceneArr.length > 2) {
    //   this.sceneArr.push(
    //     ...(await Promise.all(
    //       params.slice(2).map(async (item: SceneJson) => await this.initContent(item))
    //     ))
    //   )
    // }
  }

  public async initContent(item: SceneJson) {
    const scene = new Scene()
    //初始化当前场景
    scene.init(item)
    return scene
  }

  //重新渲染Canvas
  public async render() {
    // this.sceneArr.forEach((v: Scene) => {
    // if (v.video.length != 0) {
    //   const from = v.fromTo?.at(1) as any;
    //   const time = from + (v.video.at(1) as Video).video.currentTime;
    //   console.log(from,time,v,'v');
    //   (v.video.at(0) as Video).setCurrentTime(time);
    // }
    // })
    this.renderFrame(this.currentTime)
  }

  //绘制当前帧
  public async renderFrame(currentFrames: number) {
    this.currentTime = currentFrames;
    const channels = [] as any[];
    //计算每个场景的帧数
    this.sceneArr.reduce((from: number, cur: Scene, index: number) => {
      let total = cur.totalFrames;
      let to = from + total;
      channels.push({ from, to, index: index });
      return to
    }, 0)
    const w = this.w as number;
    const h = this.h as number;

    // 清空画布并用纯色填充
    this.content?.clearRect(0, 0, w, h);
    (this.content as CanvasRenderingContext2D).fillStyle = "#fff";
    this.content?.fillRect(0, 0, w, h);
    this.content?.restore();
    for (let i = 0; i < this.sceneArr.length; i++) {
      const scene = this.sceneArr[i]
      scene.isPlay = true;
      // scene.render()
      const { from, to } = channels[i];
      if (from <= currentFrames && currentFrames <= to) {
        // console.log(from, to, currentFrames, scene)
        scene.isPlay = true;
         await scene.render(currentFrames);
        // console.log(scene.canvas.getElement(), 0, 0, w, h);
        console.log(this.canvas);
        // (this.content as CanvasRenderingContext2D).drawImage(scene.canvas, 0, 0, 720, 1280);
        console.log(scene.canvas,scene.canvas.width,scene.canvas.height,this.canvas?.width,this.canvas?.height);
        (this.canvas as HTMLCanvasElement).getContext("2d")?.drawImage(scene.canvas,0,0,scene.canvas.width,scene.canvas.height);
      }
    }
  }

  /**
  * play
  */
  public async play(from: number = 0, to: number = 0) {
    this.timer = setInterval(() => {
      this.sceneArr
        .filter((v) => v.isPlay)
        .forEach((item: Scene) => {
          // track.video.el.playbackRate = speed.value;
          if (item.video.video.paused) {
            item.video.play(0)
          }
          this.renderFrame(this.currentTime + 1);
        });
    }, 1000 / this.fps / this.speed)
  }

  public clearPlay() {
    clearInterval(this.timer)
  }
}