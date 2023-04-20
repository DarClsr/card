import { dayjs } from "element-plus"


export const formatTime =(val:string,format:string="YYYY-MM-DD HH:mm:ss")=>{
    if(!val){
        return ""
    }
    return dayjs(val).format(format)
}


export const  expandArr=(arr=[])=>{
    return arr.reduce((list:any[],cur)=>{
      const has=list.includes(cur)
      return list=list.concat(has?[]:cur)
    },[])
  }