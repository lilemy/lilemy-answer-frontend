<template>
  <div id="appDetailView">
    <a-card>
      <a-row style="margin-bottom: 16px">
        <a-col flex="auto" class="content-wrapper">
          <h2>{{ data.appName }}</h2>
          <p>{{ data.appDesc }}</p>
          <p>应用类型：{{ APP_TYPE_MAP[data.appType] }}</p>
          <p>评分策略：{{ APP_SCORING_STRATEGY_MAP[data.scoringStrategy] }}</p>
          <p>
            <a-space>
              作者：
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <a-avatar
                  :size="24"
                  :image-url="data.user?.userAvatar"
                  :style="{ marginRight: '8px' }"
                />
                <a-typography-text>
                  {{ data.user?.userName ?? "无名" }}
                </a-typography-text>
              </div>
            </a-space>
          </p>
          <p>
            创建时间：{{ dayjs(data.createTime).format("YYYY-MM-DD HH:mm:ss") }}
          </p>
          <a-space style="margin-bottom: 20px" wrap>
            <a-button type="primary" :href="`/answer/do/${id}`">
              开始答题
            </a-button>
            <a-button @click="doShare" type="primary" status="success">
              分享应用
            </a-button>
            <a-button
              v-if="isMyApp"
              type="outline"
              :href="`/create/question/${id}`"
            >
              设置题目
            </a-button>
            <a-button
              v-if="isMyApp"
              type="outline"
              :href="`/create/scoring_result/${id}`"
            >
              设置评分
            </a-button>
            <a-button v-if="isMyApp" type="outline" :href="`/create/app/${id}`">
              修改应用
            </a-button>
            <a-button v-if="isMyApp" type="primary" status="danger">
              删除应用
            </a-button>
          </a-space>
        </a-col>
        <a-col flex="320px">
          <a-image width="100%" :src="data.appIcon" />
        </a-col>
      </a-row>
    </a-card>
  </div>
  <ShareModal :link="shareLink" title="应用分享" ref="shareModalRef" />
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect, computed } from "vue";
import API from "@/api";
import { getAppVoById } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";
import dayjs from "dayjs";
import { useLoginUserStore } from "@/store/userStore";
import ShareModal from "@/components/ShareModal.vue";

const data = ref<API.AppVO>({});

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

// 获取登录用户
const loginUserStore = useLoginUserStore();
let loginUserId = loginUserStore.loginUser?.id;
// 是否为本人创建
const isMyApp = computed(() => {
  return loginUserId && loginUserId === data.value.userId;
});

/**
 * 获取数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }
  const res = await getAppVoById({
    id: props.id as any,
  });
  if (res.data.code === 0) {
    data.value = res.data.data as API.AppVO;
  } else {
    message.error("获取数据失败：" + res.data.message);
  }
};

// 分享弹窗的引用
const shareModalRef = ref();

// 分享链接
const shareLink = `${window.location.protocol}//${window.location.host}/app/detail/${props.id}`;

// 分享
const doShare = (e: Event) => {
  if (shareModalRef.value) {
    shareModalRef.value.openModal();
  }
  // 阻止冒泡，防止跳转到详情页
  e.stopPropagation();
};

/**
 * 监听变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#appDetailView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}

#appDetailPage .content-wrapper > * {
  margin-bottom: 24px;
}
</style>
