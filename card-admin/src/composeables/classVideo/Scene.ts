import { Layer, position, SceneJson } from ".";
import { fabric } from 'fabric'
import { Video } from "./Video";
import { checkLayerType, LayerImage, LayerText, LayerVideo } from "./utils";

export interface FromTo {
  key: number;
  value: [Number, Number]
}

export class Scene {

  public w: number | undefined;

  public h: number | undefined;

  public canvas: HTMLCanvasElement = document.createElement('canvas');

  public content: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  public video: Video | undefined;

  public from: number = 0;

  public src: string = '';

  public currentFrames: number = 0;

  public totalFrames: number = 0;

  public fps: number = 25;

  public isPlay: boolean = false;

  public layer: Layer[] = []

  public videoDraw: fabric.Image | undefined = undefined;

  public async init(params: SceneJson) {
    Object.assign(this.canvas, {
      width: params.w,
      height: params.h
    })
    this.totalFrames = params.duration * this.fps;
    this.initSceneData(params)
  }

  public async initSceneData(params: SceneJson) {
    this.w = params.w;
    this.h = params.h;
    this.canvas.style.width=200+ "px"
    this.canvas.style.height=360+ "px"
    this.layer = params.layer
    params.layer.forEach(async (item: Layer, index: number) => {
      // await this.createAndUpdateImage(item);
      // await this.createAndUpdateText(item);
      await this.initVideo(item, index);
    });
  }

  public async createAndUpdateImage(item: Layer) {
    if (!checkLayerType<LayerImage>(item, 'image')) {
      return
    }
  }

  public async createAndUpdateText(item: Layer) {
    if (!checkLayerType<LayerText>(item, 'text')) {
      return
    }
  }

  public async initVideo(item: Layer, index: number) {
    if (!checkLayerType<LayerVideo>(item, 'video')) {
      return
    }

    this.video = new Video()
    this.video.setUrl(item.url as string);
    await this.video.init()
    this.from = item.from as number
    // this.video[index].fetchFrames(0)
    console.log(this.video, 'video')
  }

  calculateImage(pw: number, ph: number, w: number, h: number) {
    let px = 0;
    let py = 0;
    if (pw < w && ph < h) {
      px = 0.5 * w - 0.5 * pw;
      py = 0.5 * h - 0.5 * ph;
    } else if (ph / pw > h / w) {
      var uu = ph;
      ph = h;
      pw = (pw * h) / uu;
      px = 0.5 * w - 0.5 * pw;
    } else {
      var uu = pw;
      pw = w;
      ph = (ph * pw) / uu;
      py = 0.5 * h - 0.5 * ph;
    }
    return { px, py, pw, ph };
  };

  public async render(frame = 0) {
    this.currentFrames = frame;
    // this.canvas.getContext().clearRect(0, 0, this.w, this.h);
    let mediaFrame = (this.video as Video).video as any
    const { width: cw, height: ch } = this.canvas;
    let mw = mediaFrame.videoWidth
    let mh = mediaFrame.videoHeight
    console.log(mw, mh, cw, ch)
    const videoRatio = mw / mh;
    const canvasRatio = cw / ch;

    try {
      if (true) {
        // 绘制模糊背景
        this.content.filter = "blur(30px)";
        this.content.drawImage(mediaFrame, 0, 0, cw, ch);
      }
      this.content.filter = "none";
      const a = this.calculateImage(mw, mh, cw, ch)
      this.content.drawImage(mediaFrame, a.px,a.py, a.pw, a.ph);
      // document.getElementById("main")?.appendChild(this.canvas)
      // console.log({ sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight });
      return this.canvas;
    } catch (e) {
      console.error(frame, e);
    }
    this.content.restore();
  }
}