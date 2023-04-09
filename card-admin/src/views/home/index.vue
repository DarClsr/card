<template>
  <div id="home">
    <el-row gutter="20">
      <el-col :md="6" class="mb-3" v-for="col in homeList" :key="col.type">
        <div class="chart-item">
          <div class="content">
            <span class="title mb-3"> {{ col.name }} </span>
            <h4 class="count mb-3">{{ col.count }}</h4>
            <p class="time">
              <el-tag class="ml-2" type="success">+ 5%</el-tag>
              <span class="text title">最近一周</span>
            </p>
          </div>
          <div class="chart">
            <vue-apex-charts
              type="area"
              height="100%"
              :options="col.options"
              :series="col.series"
            ></vue-apex-charts>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const homeList = ref([
  {
    name: "用户人数",
    type: "user",
    count: 100,
    color: "success",
    options: {
      chart: {
        type: "line",

        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#5156be'],
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
  },
  {
    name: "充值金额",
    type: "money",
    count: 10000,
    color: "error",
     options: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
  },
  {
    name: "关联店铺",
    type: "shop",
    count: 50,
    color: "success",
     options: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#5156be'],
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
  },
  {
    name: "管理员",
    type: "admin",
    count: 20,
    color: "error",
     options: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
#home {
  padding: 20px;
  background-color: #fff;
  height: 100%;
  .chart-item {
    background-color: #fff;
    width: 100%;
    height: 150px;
    padding: 1.25rem;
    box-sizing: border-box;
    display: flex;
    border: 1px solid #e9e9ef;
    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1.2rem;
      flex: 2;
      justify-content: space-around;
      align-items: flex-start;
      .title {
        text-align: left;
        color: #74788d;
        font-size: 0.5rem;
      }
      .time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }

    .chart {
      height: 100%;
      flex: 3;
    }
  }
}
</style>
