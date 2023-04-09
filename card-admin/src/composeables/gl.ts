//@ts-ignore
import transitions from "gl-transitions";
import createTransition from "gl-transition";
import createTexture from "gl-texture2d";
import { ref } from "vue";

export const UseGl = (name: string) => {
  const width = ref(720);
  const height = ref(1280);

  let fps = 20;
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;

  const loadImage = (url: string) => {
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
      img.src = url;
    });
  };
  const initGl = async () => {
    const imageFrom = await loadImage(
      "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1650875372331-8eca54d098176049.png"
    );
    const imageTo = await loadImage(
      "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/images/1650876425881-568b6969380e5fdc.png"
    );
    // ^ NB: we just assumed you have these 2 imageFrom and imageTo Image objects that have the image loaded and ready

    const canvas: any = document.getElementById(name);
    const copyCanvas: any = document.getElementById("main2");
    const copyCtx: any =copyCanvas.getContext("2d")
    const gl: any =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 4, 4, -1]), // see a-big-triangle
      gl.STATIC_DRAW
    );
    gl.viewport(0, 0, canvas.width, canvas.height);

    const from = createTexture(gl, imageFrom);
    from.minFilter = gl.LINEAR;
    from.magFilter = gl.LINEAR;

    const to = createTexture(gl, imageTo);
    to.minFilter = gl.LINEAR;
    to.magFilter = gl.LINEAR;

    const transition = createTransition(
      gl,
      transitions.find((t: any) => t.name === "fade")
    ); // https://github.com/gl-transitions/gl-transitions/blob/master/transitions/cube.glsl

    // animates forever!
    const loop = (t: any) => {
     
      let  progress=(t / 1500) % 1
     
      requestAnimationFrame(loop);
      now = Date.now();
        delta = now - then;
        if (delta > interval) {
          then = now - (delta % interval);
          transition.draw((t / 1500) % 1, from, to, canvas.width, canvas.height, {
            persp: 0.5,
            unzoom: 0.6,
          });
          copyCtx.drawImage(gl.canvas, 0, 0);
        }
    };

    return {
      play: loop,
    };
    // requestAnimationFrame(loop);
  };

  return {
    initGl,
  };
};
