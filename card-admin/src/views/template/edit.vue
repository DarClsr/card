<template>
  <el-drawer v-model="visible" title="添加模板" size="100%">
    <div class="main t-flex">
      <div class="components">
        <el-button
          v-for="item of components"
          :key="item.key"
          @click="addItem(item)"
        >
          {{ item.name }}
        </el-button>
      </div>
      <div class="container t-flex t-justify-center">
        <div
          class="content"
          :style="{ width: w * scale + 'px', height: h * scale + 'px' }"
        >
          <Vue3DraggableResizable
            :parent="true"
            v-bind="item.props"
            v-for="(item, index) in model.list"
            @resizing="(val) => onResize(index, val)"
            :key="index"
            :minH="item.props.minH"
            :zIndex="item.zIndex"
          >
            <component :is="item.com" v-bind="item.props" />
          </Vue3DraggableResizable>
        </div>
      </div>

      <div class="editbox">edit</div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, defineExpose, reactive, shallowRef, markRaw } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import tImage from "./components/image.vue";
import tIcon from "./components/icon.vue";
import { Ticket } from "@element-plus/icons-vue/dist/types";

const visible = ref(false);
const w = ref(720);
const h = ref(1280);
const model = ref<any>({
  template_type: "",
  list: [],
});

const scale = ref(0.4);

const onResize = (index: number, data: any) => {
  model.value.list[index].props = {
    ...data,
  };
};

const comPage = reactive<any>({
  image: markRaw(tImage),
  icon: markRaw(tIcon),
});

const components = ref([
  {
    name: "贴图",
    key: "image",
    props: {
      x: 0,
      y: 0,
      w: w.value * scale.value,
      h: 150,
      minW:150,
      minH:150,
      resizable:true
    },
  },
  {
    name: "图标",
    key: "icon",
    props: {
      x: 0,
      y: 0,
      w: 30,
      h: 30,
      minW:30,
      minH:30
    },
  },
]);

const addItem = (item: any) => {
  const max_zIndex = model.value.list.lenght - 1;
  console.log(item)
  model.value.list.push({
    name: item.name,
    com: comPage[item.key],
    props: {
      ...item.props,
      zIndex: max_zIndex < 0 ? 0 : max_zIndex + 1,
    },
  });
};

const show = (data: any) => {
  visible.value = true;
  if (data) {
    model.value = data;
  }
};

defineExpose({
  show,
});
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  border-top: 1ps solid #ececec;
}

.main .components {
  width: 20%;
  border-right: 1px solid #ececec;
}
.main .container {
  width: 60%;
}
.main .editbox {
  width: 20%;
  border-left: 1px solid #ececec;
}
.main .content {
  position: relative;
  border: 1px solid #ececec;
}
</style>
