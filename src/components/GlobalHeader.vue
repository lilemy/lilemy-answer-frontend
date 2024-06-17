<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="titleBar">
            <img class="logo" src="../assets/logo.png" alt="" />
            <div class="title">小新问答</div>
          </div>
        </a-menu-item>
        <!--        <a-menu-item
                  v-for="item in visibleRoutes"
                  :key="item.path"
                  style="font-size: 16px"
                >
                  {{ item.name }}
                </a-menu-item>-->
        <a-menu-item key="/">
          <template #icon>
            <icon-home />
          </template>
          主页
        </a-menu-item>
        <a-menu-item
          v-if="checkAccess(loginUserStore.loginUser, ACCESS_ENUM.ADMIN)"
          key="/admin"
        >
          <a-sub-menu>
            <template #icon>
              <icon-lock />
            </template>
            <template #title>管理页</template>
            <a-menu-item v-for="item in adminRoutes" :key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "无名" }}
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { IconHome, IconLock } from "@arco-design/web-vue/es/icon";

const loginUserStore = useLoginUserStore();

const router = useRouter();
// 当前选中的菜单项
const selectedKeys = ref(["/"]);
// 路由跳转时，自动更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 展示在菜单栏的路由数组
const adminRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (item.meta?.access !== ACCESS_ENUM.ADMIN) {
      return false;
    }
    // 根据权限过滤菜单
    return checkAccess(loginUserStore.loginUser, item.meta?.access as string);
  });
});

// 点击菜单跳转到对应页面
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.titleBar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  color: black;
  font-size: 18px;
}

.logo {
  height: 40px;
}
</style>
