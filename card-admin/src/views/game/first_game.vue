<template>
  <div class="bg-white p-2 game">
    <div class="main-cover">
      <el-button type="primary">开始游戏</el-button>
      <div id="game-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RenderGame } from "@/composeables/game/index";
import { nextTick } from "process";
import { onMounted, ref } from "vue";

const render = ref<any>(null);
const renderGame = () => {
  render.value = new RenderGame({
    parent:"game-container",
    width:1200,
    height:400,
    backgroundColor:"#fff",
    canvasStyle:"border:1px solid red",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
  });
};

onMounted(()=>{
  nextTick(()=>{
    renderGame()

  })
})
</script>

<style scoped lang="scss">
.game {
  #game-container{
    margin-top: 20px;
    background-color: azure;
    canvas{
      border: 1px solid red;
    }
  }
}

</style>
