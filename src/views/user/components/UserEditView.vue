<template>
  <div id="UserEditView">
    <a-row :gutter="24">
      <a-col flex="350px">
        <h2>个人设置</h2>
        <a-form
          layout="vertical"
          :model="form"
          @submit="handleSubmit"
          auto-label-width
          :style="{ maxWidth: '600px' }"
        >
          <a-form-item label="用户名：">
            <a-input v-model="form.userName" placeholder="用户名" />
          </a-form-item>
          <a-form-item label="用户简介：" show-word-limit>
            <a-textarea v-model="form.userProfile" placeholder="用户简介" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit"> 保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col flex="auto">
        <div class="avatar">
          <a-space direction="vertical">
            <a-avatar
              :size="150"
              :image-url="store?.loginUser.userAvatar"
              :style="{ marginBottom: '16px' }"
            />
            <a-upload
              action="/"
              name="file"
              :fileList="file ? [file] : []"
              :show-file-list="false"
              disabled
            />
          </a-space>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/userStore";
import { updateMyUser } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { ref } from "vue";

const router = useRouter();
const store = useLoginUserStore();
const form = store.loginUser;
const file = ref();

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
  max-width: 1000px;
  margin: 30px auto 28px 30px;
}

#UserEditView .avatar {
  padding-right: 100px;
  text-align: center;
}
</style>
