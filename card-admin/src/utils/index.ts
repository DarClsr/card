import { dayjs } from "element-plus"


export const formatTime =(val:string,format:string="YYYY-MM-DD HH:mm:ss")=>{
    if(!val){
        return ""
    }
    return dayjs(val).format(format)
}