

import "./polyfills"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import  ElementPlus  from './plugins/element-plus';
import "./router/modules/permission"
import "@/styles/taild.css"





createApp(App)
.use(router)
.use(store).use(ElementPlus)
.mount('#app')
