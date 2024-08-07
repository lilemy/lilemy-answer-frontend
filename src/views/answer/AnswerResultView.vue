<template>
  <div id="answerResultView">
    <a-card hoverable style="padding: 0 30px; width: 100%">
      <a-row>
        <a-col flex="auto">
          <a-descriptions :column="1" size="large" class="contentWrapper">
            <h2>{{ data.resultName }}</h2>
            <a-descriptions-item label="结果描述：">
              {{ data.resultDesc }}
            </a-descriptions-item>
            <a-descriptions-item label="结果得分：">
              {{ data.resultScore }}
            </a-descriptions-item>
            <a-descriptions-item label="我的答案：">
              {{ data.choices?.toString() }}
            </a-descriptions-item>
            <a-descriptions-item label="应用名称：">
              {{ app.appName }}
            </a-descriptions-item>
            <a-descriptions-item label="应用类型：">
              {{ APP_TYPE_MAP[Number(app.appType)] }}
            </a-descriptions-item>
            <a-descriptions-item label="评分策略：">
              {{ APP_SCORING_STRATEGY_MAP[Number(app.scoringStrategy)] }}
            </a-descriptions-item>
            <a-descriptions-item label="答题人：">
              <a-space>
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
            </a-descriptions-item>
            <a-descriptions-item label="答题时间">
              {{ dayjs(data.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            </a-descriptions-item>
            <a-descriptions-item>
              <a-space size="medium" wrap>
                <a-button type="primary" @click="doShare"> 分享结果</a-button>
                <a-button :href="`/answer/do/${data.appId}`"> 去答题</a-button>
                <a-button
                  :v-if="data.userId == loginUserStore.loginUser.id"
                  type="outline"
                  href="/answer/my"
                >
                  查看我的答题
                </a-button>
              </a-space>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col flex="320px">
          <a-image
            style="margin-top: 50px"
            width="100%"
            :src="data.resultPicture"
          />
        </a-col>
      </a-row>
    </a-card>
  </div>
  <ShareModal :link="shareLink" title="应用分享" ref="shareModalRef" />
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { getUserAnswerVoById } from "@/api/userAnswerController";
import { getAppVoById } from "@/api/appController";
import dayjs from "dayjs";
import ShareModal from "@/components/ShareModal.vue";
import { useLoginUserStore } from "@/store/userStore";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return "";
  },
});

const app = ref<API.AppVO>({});
const data = ref<API.UserAnswerVO>({});
const loginUserStore = useLoginUserStore();

// 分享弹窗的引用
const shareModalRef = ref();

// 分享链接
const shareLink = ref<string>(`${window.location.href}`);

// 分享
const doShare = () => {
  if (shareModalRef.value) {
    shareModalRef.value.openModal();
  }
};

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }

  const res = await getUserAnswerVoById({
    id: props.id as any,
  });
  if (res.data.code === 0 && res.data.data) {
    data.value = res.data.data;
    // 获取 app
    const appRes = await getAppVoById({
      id: data.value.appId || 0,
    });
    if (appRes.data.code === 0 && appRes.data.data) {
      app.value = appRes.data.data;
    } else {
      message.error("获取应用失败，" + res.data.message);
    }
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#answerResultView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}

#answerResultView .content-wrapper > * {
  margin-bottom: 24px;
}
</style>
