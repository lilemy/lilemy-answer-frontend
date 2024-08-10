<template>
  <div id="UserEditView">
    <h2>个人信息修改</h2>
    <a-form
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      :style="{ maxWidth: '600px' }"
    >
      <a-form-item label="用户名：">
        <a-input v-model="form.userName" />
      </a-form-item>
      <a-form-item label="用户简介：" show-word-limit>
        <a-textarea v-model="form.userProfile" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/userStore";
import { updateMyUser } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useLoginUserStore();
const form = store.loginUser;

const handleSubmit = async () => {
  const res = await updateMyUser(form);
  if (res.data.code === 0) {
    store.loginUser = form;
    await router.push("/my/info");
  } else {
    message.error("更新失败：" + res.data.message);
  }
};
</script>

<style scoped>
#UserEditView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
