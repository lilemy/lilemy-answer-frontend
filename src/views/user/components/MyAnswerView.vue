<template>
  <div id="myAnswerView">
    <a-form
      :model="formSearchParams"
      :style="{ marginBottom: '20px' }"
      layout="inline"
      @submit="doSearch"
    >
      <a-form-item field="resultName" label="结果名称：">
        <a-input
          v-model="formSearchParams.resultName"
          placeholder="请输入结果名称："
          allow-clear
        />
      </a-form-item>
      <a-form-item field="resultDesc" label="结果描述：">
        <a-input
          v-model="formSearchParams.resultDesc"
          placeholder="请输入结果描述："
          allow-clear
        />
      </a-form-item>
      <a-form-item field="appId" label="应用 id：">
        <a-input
          v-model="formSearchParams.appId"
          placeholder="请输入应用 id："
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100px">
          搜索
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-table
    :columns="columns"
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
    @page-change="onPageChange"
    :scroll="scroll"
    :sticky-header="true"
  >
    <template #resultPicture="{ record }">
      <a-image width="64" :src="record.resultPicture" />
    </template>
    <template #appType="{ record }">
      {{ APP_TYPE_MAP[record.appType] }}
    </template>
    <template #scoringStrategy="{ record }">
      {{ APP_SCORING_STRATEGY_MAP[record.scoringStrategy] }}
    </template>
    <template #createTime="{ record }">
      {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
    <template #updateTime="{ record }">
      {{ dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button status="success" :href="`/answer/result/${record.id}`">
          查看详细
        </a-button>
        <a-button status="danger" @click="doDelete(record)">删除</a-button>
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  deleteUserAnswer,
  listMyUserAnswerVoByPage,
} from "@/api/userAnswerController";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";

const scroll = {
  x: "150%",
};

const formSearchParams = ref<API.UserAnswerQueryRequest>({});

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 5,
};

const searchParams = ref<API.UserAnswerQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.UserAnswerVO[]>([]);
const total = ref<number>(0);

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await listMyUserAnswerVoByPage(searchParams.value);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 执行搜索
 */
const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
};

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 删除
 * @param record
 */
const doDelete = async (record: API.UserAnswer) => {
  if (!record.id) {
    return;
  }

  const res = await deleteUserAnswer({
    id: record.id,
  });
  if (res.data.code === 0) {
    await loadData();
  } else {
    message.error("删除失败，" + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
// 表格列配置
const columns = [
  {
    title: "选项",
    dataIndex: "choices",
    width: 150,
    minWidth: 80,
  },
  {
    title: "名称",
    dataIndex: "resultName",
    width: 150,
    minWidth: 80,
  },
  {
    title: "描述",
    dataIndex: "resultDesc",
    width: 700,
  },
  {
    title: "图片",
    dataIndex: "resultPicture",
    slotName: "resultPicture",
    width: 80,
  },
  {
    title: "得分",
    dataIndex: "resultScore",
    width: 100,
  },
  {
    title: "应用 id",
    dataIndex: "appId",
    width: 200,
  },
  {
    title: "应用类型",
    dataIndex: "appType",
    slotName: "appType",
    width: 100,
  },
  {
    title: "评分策略",
    dataIndex: "scoringStrategy",
    slotName: "scoringStrategy",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
    width: 150,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 200,
  },
];
</script>

<style scoped>
#myAnswerView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
