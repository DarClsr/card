import { IUserInfo } from '@/api/types/common';
import { createStore } from 'vuex'
import { setItem,getItem } from "@/utils/storage"
import {USER,TOKEN,ROLE,PERMISSION} from "@/utils/constans"
import { getInfo,getMenu,getPermission } from '@/api/common';
import { ElMessage } from 'element-plus';

const state={
  user:getItem<IUserInfo>(USER),
  token:getItem<IUserInfo>(TOKEN),
  permissions: getItem<any>(PERMISSION),
  menus:[]
}

export type  State = typeof state;

// 创建一个新的 store 实例
const store = createStore<State>({
  state,
  mutations: {
    setUser (state,user) {
      state.user=user;
      setItem(USER,state.user);
    },
    setPermission (state,permission) {
      state.permissions=permission;
    },
    setToken (state,token) {
      state.token=token;
      setItem(TOKEN,state.token);
    },
    setMenu(state,menus) {
      state.menus=menus
    }
  },
  actions:{
    async getInfo({commit}){
      try{
        const {data}=await getInfo();
      commit('setUser',data)
      return data;
      }catch(e){
      commit('setUser',null)
      }
    },
    async getPermission({commit}){
      try{
        const {data}=await getPermission();
        commit('setPermission',data)
        return data;
      }catch(e:any){
        // ElMessage.error(e.message)
      }
    },
    async loadMenu({commit}){
      const {data}=await getMenu()
      commit('setMenu',data)
    }
  }
})

export default store