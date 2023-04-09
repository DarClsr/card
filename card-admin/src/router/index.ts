import { useStore } from 'vuex';
import { createRouter, RouteRecordRaw,createWebHashHistory } from "vue-router";
import shopRoute from "./modules/shop"
import cardRoute from "./modules/card"
import VideoRoute from "./modules/video"
import gameRoute from "./modules/game"
import "nprogress/nprogress.css"
import Layout from "@/layout/layout.vue"
import { RouterView } from 'vue-router';


const asyncRoutes=[
    {
        path:"/menu",
        name:"菜单",
        meta:{
            title:"店铺",
            requireAuth:true,
        },
        component:RouterView,
        children:[
            {
                path:"/menu_list",
                name:"菜单管理",
                meta:{
                    title:"菜单列表"
                },
                component:()=>import("@/views/menu/index.vue"),
            }
        ]
    }
]

const routes:RouteRecordRaw[]=[
   {
       path:"/",
       component:Layout,
       meta:{
           requireAuth:true
       },
       children:[
        {
            path:"/",
            name:"home",
            meta:{
                title:"首页"
            },
            component:()=>import("../views/home/index.vue")
        },
        shopRoute,
        cardRoute,
        VideoRoute,
        gameRoute,
        ...asyncRoutes,
       ]
   },
   {
    path:"/login",
    name:"login",
    component:()=>import("../views/login/index.vue")
    },
    {
    path: "/:pathMatch(.*)*",
    name:"404",
    component:()=>import("../views/404/index.vue")
    }
]



const router=createRouter({
    history:createWebHashHistory(),
    routes
})


export default router