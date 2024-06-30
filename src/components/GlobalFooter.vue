<template>
  <div id="globalFooter">
    <a href="https://github.com/lilemy" target="_blank">
      <div class="footer-item" style="margin-bottom: 5px">
        <icon-github />
        <div style="margin-left: 5px">GitHub</div>
      </div>
    </a>
    <div class="footer-item">
      <icon-copyright />
      <div style="margin-left: 5px">2024 小新</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCopyright, IconGithub } from "@arco-design/web-vue/es/icon";
</script>

<style scoped>
#globalFooter {
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
