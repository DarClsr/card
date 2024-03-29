interface IOptions {
  index?: number;
  fftSize?: number;
  volume?: number;
  cacheCount?: number;
  baseUrl?: string;
  request?: (options: IOptions) => ArrayBuffer;
  playermode?: "single";
  autoplay?: boolean;
}
type PlayingState = "suspended" | "running";
interface ICacheItem {
  url: string;
  data: AudioBuffer;
}

type handler = () => void;

const defaultOptions: IOptions = {
  index: 0,
  fftSize: 256,
  volume: 1,
  baseUrl: "",
  autoplay: true,
};

export function createPlayer(
  resource: string | string[],
  options: IOptions = {}
) {
  return new Player(resource, options);
}

export class Player {
  //#region 变量
  private options: IOptions;
  private playingState: PlayingState = "suspended";
  private decodedData: AudioBuffer | any[] = [];
  private analyser: AnalyserNode | any = null;
  private urlList: string[] = [];
  private duration: number = 0;
  private delta = 0;
  private firstPlay = true;
  private ctx: AudioContext = new AudioContext();
  private gain: GainNode = this.ctx.createGain();
  private errorUrl = "";
  private source: AudioBufferSourceNode = this.ctx.createBufferSource();
  private cache: ICacheItem[] = [];
  //#endregion
  public onload: handler = () => {};

  constructor(resource: string | string[], options: IOptions = {}) {
    this.options = { ...defaultOptions, ...options };
    this.initParams();
    this.initSource(resource);
    this.initAnalyser();
  }
  private initParams() {
    this.ctx = new window.AudioContext();
    this.pause();
    this.gain = this.ctx.createGain();
    this.gain.connect(this.ctx.destination);
  }
  private initSource(resource: string | string[]) {
    if (typeof resource === "string") {
      this.options.index = 0;
      this.urlList.push(resource);
    } else if (Array.isArray(resource)) {
      this.urlList = resource;
    } else {
      throw new Error("resource expected a string url or Array url");
    }
    this.initRequest();
  }
  private initRequest() {
    const resource = this.urlList[this.options.index ?? 0];
    if (typeof resource !== "string") {
      throw new Error("resource expected a string url");
    }
    if (this.options.request) {
      this.initDecode(this.options.request(this.options), resource);
      return;
    }
    this.request(resource)
      .then((data) => {
        this.initDecode(data, resource);
      })
      .catch((err) => {
        if (this.errorUrl) {
          if (this.errorUrl !== resource) {
          }
        } else {
          this.errorUrl = resource;
        }
      });
  }
  private request(url: string) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onreadystatechange = (e) => {
        e.preventDefault();
        const { status, readyState, statusText } = xhr;
        if (readyState === 4) {
          if ((status >= 200 && status < 300) || status === 304) {
            resolve(xhr.response);
          } else {
            reject(`status: ${status}, ${statusText}`);
          }
        }
      };
      xhr.onerror = reject.bind(this, "error");
      xhr.ontimeout = reject.bind(this, "request timerout！");
      xhr.send();
    });
  }
  private pushCache(item: ICacheItem) {
    if (this.options.cacheCount === this.cache.length) {
      this.cache.shift();
    }
    this.cache.push(item);
  }
  private initDecode(data: ArrayBuffer, url?: string) {
    this.ctx
      .decodeAudioData(data)
      .then((decodedData) => {
        if (url) {
          this.pushCache({ url, data: decodedData });
        }
        this.initBufferSource(decodedData);
        !this.options.autoplay && this.pause();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  private bindLoad() {
    this.onload && this.onload();
    this.options.autoplay && this.play();
  }
  private bindEnded() {
    this.source.onended = () => {
      if (this.options.playermode === "single") {
        this.start(0);
      }
    };
  }

  private initAnalyser() {
    const fftSize = this.options.fftSize;
    if (typeof fftSize === "number") {
      this.analyser = this.ctx.createAnalyser();
      const size = fftSize;
      this.analyser.fftSize = size;
      this.analyser.connect(this.gain);
    } else if (fftSize !== false) {
      throw new Error("fftSize expected a number");
    }
  }
  private initBufferSource(decodedData: AudioBuffer) {
    this.source = this.ctx.createBufferSource();
    this.decodedData = decodedData;
    this.source.buffer = this.decodedData;
    this.duration = this.source.buffer.duration;
    this.source.connect(this.analyser ? this.analyser : this.gain);
    this.bindEnded();
    this.onload();
  }
  private start(offset: number) {
    if (typeof offset !== "number") {
      offset = 0;
      throw new Error("the offset is expected to be a number");
    }
    if (this.duration < offset || offset < 0) {
      offset = 0;
      throw new Error(
        `value is out of range, expected range from 0 to ${this.duration}`
      );
    }
    if (!this.source) {
      console.warn("using play method after onload");
      return;
    }
    this.delta = this.ctx.currentTime - offset;
    if (!this.firstPlay) {
      this.source.onended = null;
      this.source.stop();
      this.initBufferSource(this.decodedData as AudioBuffer);
    }
    this.source.start(this.ctx.currentTime, offset);
    this.playingState = "running";
    this.firstPlay = false;
    this.bindLoad();
  }

  public setUrlList(list: string[]) {
    if (!Array.isArray(list)) {
      throw new Error("list expected a string array");
    }
    this.urlList = list;
    this.options.index = 0;
    this.reset();
  }
  public setOptions(options: IOptions) {
    let { playermode: playMode, volume } = options ? options : this.options;
    if (playMode != null) {
      this.setPlayMode(playMode);
    }
    if (volume != null) {
      this.setVolume(volume);
    }
  }
  public setVolume(val = 1) {
    if (typeof val !== "number") {
      throw new Error("val expected a number");
    }
    if (val < 0 || val > 1) {
      throw new Error("expected range from 0 to 1");
    }
    this.gain.gain.value = val ** 2;
    this.options.volume = val;
  }
  public setPlayMode(playMode: any) {
    if (typeof playMode !== "boolean") {
      throw new Error("playMode expected a boolean");
    }
    this.options.playermode = playMode as any;
  }

  public play(): void;
  public play(offset: number): void;
  public play(offset?: number) {
    if (this.firstPlay) {
      this.start(0);
    } else if (this.ctx.state === "suspended") {
      this.ctx.resume();
      this.playingState = "running";
    } else if (typeof offset === "number") {
      this.start(offset);
    } else {
    }
  }
  public reset() {
    if (this.source) {
      this.pause();
      if (!this.firstPlay) {
        this.source.stop();
      }
      this.source.onended = null;
      this.firstPlay = true;
    }
    const url = this.urlList[this.options.index ?? 0];
    const item = this.cache.find((v) => v.url === url);
    if (item) {
      this.initBufferSource(item.data);
      this.play(0);
    } else {
      this.initRequest();
    }
  }
  public pause() {
    if (this.ctx.state === "running") {
      this.ctx.suspend();
    }
    this.playingState = "suspended";
  }
  public toggle() {
    this.playingState === "running" ? this.pause() : this.play();
  }
  public getBuffer() {
    return this.decodedData;
  }
  public getData(): Uint8Array {
    if (!this.analyser) {
      return null;
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
  public getCurrentTime() {
    return Math.min(this.ctx.currentTime - this.delta, this.duration);
  }
  public getPlayingState() {
    return this.playingState;
  }

  public getVolumn() {
    return this.gain.gain.value / 100;
  }

  getProgress() {
    return (this.ctx.currentTime / this.duration) * 100;
  }
}
