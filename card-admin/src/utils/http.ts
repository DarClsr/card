import axios from "Axios";
import { ElMessage } from "element-plus";
import store from "@/store";

const http=axios.create({
    baseURL:import.meta.env.VITE_API_BASE,
});


// 添加请求拦截器
http.interceptors.request.use(function (config:any) {
    // 统一设置用户身份token
    const user=store.state.token;
    if(user&&user.token){
    config.headers.Authorization=`Bearer ${user.token}`;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 统一处理接口响应错误 比如如token过期 服务端异常
    
    return response;
  }, function (error) {
    const data=error.response?.data;
    // 对响应错误做点什么
    ElMessage.error(data&&data.msg||"请求失败,请稍候重试")
    return Promise.reject(error);
  });


export default http


