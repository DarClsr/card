
import fetchWorker from "./videoWorker?worker";

import PromiseWorker from "promise-worker";

export const useAudioWave =()=>{
    const fetchurl = async (url: string) => {
        return await fetch(url).then((res) => res.arrayBuffer());
      };
      const audioCtx=new AudioContext()
      const source = audioCtx.createBufferSource();
      const fetch_worker = new fetchWorker();
    const promiseWorker = new PromiseWorker(fetch_worker);

    const init=async (url:string,canvas:HTMLCanvasElement,audio:HTMLAudioElement)=>{
        promiseWorker
        .postMessage({
          url,
          type: "FETCH_VIDEO",
        }).then(data=>{
            console.log(data)
            audioCtx.decodeAudioData(data).then(buffer => {
                // decodeAudioData解码完成后，返回一个AudioBuffer对象
                // 绘制音频波形图
                drawWave(buffer,canvas)
                // drawBuffer(canvas.width,canvas.height,canvas.getContext("2d") as CanvasRenderingContext2D,buffer)
                // 连接音频源
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                // 音频数据处理完毕
              });
        })
      
    }

    function drawBuffer( width:number, height:number, context:CanvasRenderingContext2D, buffer:AudioBuffer ) {
        var data = buffer.getChannelData( 0 );
        var step = Math.ceil( data.length / width );
        var amp = height / 2;
        context.fillStyle = '#fa541c';
        const rect_w=1;
        for(var i=0; i < width; i++){
            var min = 10.0;
            var max = -10.0;
            for (var j=0; j<step; j++) {
                var datum = data[(i*step)+j]; 
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            context.fillRect(i,(1+min)*amp,rect_w,Math.max(1,(max-min)*amp));
        }
    }

    function drawLine (buffer:AudioBuffer,canvas:HTMLCanvasElement){
        let data = [];
        let originData = buffer.getChannelData(0);
        // 存储所有的正数据
        let positives = [];
        // 存储所有的负数据
        let negatives = [];
        // 先每隔100条数据取1条
        for (let i = 0; i < originData.length; i += 100) {
          data.push(originData[i]);
        }

        let count = 200;
        let step = Math.round(data.length / count);
        // 再从data中每10条取一个最大值一个最小值
        for (let j = 0, len = count; j < len; j++) {
        //   let temp = data.slice(j * 10, (j + 1) * 10);
          let temp = [data[j * step]];
          positives.push(Math.max.apply(null, temp));
        //   negatives.push(Math.min.apply(null, temp));
        }
      
        // 创建canvas上下文
        if (canvas.getContext) {
          let ctx = canvas?.getContext('2d') as CanvasRenderingContext2D ;
          canvas.width = positives.length;
          let x = 0;
          let y = 105;
          ctx.fillStyle = '#fa541c';
          ctx.beginPath();
          ctx.moveTo(x, y);
          console.log("draw")
          // canvas高度200，横坐标在canvas中点100px的位置，横坐标上方绘制正数据，下方绘制负数据
          // 先从左往右绘制正数据
          // x + 0.5是为了解决canvas 1像素线条模糊的问题
          for (let k = 0; k < positives.length; k++) {
            console.log(
                {
                    y: canvas.height / 2,
                    x:canvas.width / 2 + k * 10,
                    w:5,
                    h: positives[k]
                }
            )
            ctx.fillRect(canvas.width / 2 + k * 10, canvas.height / 2, 5, positives[k] * 105);
            // ctx.fillRect(x + k * 10, y - (105 * positives[k]),10,y - (105 * positives[k]));
          }
          
          // 再从右往左绘制负数据
        //   for (let l = negatives.length - 1; l >= 0; l--) {
        //     ctx.lineTo(x + l + 0.5, y + (100 * Math.abs(negatives[l])));
        //   }
          // 填充图形
        //   ctx.fill();
        }
    }
    function drawWave (buffer:AudioBuffer,canvas:HTMLCanvasElement) {
        // buffer.numberOfChannels返回音频的通道数量，1即为单声道，2代表双声道。这里我们只取一条通道的数据
        let data = [];
        let originData = buffer.getChannelData(0);
        // 存储所有的正数据
        let positives = [];
        // 存储所有的负数据
        let negatives = [];
        // 先每隔100条数据取1条
        for (let i = 0; i < originData.length; i += 100) {
          data.push(originData[i]);
        }
        // 再从data中每10条取一个最大值一个最小值
        for (let j = 0, len = Math.floor(data.length / 100); j < len; j++) {
          let temp = data.slice(j * 100, (j + 1) * 100);
          positives.push(Math.max.apply(null, temp));
        //   negatives.push(Math.min.apply(null, temp));
        }
      
        // 创建canvas上下文
        if (canvas.getContext) {
          let ctx = canvas?.getContext('2d') as CanvasRenderingContext2D ;
          canvas.width = positives.length;
          console.log(canvas.height,"height")
          let x = 0;
          let y = canvas.height
          ctx.fillStyle = '#fa541c';
          ctx.beginPath();
          ctx.moveTo(x, y);
          let w=10
          // canvas高度200，横坐标在canvas中点100px的位置，横坐标上方绘制正数据，下方绘制负数据
          // 先从左往右绘制正数据
          // x + 0.5是为了解决canvas 1像素线条模糊的问题
          for (let k = 0; k < positives.length; k++) {
            // ctx.lineTo(x + k + 0.5, y - (canvas.height * positives[k]));
            let h=canvas.height + y - (canvas.height * positives[k])
            ctx.fillRect(x + k *10, y - (canvas.height * positives[k]),w,h);
          }
          
          // 再从右往左绘制负数据
          for (let l = negatives.length - 1; l >= 0; l--) {
            ctx.lineTo(x + l + 0.5, y + (canvas.height * Math.abs(negatives[l])));
          }
          // 填充图形
          ctx.fill();
        }
      };

      return {
        init
      }

}