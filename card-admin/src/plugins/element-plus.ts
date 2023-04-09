

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/styles/index.scss"

import {App} from "vue";

export default {
    install(app:App){
        app.use(ElementPlus,{size:"samll"})
    }
}