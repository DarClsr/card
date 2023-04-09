import { RouteRecordRaw, RouterView } from 'vue-router';

const route:RouteRecordRaw={
    path:"/shop",
    name:"shop",
    meta:{
        title:"店铺"
    },
    component:RouterView,
    children:[
        {
            path:"/shop_list",
            name:"shop_list",
            meta:{
                title:"店铺列表"
            },
            component:()=>import("@/views/shop/index.vue"),
        }
    ]
};

export default route