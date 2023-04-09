export const drag ={
    beforeMount: (el:HTMLInputElement) => {
        console.log(el)
        let isDrag=false;
        const width=el.offsetWidth;
        el.addEventListener("mousedown",()=>{
             isDrag=true;
        })

        el.addEventListener("mousemove",()=>{
            el.style.width=width+100+"px";
        })

        el.addEventListener("mouseup",()=>{
            isDrag=false;
       })
        // 在元素上做些操作
    },
    
}