import { RouteRecordRaw, RouterView } from 'vue-router';

const route:RouteRecordRaw={
    path:"/user",
    name:"管理",
    component:RouterView,
    children:[
        {
            path:"/user_list",
            name:"用户列表",
            component:()=>import("@/views/user/index.vue"),
        }
    ]
};

export default route