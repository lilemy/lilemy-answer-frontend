<template>
  <div id="userInfoView">
    <a-space direction="vertical">
      <h2>用户详情</h2>
      <a-avatar
        :size="80"
        :image-url="logUser?.userAvatar"
        :style="{ marginBottom: '16px' }"
      />
      <a-descriptions :column="{ xs: 1, md: 1, lg: 1 }" size="large">
        <a-descriptions-item label="用户名：">
          {{ logUser?.userName }}
        </a-descriptions-item>
        <a-descriptions-item label="用户简介：">
          {{ logUser?.userProfile }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间：">
          {{ dayjs(logUser?.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" @click="router.push('/my/edit')">
        修改
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import API from "@/api";
import { getLoginUser } from "@/api/userController";
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const logUser = ref<API.LoginUserVO>();
const router = useRouter();
const loadUserInfo = async () => {
  const res = await getLoginUser();
  if (res.data.code === 0) {
    logUser.value = res.data.data;
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
