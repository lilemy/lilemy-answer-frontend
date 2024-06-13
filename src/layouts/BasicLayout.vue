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
        <a href="https://github.com/lilemy" target="_blank">
          <div class="footer-item" style="margin-bottom: 5px">
            <img style="height: 15px" src="../assets/github.png" alt="" />
            <div>GitHub</div>
          </div>
        </a>
        <div class="footer-item">
          <img src="../assets/copyright.svg" style="height: 15px" alt="" />
          <div>2024 小新</div>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
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

.footer-item {
  display: flex;
  align-items: center;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
