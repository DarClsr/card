

import "./polyfills"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import  ElementPlus  from './plugins/element-plus';
import "./router/modules/permission"
import "@/styles/taild.css"


import {useDirective} from '@/directives/index'

const app=createApp(App)


useDirective(app)





app.use(router as any)
.use(store).use(ElementPlus)
.mount('#app')
