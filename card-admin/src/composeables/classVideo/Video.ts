import { fabric } from 'fabric';
export class Video {
  public url: string = '';
  public control: boolean = true;
  public video: HTMLVideoElement = document.createElement('video');
  public frames: Array<HTMLCanvasElement | fabric.Canvas> = [];
  public duration: number = 0;
  public currentTime: number = 0;

  public setUrl(url: string) {
    this.video.src = url;
    this.url = url;
  }

  public resetFrames() {
    this.frames = []
  }

  public async init(url?: string) {
    this.video.loop = false;
    this.video.preload = "auto";
    this.video.muted = true;
    this.currentTime = this.video.currentTime;
    this.video.crossOrigin = "anonymous";
    await new Promise((r) => this.video.addEventListener('loadedmetadata', r));
    this.duration = this.video.duration;
  }

  public pause() {
    this.video.pause()
  }

  public setCurrentTime(t: number, isSync: boolean = true) {
    if (isSync) {
      this.video.currentTime = t;
      this.currentTime = t;
    } else {
      this.currentTime = t;
    }
  }

  public play(t: number = -1) {
    this.pause();
    if (t > -1) {
      this.currentTime = t;
      this.video.currentTime = t;
    }
    this.video.play();
  }



  public async fetchFrames(from: number, duration = 1) {
    const { videoWidth: vw, videoHeight: vh } = this.video;
    this.resetFrames()
    let cw = Math.min(720, vw)
    let ch = vh / (vw / cw)

    await new Promise((r) => (this.video.oncanplay = () => r(true)));
    await this.video.play();
    // 确保不要超出视频长度
    const end = Math.min(this.video.duration, from + duration);

    const fetchFrame = async (resolve?: { (value: unknown): void; (arg0: boolean): void; }) => {
      const i = Math.round((this.video.currentTime - from) * 25);
      if (!this.frames[i]) {        
        //@ts-ignone
        const canvas = new OffscreenCanvas(cw, ch)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(this.video, 0, 0, cw, ch)
        this.frames[i] = canvas
      }
      if (this.video.currentTime >= end) {
        this.video.pause();
        resolve?.(true);
        return;
      }
      requestAnimationFrame(() => fetchFrame(resolve));
    };

    await new Promise((r) => fetchFrame(r));
    return frames;
  }
}