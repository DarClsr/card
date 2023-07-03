import { RouteRecordRaw, RouterView } from 'vue-router';

const route:RouteRecordRaw={
    path:"/template",
    name:"template",
    meta:{
        title:"模板"
    },
    component:RouterView,
    children:[
        {
            path:"/template_list",
            name:"template_list",
            meta:{
                title:"模板列表"
            },
            component:()=>import("@/views/template/index.vue"),
        }
    ]
};

export default route