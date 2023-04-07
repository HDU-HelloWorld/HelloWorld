<script setup>
</script>

<template>
  <div class="page">
    <ul>
      <router-link to="printer">printer</router-link>
      <router-link to="uploadd">uploadd</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<style scoped>

*{
  margin: 0;
  padding: 0;
}
.page {
  width: 100vw;
  height: 100vh;
}
</style>
