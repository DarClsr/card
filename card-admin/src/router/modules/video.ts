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
        },
        {
            path:"/video_frame",
            name:"video_frame",
            meta:{
                title:"视频截帧"
            },
            component:()=>import("@/views/video/frame.vue"),
        },
        {
            path:"/dubbing",
            name:"dubbing",
            meta:{
                title:"配音截取"
            },
            component:()=>import("@/views/video/dubbing.vue"),
        }
    ]
};

export default route