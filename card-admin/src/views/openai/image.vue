<template>
  <div class="image">
    <el-input class="t-mt-4" v-model="keyword" />
    <el-button @click="search">搜索</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from "vue";

const keyword = ref("");

const search=()=>{

    

}


const fetchSse=()=>{

    const event=new EventSource("http://localhost:7002/admin/api/stream")

    event.onmessage=(e)=>{
        console.log(e,e.data)
    }

}

onMounted(()=>{
    fetchSse()
})



</script>
