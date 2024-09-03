<template>
  <div id="UserSettingView">
    <a-card>
      <a-tabs position="left" type="card-gutter" size="large">
        <a-tab-pane key="1">
          <template #title> 基本设置</template>
          <UserEditView />
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title> 安全设置</template>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import UserEditView from "@/views/user/components/UserEditView.vue";
</script>

<style scoped>
#UserSettingView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 28px;
}
</style>
