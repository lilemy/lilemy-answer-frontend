<template>
  <div id="homeView">
    <div class="searchBar">
      <a-input-search
        :style="{ width: '320px' }"
        placeholder="搜索答题应用"
        size="large"
        search-button
        @search="
          (value) => {
            doSearch(value);
          }
        "
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default> 搜索</template>
      </a-input-search>
    </div>
    <a-list
      class="list-demo-action-layout"
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
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
        <AppCard :app="item" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AppCard from "@/components/AppCard.vue";
import API from "@/api";
import { listAppVoByPage } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { REVIEW_STATUS_ENUM } from "@/constant/app";
import { IconSearch } from "@arco-design/web-vue/es/icon";

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

/**
 * 加载数据
 */
const loadData = async () => {
  const params = {
    reviewStatus: REVIEW_STATUS_ENUM.PASS,
    ...searchParams.value,
  };
  const res = await listAppVoByPage(params);
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
const doSearch = (value: string) => {
  searchParams.value = {
    ...initSearchParams,
    searchText: value,
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
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#homeView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}

.searchBar {
  margin-bottom: 28px;
  text-align: center;
}

.list-demo-action-layout .image-area img {
  width: 100%;
}
</style>
