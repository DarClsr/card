<template>
     <img class="t-w-full"
      :style="{
        width:w+'px',
        height:h+'px'
      }"
     src="https://th.bing.com/th/id/OIP.avb9nDfw3kq7NOoP0grM4wHaEK?pid=ImgDet&rs=1" />
</template>
<script lang="ts" setup>
import { ref,defineProps } from "vue";

const props=defineProps({
    w:{
        type:Number,
        default:100
    },
    h:{
        type:Number,
        default:100
    },
    x:{
        type:Number,
        default:100
    },
    y:{
        type:Number,
        default:100
    }
})
</script>
