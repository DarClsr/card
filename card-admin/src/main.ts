

import "./polyfills"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import  ElementPlus  from './plugins/element-plus';
import "./router/modules/permission"
import "@/styles/taild.css"

import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'


import {useDirective} from '@/directives/index'

const app=createApp(App)


useDirective(app)





app.use(router as any)
.use(Vue3DraggableResizable)
.use(store).use(ElementPlus)
.mount('#app')
