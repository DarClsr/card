import { RouteRecordRaw, RouterView } from 'vue-router';

const route:RouteRecordRaw={
    path:"/game",
    name:"game",
    meta:{
        title:"游戏"
    },
    component:RouterView,
    children:[
        {
            path:"/game_list",
            name:"game_list",
            meta:{
                title:"游戏列表"
            },
            component:()=>import("@/views/game/list.vue"),
        },
        {
            path:"/first_game",
            name:"first_game",
            meta:{
                title:"第一个游戏"
            },
            component:()=>import("@/views/game/first_game.vue"),
        }
    ]
};

export default route