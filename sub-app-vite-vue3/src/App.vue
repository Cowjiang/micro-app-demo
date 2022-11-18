<script setup lang="ts">
  const onRouteChange = () => {
    if (window.eventCenterForAppNameVite) {
      // 发送全局数据，通知侧边栏修改菜单展示
      window.eventCenterForAppNameVite.setGlobalData({name: 'sub-app-vite-vue3'})
    }
  }
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
