<template>
  <div id="userInfoView">
    <a-row :gutter="24">
      <a-col flex="320px">
        <a-card>
          <a-avatar
            :size="100"
            :image-url="loginUser?.userAvatar"
            :style="{ marginBottom: '16px' }"
          />
          <a-descriptions :column="{ xs: 1, md: 1, lg: 1 }" size="large">
            <a-descriptions-item label="用户名：">
              {{ loginUser?.userName }}
            </a-descriptions-item>
            <a-descriptions-item label="用户简介：">
              {{ loginUser?.userProfile }}
            </a-descriptions-item>
            <a-descriptions-item label="创建时间：">
              {{ dayjs(loginUser?.createTime).format("YYYY-MM-DD") }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card>
          <a-tabs type="card-gutter">
            <a-tab-pane key="1">
              <template #title>
                <icon-file />
                应用
              </template>
              <MyAppView />
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #title>
                <icon-clock-circle />
                回答
              </template>
              <MyAnswerView />
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #title>
                <icon-edit />
                文章
              </template>
              <!-- todo -->
              文章
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import API from "@/api";
import { getLoginUser } from "@/api/userController";
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import MyAppView from "@/views/user/components/MyAppView.vue";
import MyAnswerView from "@/views/user/components/MyAnswerView.vue";
import {
  IconClockCircle,
  IconEdit,
  IconFile,
} from "@arco-design/web-vue/es/icon";

const loginUser = ref<API.LoginUserVO>();
const router = useRouter();
const loadUserInfo = async () => {
  const res = await getLoginUser();
  if (res.data.code === 0) {
    loginUser.value = res.data.data;
  } else {
    message.error(res.data.message + "，即将跳转到登录页");
    await router.push("/user/login");
  }
};
watchEffect(() => {
  loadUserInfo();
});
</script>

<style scoped>
#userInfoView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
