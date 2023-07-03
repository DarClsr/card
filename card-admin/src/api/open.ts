import http from "@/utils/http";

// export const getText =  (word:string="你好") => {
//   return  http.post("open/word",{
//     word
//   },{
//     responseType:"stream",
//   });
// };


export const getText =  (word:string="你好") => {
  return  http.get("stream",{
    responseType:"stream"
  });
};