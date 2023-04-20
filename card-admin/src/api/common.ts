import http from "@/utils/http";

import { ILoginParams } from './types/common';
import { ILoginInfo } from './types/common';
// 公共接口



/**
 * 登录
 * @param  account password
 * @returns  
 */
export const login=(params:ILoginParams)=>{
    return http.post<ILoginInfo>("auth/login",params)
}

/**
 * 退出登录
 * 
 */
 export const logout=()=>{
    return http.post("auth/logout")
}

/**
 * 百度网盘授权
 * 
 */
 export const authDisk=()=>{
    return http.get("auth/netDisk")
}

/**
 * 获取用户信息
 * @param  account password
 * @returns  
 */
export const getInfo=()=>{
    return http.get("auth/info")
}


/**
 * 获取用户菜单
 * @param  account password
 * @returns  
 */
export const getMenu=()=>{
    return http.get("auth/menu")
}

/**
 * 获取用户操作权限
 * @param  account password
 * @returns  
 */
export const getPermission=()=>{
    return http.get("auth/permission")
}