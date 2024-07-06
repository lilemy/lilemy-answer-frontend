<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
</script>

<style scoped>
#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  margin-bottom: 28px;
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

.footer {
  margin: 0 auto;
  padding: 10px;
  text-align: center;
}
</style>
