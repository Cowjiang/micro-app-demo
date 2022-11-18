<template>
  <div>
    <img alt="Vue logo" src="@/assets/logo.jpg" />
    <HelloWorld msg="子应用 - Vite+Vue@3.x" />
  </div>
</template>

<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
  const logoPath = new URL('../assets/logo.jpg', import.meta.url).href
  console.log(logoPath)
</script>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
