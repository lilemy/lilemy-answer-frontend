<template>
  <div id="MyAppView">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="dataList"
      :pagination-props="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <a-card style="margin-bottom: 30px">
          <a-row>
            <a-col flex="auto" class="content-wrapper">
              <h2>{{ item.appName }}</h2>
              <a-descriptions
                :title="item.appDesc"
                :column="{ xs: 1, md: 1, lg: 2 }"
                size="large"
              >
                <a-descriptions-item label="应用 id：">
                  {{ item.id }}
                </a-descriptions-item>
                <a-descriptions-item label="审核状态：">
                  {{ REVIEW_STATUS_MAP[item.reviewStatus] }}
                </a-descriptions-item>
                <a-descriptions-item label="应用类型：">
                  {{ APP_TYPE_MAP[item.appType] }}
                </a-descriptions-item>
                <a-descriptions-item label="评分策略：">
                  {{ APP_SCORING_STRATEGY_MAP[item.scoringStrategy] }}
                </a-descriptions-item>
                <a-descriptions-item label="创建时间：">
                  {{ dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss") }}
                </a-descriptions-item>
              </a-descriptions>
              <a-space style="margin-bottom: 20px" wrap>
                <a-button
                  v-if="isMyApp"
                  type="outline"
                  :href="`/create/question/${item.id}`"
                >
                  设置题目
                </a-button>
                <a-button
                  v-if="isMyApp"
                  type="outline"
                  :href="`/create/scoring_result/${item.id}`"
                >
                  设置评分
                </a-button>
                <a-button
                  v-if="isMyApp"
                  type="outline"
                  :href="`/create/app/${item.id}`"
                >
                  修改应用
                </a-button>
                <a-button v-if="isMyApp" type="outline" status="danger">
                  删除应用
                </a-button>
              </a-space>
            </a-col>
            <a-col flex="320px">
              <a-image width="98%" :src="item.appIcon" />
            </a-col>
          </a-row>
        </a-card>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { computed, ref, watchEffect } from "vue";
import { listMyAppVoByPage } from "@/api/appController";
import { useLoginUserStore } from "@/store/userStore";
import {
  APP_SCORING_STRATEGY_MAP,
  APP_TYPE_MAP,
  REVIEW_STATUS_MAP,
} from "@/constant/app";
import dayjs from "dayjs";

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 12,
};

const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.AppVO[]>([]);
const total = ref<number>(0);

const loginUser = useLoginUserStore();

// 获取登录用户
const loginUserStore = useLoginUserStore();
let loginUserId = loginUserStore.loginUser?.id;
// 是否为本人创建
const isMyApp = computed(() => {
  return loginUserId && loginUserId === dataList.value[0].userId;
});

/**
 * 加载数据
 */
const loadData = async () => {
  const params = {
    userId: loginUser.loginUser.id,
    ...searchParams.value,
  };
  const res = await listMyAppVoByPage(params);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
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

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#MyAppView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
