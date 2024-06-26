<template>
  <div id="AdminView">
    <h2>热门应用统计</h2>
    <v-chart :option="appAnswerCountOptions" style="height: 450px" />
    <h2>应用结果统计</h2>
    <div class="search-bar">
      <a-input-search
        :style="{ width: '320px' }"
        placeholder="输入应用 id："
        button-text="搜索"
        size="large"
        search-button
        @search="(value) => loadAppAnswerResultCountData(value)"
      />
    </div>
    <div style="margin-bottom: 16px" />
    <v-chart :option="appAnswerResultCountOptions" style="height: 450px" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import VChart from "vue-echarts";
import "echarts";
import API from "@/api";
import {
  getAppAnswerCount,
  getAppAnswerResultCount,
} from "@/api/statisticController";
import message from "@arco-design/web-vue/es/message";

const appAnswerCountList = ref<API.AppAnswerCountVO[]>([]);
const appAnswerResultCount = ref<API.AppAnswerResultCountVO>({});

/**
 * 加载数据
 */
const loadAppAnswerCountData = async () => {
  const res = await getAppAnswerCount();
  if (res.data.code === 0) {
    appAnswerCountList.value = res.data.data || [];
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

// 统计选项
const appAnswerCountOptions = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: appAnswerCountList.value.map((item) => item.app?.appName),
      name: "应用名称",
    },
    yAxis: {
      type: "value",
      name: "用户答案数",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        data: appAnswerCountList.value.map((item) => item.answerCount),
        type: "bar",
        itemStyle: {
          color: "#5eb6f5",
        },
      },
    ],
  };
});

/**
 * 加载数据
 */
const loadAppAnswerResultCountData = async (appId: string) => {
  if (!appId) {
    return;
  }
  const res = await getAppAnswerResultCount({
    appId: appId as any,
  });
  if (res.data.code === 0 && res.data.data) {
    appAnswerResultCount.value = res.data.data;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

// 统计选项
const appAnswerResultCountOptions = computed(() => {
  return {
    title: {
      text: appAnswerResultCount.value.app?.appName,
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "应用答案结果分布",
        type: "pie",
        radius: "50%",
        data: appAnswerResultCount.value.resultList?.map((item) => {
          return { value: item.resultCount, name: item.resultName };
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});

/**
 * 参数改变时触发数据的重新加载
 */
watchEffect(() => {
  loadAppAnswerCountData();
});

/**
 * 参数改变时触发数据的重新加载
 */
watchEffect(() => {
  loadAppAnswerResultCountData("1");
});
</script>

<style scoped>
#AdminView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
