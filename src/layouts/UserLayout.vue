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

<script setup lang="ts"></script>

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
  margin-bottom: 16px;
  padding: 20px;
}

.footer {
  margin: 0 auto;
  padding: 16px;
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
