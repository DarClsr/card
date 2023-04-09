import { RouteRecordRaw, RouterView } from 'vue-router';

const route:RouteRecordRaw={
    path:"/video",
    name:"video",
    meta:{
        title:"制作视频"
    },
    component:RouterView,
    children:[
        {
            path:"/video_make",
            name:"video_make",
            meta:{
                title:"制作视频"
            },
            component:()=>import("@/views/video/make.vue"),
        }
    ]
};

export default route