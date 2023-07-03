<template>
  <div class="template-layout">
    <div class="top t-flex t-justify-end t-mt-3">
      <el-button :icon="Plus" type="primary" @click="add()">新建</el-button>
    </div>
    <editBox ref="editBox" />
    <TimeLine/>
  </div>
</template>
<script lang="ts" setup>
import { Edit, Plus, RemoveFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import EditBox from "./edit.vue"
import TimeLine from "./components/timeLine.vue"
import  Store from "@/hook/useCutVideo/store";

 
const editBox=ref()
const add=(data=null)=>{
    editBox.value.show(data)
}


Store.useProvider();

</script>