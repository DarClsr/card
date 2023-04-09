import { ref } from "vue"

export const useMedia = ()=>{

    const el=ref<HTMLImageElement | HTMLVideoElement |null>(null);
    const width=ref(0);
    const height=ref(0);
    const duration=ref(0);
    const effect_type=ref("");

    const getMediaType=(url:string)=>{
        const [src, params] = url.split("?");
        const ext:string = src.split(".").pop() ?? "";
        let type="";
        if (["jpg"].includes(ext)) {
          type = "image";
        }
        if (["mp4"].includes(ext)) {
          type = "video";
        }
        return type;
    }

    const loadMedia = (url:string)=>{
        effect_type.value=getMediaType(url);
        if(effect_type.value=="image"){
            el.value=document.createElement("img")
        }

        if(effect_type.value=="video"){
            el.value=document.createElement("video");
            el.value.preload="auto";
            el.value.loop=false;
            el.value.muted=true;
        }

        return new Promise((resolve,reject)=>{
            if(effect_type.value=="image"){
                el.value?.addEventListener("load",()=>{
                    width.value=(el.value as HTMLImageElement).naturalWidth;
                    height.value=(el.value as HTMLImageElement).naturalHeight;
                    resolve({
                        effect:el.value,
                        w:width.value,
                        h:height.value,
                        type:effect_type
                    }) 
                })
            }

            if(effect_type.value=="video"){
                el.value?.addEventListener("loadeddata",()=>{
                    width.value=(el.value as HTMLVideoElement).videoWidth;
                    height.value=(el.value as HTMLVideoElement).videoHeight;
                    duration.value=(el.value as HTMLVideoElement).duration;
                    resolve({
                        effect:el.value,
                        w:width.value,
                        h:height.value,
                        duration:duration.value,
                        type:effect_type
                    }) 
                })
            }
            el.value?.setAttribute("src",url);
        })
    }

    return {
        loadMedia,
    }
}