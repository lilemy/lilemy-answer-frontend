<template>
  <div id="avatarHeader">
    <div v-if="loginUserStore.loginUser.id">
      <a-space>
        <a-dropdown>
          <a-button type="text">
            <a-avatar
              :image-url="loginUserStore.loginUser.userAvatar"
              style="margin-right: 10px"
              :size="30"
            />
            {{ loginUserStore.loginUser.userName ?? "无名" }}
          </a-button>
          <template #content>
            <a-doption @click="router.push('/my/info')">
              <template #icon>
                <icon-user />
              </template>
              个人中心
            </a-doption>
            <a-doption @click="router.push('/my/edit')">
              <template #icon>
                <icon-edit />
              </template>
              个人设置
            </a-doption>
            <a-doption @click="logout">
              <template #icon>
                <icon-export />
              </template>
              退出登录
            </a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </div>
    <div v-else>
      <a-button type="primary" href="/user/login">登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginUserStore } from "@/store/userStore";
import { userLogout } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { IconEdit, IconExport, IconUser } from "@arco-design/web-vue/es/icon";

const loginUserStore = useLoginUserStore();

const router = useRouter();

const logout = async () => {
  const res = await userLogout();
  if (res.data.code === 0) {
    message.success("退出成功");
    await router.push("/user/login");
  }
};
</script>

<style scoped></style>
