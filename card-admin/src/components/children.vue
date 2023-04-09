<template>
    <div id="children">
        {{props.title}}
        <button @click="pushMessage">子传值给父组件</button>
    </div>
</template>
<script lang="ts" setup>
import {defineProps,defineEmits} from "vue"

// 父子组件通信
// props
const props=defineProps({
    title:{
        type:String
    }
})

// emit
// const emit = defineEmits(["push"])
const emit = defineEmits(["childClick"]);  

const pushMessage=()=>{
   emit("childClick",1)
}

</script>