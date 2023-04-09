import { RouteRecordRaw, RouterView } from 'vue-router';

const route:RouteRecordRaw={
    path:"/card",
    name:"card",
    meta:{
        title:"充值卡"
    },
    component:RouterView,
    children:[
        {
            path:"/card_list",
            name:"card_list",
            meta:{
                title:"充值卡列表"
            },
            component:()=>import("@/views/card/index.vue"),
        }
    ]
};

export default route