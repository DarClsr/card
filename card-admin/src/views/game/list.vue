<template>
  <div class="bg-white p-2">
    <el-row gutter="32">
      <el-col
        v-for="(o, index) in games"
        :key="o"
        :md="4"
        :sm="6"
        :xl="4"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card
          :body-style="{ padding: '5px' }"
          class="game-item shadow-transtion"
        >
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>{{ o.name }}</span>
            <div
              class="bottom d-flex align-item-center justify-content-between"
            >
              <time class="time fs-12">{{ o.create_time }}</time>
              <el-button type="text" @click="playItem(o)">开始</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface IGame {
  text: string;
  name: string;
  create_time: string;
  path: string;
  cover: string;
}

const games = reactive<IGame[]>([
  {
    text: "",
    name: "第一个游戏",
    create_time: dayjs("2023-1-12 13:46:00").format("YYYY-MM-DD HH:mm:ss"),
    cover:"",
    path: "/first_game",
  },
]);

const playItem = (item: IGame) => {
  router.push({
    path: item.path,
  });
};
</script>
