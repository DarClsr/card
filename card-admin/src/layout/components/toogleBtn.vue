<template>
  <div class="toggle" @click="toggle">
    <el-icon :size="24" color="#525f7f" >
      <fold v-if="isCollapse" />
      <expand v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";

const props = defineProps({
  isCollapse: Boolean,
});

const emit = defineEmits(["toggle"]);
const toggle = () => {
  console.log("toggle btn");
  emit("toggle", !props.isCollapse);
};
</script>

<style lang="scss" scoped>
.toggle {
  cursor: pointer;
  line-height: 60px;
  display: flex;
  align-items: center;
}
</style>
