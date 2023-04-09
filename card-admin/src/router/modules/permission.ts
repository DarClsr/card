

import router from '../'
import store from "@/store";
import nprogress from "nprogress"

import "nprogress/nprogress.css"
import { NavigationFailure,RouteLocationNormalized } from 'vue-router';

router.beforeEach(async (to:RouteLocationNormalized,from:RouteLocationNormalized)=>{
    nprogress.start();
    const isLogin=store.state.user && store.state.token;
    if(to.meta.requireAuth){
       if(!isLogin){
         return {
                path:"/login",
                query:{
                    redirect:to.fullPath
                }
         }
       }else {
        const info=await store.dispatch("getInfo");
        console.log({
            info
        })
        return true;
       }
    }
})

router.afterEach(()=>{
    nprogress.done();
})
