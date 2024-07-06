<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/logo.png" alt="" />
          <div>小新问答 | AI 答题应用平台</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalFooter from "@/components/GlobalFooter.vue";
</script>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .logo {
  width: 48px;
  height: 48px;
}

#userLayout .header {
  margin-top: 16px;
  font-size: 21px;
}

#userLayout .content {
  padding: 20px;
}

#userLayout .footer {
  margin: 0 auto;
  padding: 16px;
  text-align: center;
}
</style>
