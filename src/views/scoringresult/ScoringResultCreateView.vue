<template>
  <div id="scoringResultCreateView">
    <h2 style="margin-bottom: 32px">评分结果</h2>
    <a-descriptions :column="1" size="large">
      <a-descriptions-item label="应用名称：">
        {{ appData?.appName }}
      </a-descriptions-item>
      <a-descriptions-item label="应用类型：">
        {{ appData?.appType ? "测评类" : "得分类" }}
      </a-descriptions-item>
    </a-descriptions>
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
    >
      <template #resultPicture="{ record }">
        <a-image width="64" :src="record.resultPicture" />
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button status="success" @click="doUpdate?.(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
    <a-form
      :model="form"
      :style="{ width: '480px' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <h2>设置评分</h2>
      <a-form-item v-if="updateId" label="修改评分 id">
        {{ updateId }}
      </a-form-item>
      <a-form-item field="resultName" label="结果名称">
        <a-input v-model="form.resultName" placeholder="请输入结果名称" />
      </a-form-item>
      <a-form-item field="resultDesc" label="结果描述">
        <a-input v-model="form.resultDesc" placeholder="请输入结果描述" />
      </a-form-item>
      <a-form-item field="resultPicture" label="结果图标">
        <a-input
          v-model="form.resultPicture"
          placeholder="请输入结果图标地址"
        />
      </a-form-item>
      <a-form-item
        v-if="appData?.appType === 1"
        field="resultProp"
        label="结果集"
      >
        <a-input-tag
          v-model="form.resultProp"
          :style="{ width: '320px' }"
          placeholder="请输出结果集，按回车确认"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        v-if="appData?.appType === 0"
        field="resultScoreRange"
        label="结果得分范围"
      >
        <a-input-number
          v-model="form.resultScoreRange"
          placeholder="请输入结果得分范围"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import API from "@/api";
import {
  addScoringResult,
  deleteScoringResult,
  editScoringResult,
  listScoringResultVoByPage,
} from "@/api/scoringResultController";
import message from "@arco-design/web-vue/es/message";
import { getAppVoById } from "@/api/appController";
import dayjs from "dayjs";

interface Props {
  appId: string;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});

const appData = ref<API.AppVO>();

// 表单参数
const form = ref({
  resultDesc: "",
  resultName: "",
  resultPicture: "",
} as API.ScoringResultAddRequest);

const formSearchParams = ref<API.ScoringResultQueryRequest>({});

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 10,
  sortField: "createTime",
  sortOrder: "descend",
};

const searchParams = ref<API.ScoringResultQueryRequest>({
  ...initSearchParams,
});

const tableRef = ref();
const updateId = ref<any>();
const dataList = ref<API.ScoringResultVO[]>([]);
const total = ref<number>(0);

/**
 * 修改
 * @param scoringResult
 */
const doUpdate = (scoringResult: API.ScoringResultVO) => {
  updateId.value = scoringResult.id;
  form.value = scoringResult;
};

/**
 * 删除
 * @param record
 */
const doDelete = async (record: API.ScoringResult) => {
  if (!record.id) {
    return;
  }

  const res = await deleteScoringResult({
    id: record.id,
  });
  if (res.data.code === 0) {
    loadData();
  } else {
    message.error("删除失败，" + res.data.message);
  }
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

const loadData = async () => {
  if (!props.appId) {
    return;
  }
  const params = {
    appId: props.appId as any,
    ...searchParams.value,
  };
  const res = await listScoringResultVoByPage(params);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
  const app = await getAppVoById({
    id: props.appId as any,
  });
  if (app.data.code === 0 && app.data.data) {
    appData.value = app.data.data;
  } else {
    message.error("获取数据失败，" + app.data.message);
  }
};

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId) {
    return;
  }
  let res: any;
  // 如果是修改
  if (updateId.value) {
    res = await editScoringResult({
      id: updateId.value as any,
      ...form.value,
    });
  } else {
    // 创建
    res = await addScoringResult({
      appId: props.appId as any,
      ...form.value,
    });
  }
  if (res.data.code === 0) {
    message.success("操作成功");
  } else {
    message.error("操作失败，" + res.data.message);
  }
  if (tableRef.value) {
    tableRef.value.loadData();
    updateId.value = undefined;
  }
};
// 获取旧数据
watchEffect(() => {
  loadData();
});
// 表格列配置
const columns = [
  {
    title: "名称",
    dataIndex: "resultName",
  },
  {
    title: "描述",
    dataIndex: "resultDesc",
  },
  {
    title: "图片",
    dataIndex: "resultPicture",
    slotName: "resultPicture",
  },
  {
    title: "结果属性",
    dataIndex: "resultProp",
    slotName: "resultProp",
  },
  {
    title: "评分范围",
    dataIndex: "resultScoreRange",
    slotName: "resultScoreRange",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style scoped>
#scoringResultCreateView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
