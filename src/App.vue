<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';

</script>

<template>
  <TheHeader />

  <RouterView />

  <footer class="p-7 bg-gray-100">
    <p class="text-sm">Copyright © Columbia University. All rights reserved.</p>
  </footer>
</template>

<style scoped>
</style>
