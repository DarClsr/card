import { reactive, ref, computed } from "vue";
import { UseMake } from "./make";
import { useScene } from "./scene";

export const UseBuilder = (
  builder_name: string = "main",
  width = 720,
  height = 1280
) => {
  const main_canvas = ref<HTMLCanvasElement | null>(null);
  const { getTemplateData } = UseMake();
  const { playScene } = useScene();
  const template_data = reactive([...getTemplateData()]);
  const scene = ref(0);
  const duration = ref(0);
  const scenes = ref<any>([]);
  const w = ref(width);
  const h = ref(height);
  const player = ref<any>(null);
  let fps = 30;
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;
  const initBuilder = async () => {
    if (!builder_name) {
      throw new Error("canvas id 不能为空");
    }
    main_canvas.value = document.getElementById(
      builder_name
    ) as HTMLCanvasElement;

    main_canvas.value.width = w.value;
    main_canvas.value.height = h.value;
    await loadScenes();
  };

  const loadScenes = async () => {
    for (let index in template_data) {
      const item = template_data[index];
      const { scene, createScene } = useScene();
      await createScene(item, Number(index));
      scenes.value.push(scene.value);
      console.log(scenes.value)
    }
    renderFrame();
  };

  const totalTime = computed(() => {
    return scenes.value.reduce((total: number, cur: any) => {
      return (total += cur.duration * 1000);
    }, 0);
  });

  const currentScene = computed(() => {
    return template_data.findIndex(
      (v) => duration.value >= v.start && duration.value <= v.end
    );
  });

  const renderFrame = (scene = 0) => {
    const can_item = scenes.value[scene]?.c;
    const main_ctx = main_canvas.value?.getContext("2d");
    main_ctx.clearRect(0,0,w.value,h.value)
    main_ctx?.drawImage(can_item, 0, 0, w.value, h.value);
  };

  const render = () => {
    player.value = requestAnimationFrame(() => render());
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      duration.value += Math.floor(interval);
      if (duration.value > totalTime.value) {
        return cancelAnimationFrame(player.value);
      }
      // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
      then = now - (delta % interval);
      const scene = scenes.value[currentScene.value];
      playScene(scene, duration.value); //
      renderFrame(currentScene.value);
    }
  };

  const getFrames=async()=>{
    for(let i in scenes.value){
      // if(i>0 && i<scenes.value.length-1){
      //   // 截取当前场景的最后一帧以及下一个场景的第一帧
      //   // const next
      // }
    }
    const startime=0;
    // const endTime=startime+=scene.value.duration;
  }

  const playing = computed(() => player.value);

  const stop = () => {
    cancelAnimationFrame(player.value);
    duration.value = 0;
  };

  const pause = () => {
    cancelAnimationFrame(player.value);
  };

  return {
    initBuilder,
    loadScenes,
    renderFrame,
    render,
    playing,
    stop,
    pause,
  };
};
