import { IUserInfo } from '@/api/types/common';
import { createStore } from 'vuex'
import { setItem,getItem } from "@/utils/storage"
import {USER,TOKEN} from "@/utils/constans"
import { getInfo } from '@/api/common';

const state={
  user:getItem<IUserInfo>(USER),
  token:getItem<IUserInfo>(TOKEN)
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
    setToken (state,token) {
      state.token=token;
      setItem(TOKEN,state.token);
    }
  },
  actions:{
    async getInfo({commit}){
      const data=await getInfo();
      commit('setUser',data)
      return data;
    }
  }
})

export default store